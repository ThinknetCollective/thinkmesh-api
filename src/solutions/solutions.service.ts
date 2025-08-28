import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solution } from './entities/solution.entity';
import { MeshNode } from '../mesh-nodes/entities/mesh-node.entity';
import { User } from '../users/entities/user.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { VoteSolutionDto, VoteType } from './dto/vote-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solution)
    private solutionsRepository: Repository<Solution>,
    @InjectRepository(MeshNode)
    private meshNodesRepository: Repository<MeshNode>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createSolutionDto: CreateSolutionDto, userId: number): Promise<Solution> {
    // Verify mesh node exists
    const meshNode = await this.meshNodesRepository.findOne({
      where: { id: createSolutionDto.meshNodeId },
    });
    
    if (!meshNode) {
      throw new NotFoundException(`MeshNode with ID ${createSolutionDto.meshNodeId} not found`);
    }

    // Verify user exists
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const solution = this.solutionsRepository.create({
      content: createSolutionDto.content,
      meshNode,
      submittedBy: user,
    });

    return this.solutionsRepository.save(solution);
  }

  async findAll(): Promise<Solution[]> {
    return this.solutionsRepository.find({
      relations: ['submittedBy', 'meshNode'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Solution> {
    const solution = await this.solutionsRepository.findOne({
      where: { id },
      relations: ['submittedBy', 'meshNode'],
    });

    if (!solution) {
      throw new NotFoundException(`Solution with ID ${id} not found`);
    }

    return solution;
  }

  async findByMeshNode(meshNodeId: number): Promise<Solution[]> {
    // Verify mesh node exists
    const meshNode = await this.meshNodesRepository.findOne({
      where: { id: meshNodeId },
    });
    
    if (!meshNode) {
      throw new NotFoundException(`MeshNode with ID ${meshNodeId} not found`);
    }

    return this.solutionsRepository.find({
      where: { meshNode: { id: meshNodeId } },
      relations: ['submittedBy'],
      order: { totalVotes: 'DESC', createdAt: 'DESC' },
    });
  }

  async update(id: number, updateSolutionDto: UpdateSolutionDto, userId: number): Promise<Solution> {
    const solution = await this.findOne(id);

    // Check if user is the author
    if (solution.submittedBy.id !== userId) {
      throw new BadRequestException('You can only update your own solutions');
    }

    Object.assign(solution, updateSolutionDto);
    return this.solutionsRepository.save(solution);
  }

  async vote(id: number, voteSolutionDto: VoteSolutionDto): Promise<Solution> {
    const solution = await this.findOne(id);
    if (voteSolutionDto.vote === VoteType.UPVOTE) {
      solution.upvotes = (solution.upvotes || 0) + 1;
    } else {
      solution.downvotes = (solution.downvotes || 0) + 1;
    }
    solution.totalVotes = (solution.upvotes || 0) - (solution.downvotes || 0);
    return this.solutionsRepository.save(solution);
  }

  async remove(id: number, userId: number): Promise<void> {
    const solution = await this.findOne(id);

    // Check if user is the author
    if (solution.submittedBy.id !== userId) {
      throw new BadRequestException('You can only delete your own solutions');
    }

    await this.solutionsRepository.remove(solution);
  }
}
