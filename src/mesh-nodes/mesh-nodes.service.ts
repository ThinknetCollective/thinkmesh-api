import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeshNode } from './entities/mesh-node.entity';
import { CreateMeshNodeDto } from './dto/create-mesh-node.dto';
import { UpdateMeshNodeDto } from './dto/update-mesh-node.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MeshNodesService {
  constructor(
    @InjectRepository(MeshNode)
    private meshNodesRepository: Repository<MeshNode>,
  ) {}

  async create(createMeshNodeDto: CreateMeshNodeDto, user: User): Promise<MeshNode> {
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
}
