import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { SuggestTagsDto } from './dto/suggest-tags.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('tags') // Groups all endpoints in Swagger
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({ status: 201, description: 'Tag created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tags' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of results' })
  @ApiResponse({ status: 200, description: 'List of tags.' })
  findAll(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    return this.tagsService.findAll(limitNum);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular tags' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of results (default 20)' })
  @ApiResponse({ status: 200, description: 'List of popular tags.' })
  findPopular(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.tagsService.findPopular(limitNum);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search tags by keyword' })
  @ApiQuery({ name: 'q', required: true, type: String, description: 'Search keyword' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of results (default 10)' })
  @ApiResponse({ status: 200, description: 'List of matching tags.' })
  search(@Query('q') query: string, @Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.tagsService.search(query, limitNum);
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Find tags by category' })
  @ApiParam({ name: 'category', type: String })
  @ApiResponse({ status: 200, description: 'List of tags in the category.' })
  findByCategory(@Param('category') category: string) {
    return this.tagsService.findByCategory(category);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get tag statistics' })
  @ApiResponse({ status: 200, description: 'Statistics about tags.' })
  getStats() {
    return this.tagsService.getTagStats();
  }

  @Post('suggest')
  @ApiOperation({ summary: 'Suggest tags based on content' })
  @ApiResponse({ status: 201, description: 'Tag suggestions returned successfully.' })
  suggestTags(@Body() suggestTagsDto: SuggestTagsDto) {
    return this.tagsService.suggestTags(suggestTagsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one tag by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Return tag details.' })
  @ApiResponse({ status: 404, description: 'Tag not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a tag' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tag updated successfully.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a tag' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tag deleted successfully.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.remove(id);
  }
}
