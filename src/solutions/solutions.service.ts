import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solution } from './entities/solution.entity';
import { MeshNode } from '../mesh-nodes/entities/mesh-node.entity';
import { User } from '../users/entities/user.entity';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { VoteSolutionDto, VoteType } from './dto/vote-solution.dto';
import { MetricsService } from '../metrics/metrics.service';

@Injectable()
export class SolutionsService {
  private readonly logger = new Logger(SolutionsService.name);
  constructor(
    @InjectRepository(Solution)
    private solutionsRepository: Repository<Solution>,
    @InjectRepository(MeshNode)
    private meshNodesRepository: Repository<MeshNode>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private metricsService: MetricsService,
  ) {}

  async create(
    createSolutionDto: CreateSolutionDto,
    userId: number,
  ): Promise<Solution> {
    // Verify mesh node exists
    const meshNode = await this.meshNodesRepository.findOne({
      where: { id: createSolutionDto.meshNodeId },
    });

    if (!meshNode) {
      throw new NotFoundException(
        `MeshNode with ID ${createSolutionDto.meshNodeId} not found`,
      );
    }

    // Verify user exists
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // 🌙 NEW: Calculate Islamic metrics
    this.logger.log('Calculating Islamic metrics for solution...');

    const metricsDto = await this.metricsService.calculateMetrics(
      createSolutionDto.content,
      `${meshNode.title}: ${meshNode.description}`,
    );

    // Create Islamic metrics entity
    const islamicMetrics = await this.metricsService.create(metricsDto);

    // Calculate total score
    const totalScore = this.metricsService.calculateOverallScore(metricsDto);

    // Create solution with metrics
    const solution = this.solutionsRepository.create({
      content: createSolutionDto.content,
      meshNode,
      submittedBy: user,
      islamicMetrics, // 🌙 Attach metrics
      totalScore, // 🌙 Attach score
    });

    const savedSolution = await this.solutionsRepository.save(solution);

    // 🏆 NEW: Update rankings for this mesh node
    await this.updateRankings(meshNode.id);

    this.logger.log(`Solution scored: ${totalScore}/100`);

    return savedSolution;
  }

  // 🏆 NEW: Update rankings based on total score
  private async updateRankings(meshNodeId: number): Promise<void> {
    const solutions = await this.solutionsRepository.find({
      where: { meshNode: { id: meshNodeId } },
      order: { totalScore: 'DESC' }, // Highest score first
    });

    // Update rank for each solution
    for (let i = 0; i < solutions.length; i++) {
      solutions[i].rank = i + 1; // 1 = best, 2 = second, etc.
    }

    await this.solutionsRepository.save(solutions);
  }

  async findByMeshNode(meshNodeId: number): Promise<Solution[]> {
    // Verify mesh node exists
    const meshNode = await this.meshNodesRepository.findOne({
      where: { id: meshNodeId },
    });

    if (!meshNode) {
      throw new NotFoundException(`MeshNode with ID ${meshNodeId} not found`);
    }

    // 🏆 NEW: Order by totalScore (not just votes)
    return this.solutionsRepository.find({
      where: { meshNode: { id: meshNodeId } },
      relations: ['submittedBy', 'islamicMetrics'], // 🌙 Include metrics
      order: {
        totalScore: 'DESC', // 🌙 Primary: Islamic score
        totalVotes: 'DESC', // Secondary: Community votes
        createdAt: 'DESC', // Tertiary: Newest
      },
    });
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

  async update(
    id: number,
    updateSolutionDto: UpdateSolutionDto,
    userId: number,
  ): Promise<Solution> {
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
