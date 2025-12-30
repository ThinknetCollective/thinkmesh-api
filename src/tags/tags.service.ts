import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThan } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { SuggestTagsDto } from './dto/suggest-tags.dto';
import { OpenAiService } from './openai.service';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private openAiService: OpenAiService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    // Check if tag already exists
    const existingTag = await this.tagsRepository.findOne({
      where: { name: createTagDto.name.toLowerCase() },
    });

    if (existingTag) {
      throw new ConflictException(`Tag '${createTagDto.name}' already exists`);
    }

    const tag = this.tagsRepository.create({
      ...createTagDto,
      name: createTagDto.name.toLowerCase(),
    });

    return this.tagsRepository.save(tag);
  }

  async findAll(limit?: number): Promise<Tag[]> {
    return this.tagsRepository.find({
      order: { usageCount: 'DESC', createdAt: 'DESC' },
      take: limit,
    });
  }

  async findPopular(limit: number = 20): Promise<Tag[]> {
    return this.tagsRepository.find({
      where: { usageCount: MoreThan(0) },
      order: { usageCount: 'DESC', name: 'ASC' },
      take: limit,
    });
  }

  async findByCategory(category: string): Promise<Tag[]> {
    return this.tagsRepository.find({
      where: { category },
      order: { usageCount: 'DESC', name: 'ASC' },
    });
  }

  async search(query: string, limit: number = 10): Promise<Tag[]> {
    return this.tagsRepository.find({
      where: [
        { name: Like(`%${query.toLowerCase()}%`) },
        { description: Like(`%${query}%`) },
      ],
      order: { usageCount: 'DESC', name: 'ASC' },
      take: limit,
    });
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  async findOrCreateTags(tagNames: string[]): Promise<Tag[]> {
    const tags: Tag[] = [];

    for (const tagName of tagNames) {
      const normalizedName = tagName.toLowerCase().trim();
      if (!normalizedName) continue;

      let tag = await this.tagsRepository.findOne({
        where: { name: normalizedName },
      });

      if (!tag) {
        tag = await this.tagsRepository.save({
          name: normalizedName,
          usageCount: 1,
        });
      } else {
        // Increment usage count
        tag.usageCount += 1;
        await this.tagsRepository.save(tag);
      }

      tags.push(tag);
    }

    return tags;
  }

  async suggestTags(suggestTagsDto: SuggestTagsDto): Promise<{
    suggestions: string[];
    source: 'ai' | 'fallback';
  }> {
    const suggestions = await this.openAiService.suggestTags(
      suggestTagsDto.title,
      suggestTagsDto.description,
    );

    // Get existing tags that match suggestions to prioritize them
    const existingTags = await this.tagsRepository.find({
      where: suggestions.map((name) => ({ name })),
      order: { usageCount: 'DESC' },
    });

    // Merge AI suggestions with existing popular tags
    const existingTagNames = existingTags.map((tag) => tag.name);
    const newSuggestions = suggestions.filter(
      (tag) => !existingTagNames.includes(tag),
    );

    const finalSuggestions = [
      ...existingTagNames, // Prioritize existing tags
      ...newSuggestions, // Add new AI suggestions
    ].slice(0, 8);

    return {
      suggestions: finalSuggestions,
      source: suggestions.length > 0 ? 'ai' : 'fallback',
    };
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);

    if (updateTagDto.name && updateTagDto.name !== tag.name) {
      const existingTag = await this.tagsRepository.findOne({
        where: { name: updateTagDto.name.toLowerCase() },
      });

      if (existingTag && existingTag.id !== id) {
        throw new ConflictException(
          `Tag '${updateTagDto.name}' already exists`,
        );
      }

      updateTagDto.name = updateTagDto.name.toLowerCase();
    }

    Object.assign(tag, updateTagDto);
    return this.tagsRepository.save(tag);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagsRepository.remove(tag);
  }

  async getTagStats(): Promise<{
    totalTags: number;
    totalUsage: number;
    topCategories: { category: string; count: number }[];
  }> {
    const totalTags = await this.tagsRepository.count();

    const usageResult = await this.tagsRepository
      .createQueryBuilder('tag')
      .select('SUM(tag.usageCount)', 'totalUsage')
      .getRawOne();

    const categoryStats = await this.tagsRepository
      .createQueryBuilder('tag')
      .select('tag.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('tag.category IS NOT NULL')
      .andWhere('tag.category != :empty', { empty: '' })
      .groupBy('tag.category')
      .orderBy('count', 'DESC')
      .limit(10)
      .getRawMany();

    return {
      totalTags,
      totalUsage: parseInt(usageResult?.totalUsage || '0'),
      topCategories: categoryStats.map((stat) => ({
        category: stat.category,
        count: parseInt(stat.count),
      })),
    };
  }
}
