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
} from '@nestjs/common';
import { MeshNodesService } from './mesh-nodes.service';
import { CreateMeshNodeDto } from './dto/create-mesh-node.dto';
import { UpdateMeshNodeDto } from './dto/update-mesh-node.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/v1/mesh-nodes')
@UseGuards(JwtAuthGuard)
export class MeshNodesController {
  constructor(private readonly meshNodesService: MeshNodesService) {}

  @Post()
  create(@Body() createMeshNodeDto: CreateMeshNodeDto, @Request() req) {
    return this.meshNodesService.create(createMeshNodeDto, req.user);
  }

  @Get()
  findAll(@Query('category') category?: string, @Query('userId') userId?: number) {
    if (category) {
      return this.meshNodesService.findByCategory(category);
    }
    if (userId) {
      return this.meshNodesService.findByUser(userId);
    }
    return this.meshNodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meshNodesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeshNodeDto: UpdateMeshNodeDto, @Request() req) {
    return this.meshNodesService.update(+id, updateMeshNodeDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.meshNodesService.remove(+id, req.user);
  }
}
