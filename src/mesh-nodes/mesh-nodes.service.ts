import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MeshNode } from './entities/mesh-node.entity';
import { CreateMeshNodeDto } from './dto/create-mesh-node.dto';
import { UpdateMeshNodeDto } from './dto/update-mesh-node.dto';
import { User } from '../users/entities/user.entity';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class MeshNodesService {
  constructor(
    @InjectRepository(MeshNode)
    private meshNodesRepository: Repository<MeshNode>,
    private tagsService: TagsService,
  ) {}

  async create(createMeshNodeDto: CreateMeshNodeDto, user: User): Promise<MeshNode> {
    // Process tags if provided
    if (createMeshNodeDto.tags && createMeshNodeDto.tags.length > 0) {
      await this.tagsService.findOrCreateTags(createMeshNodeDto.tags);
    }

    const meshNode = this.meshNodesRepository.create({
      ...createMeshNodeDto,
      createdBy: user,
    });
    return this.meshNodesRepository.save(meshNode);
  }

  async findAll(): Promise<MeshNode[]> {
    return this.meshNodesRepository.find({
      relations: ['createdBy'],
      select: {
        createdBy: {
          id: true,
          username: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<MeshNode> {
    const meshNode = await this.meshNodesRepository.findOne({
      where: { id },
      relations: ['createdBy'],
      select: {
        createdBy: {
          id: true,
          username: true,
        },
      },
    });

    if (!meshNode) {
      throw new NotFoundException(`MeshNode with ID ${id} not found`);
    }

    return meshNode;
  }

  async update(id: number, updateMeshNodeDto: UpdateMeshNodeDto, user: User): Promise<MeshNode> {
    const meshNode = await this.findOne(id);

    if (meshNode.createdBy.id !== user.id) {
      throw new ForbiddenException('You can only update your own mesh nodes');
    }

    // Process tags if provided
    if (updateMeshNodeDto.tags && updateMeshNodeDto.tags.length > 0) {
      await this.tagsService.findOrCreateTags(updateMeshNodeDto.tags);
    }

    Object.assign(meshNode, updateMeshNodeDto);
    return this.meshNodesRepository.save(meshNode);
  }

  async remove(id: number, user: User): Promise<void> {
    const meshNode = await this.findOne(id);

    if (meshNode.createdBy.id !== user.id) {
      throw new ForbiddenException('You can only delete your own mesh nodes');
    }

    await this.meshNodesRepository.remove(meshNode);
  }

  async findByUser(userId: number): Promise<MeshNode[]> {
    return this.meshNodesRepository.find({
      where: { createdBy: { id: userId } },
      relations: ['createdBy'],
    });
  }

  async findByCategory(category: string): Promise<MeshNode[]> {
    return this.meshNodesRepository.find({
      where: { category },
      relations: ['createdBy'],
    });
  }

  async findByTags(tags: string[]): Promise<MeshNode[]> {
    const query = this.meshNodesRepository.createQueryBuilder('meshNode')
      .leftJoinAndSelect('meshNode.createdBy', 'createdBy')
      .select([
        'meshNode',
        'createdBy.id',
        'createdBy.username'
      ]);

    // Filter by tags using JSON operations
    for (let i = 0; i < tags.length; i++) {
      query.andWhere(`JSON_CONTAINS(meshNode.tags, :tag${i})`, {
        [`tag${i}`]: `"${tags[i].toLowerCase()}"`
      });
    }

    return query.getMany();
  }

  async findByTagsAny(tags: string[]): Promise<MeshNode[]> {
    const query = this.meshNodesRepository.createQueryBuilder('meshNode')
      .leftJoinAndSelect('meshNode.createdBy', 'createdBy')
      .select([
        'meshNode',
        'createdBy.id', 
        'createdBy.username'
      ]);

    const conditions = tags.map((tag, index) => 
      `JSON_CONTAINS(meshNode.tags, :tag${index})`
    );
    
    query.andWhere(`(${conditions.join(' OR ')})`);
    
    const params = {};
    tags.forEach((tag, index) => {
      params[`tag${index}`] = `"${tag.toLowerCase()}"`;
    });
    
    query.setParameters(params);

    return query.getMany();
  }

  async suggestTagsForMeshNode(title: string, description: string): Promise<{
    suggestions: string[];
    source: 'ai' | 'fallback';
  }> {
    return this.tagsService.suggestTags({ title, description });
  }
}
