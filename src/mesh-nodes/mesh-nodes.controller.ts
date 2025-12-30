import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { MeshNodesService } from './mesh-nodes.service';
import { CreateMeshNodeDto } from './dto/create-mesh-node.dto';
import { UpdateMeshNodeDto } from './dto/update-mesh-node.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { User } from '../users/entities/user.entity';

// Define user type
interface RequestWithUser extends ExpressRequest {
  user: User;
}
@ApiTags('Mesh Nodes')
@ApiBearerAuth() // 🔐 shows lock icon in Swagger
@Controller('api/v1/mesh-nodes')
@UseGuards(JwtAuthGuard)
export class MeshNodesController {
  constructor(private readonly meshNodesService: MeshNodesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new mesh node' })
  @ApiResponse({ status: 201, description: 'Mesh node created successfully' })
  create(
    @Body() createMeshNodeDto: CreateMeshNodeDto,
    @Request() req: RequestWithUser,
  ) {
    return this.meshNodesService.create(createMeshNodeDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all mesh nodes with optional filters' })
  @ApiResponse({ status: 200, description: 'List of mesh nodes returned' })
  findAll(
    @Query('category') category?: string,
    @Query('userId') userId?: number,
    @Query('tags') tags?: string,
    @Query('tagsMode') tagsMode?: 'all' | 'any',
  ) {
    if (category) {
      return this.meshNodesService.findByCategory(category);
    }
    if (userId) {
      return this.meshNodesService.findByUser(userId);
    }
    if (tags) {
      const tagArray = tags.split(',').map((tag) => tag.trim());
      return tagsMode === 'all'
        ? this.meshNodesService.findByTags(tagArray)
        : this.meshNodesService.findByTagsAny(tagArray);
    }
    return this.meshNodesService.findAll();
  }

  @Post('suggest-tags')
  @ApiOperation({ summary: 'Suggest tags based on title and description' })
  @ApiResponse({ status: 200, description: 'Suggested tags returned' })
  suggestTags(@Body() body: { title: string; description: string }) {
    return this.meshNodesService.suggestTagsForMeshNode(
      body.title,
      body.description,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a mesh node by ID' })
  @ApiResponse({ status: 200, description: 'Mesh node details returned' })
  async findOne(@Param('id') id: string) {
    try {
      return this.meshNodesService.findOne(+id);
    } catch {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a mesh node by ID' })
  @ApiResponse({ status: 200, description: 'Mesh node updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateMeshNodeDto: UpdateMeshNodeDto,
    @Request() req: RequestWithUser,
  ) {
    return this.meshNodesService.update(+id, updateMeshNodeDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a mesh node by ID' })
  @ApiResponse({ status: 200, description: 'Mesh node removed successfully' })
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.meshNodesService.remove(+id, req.user);
  }
}
