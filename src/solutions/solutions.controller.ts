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
  ParseIntPipe,
} from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { VoteSolutionDto } from './dto/vote-solution.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('api/v1/solutions')
@ApiBearerAuth() // adds JWT auth field in Swagger
@Controller('solutions')
@UseGuards(JwtAuthGuard)
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new solution' })
  @ApiResponse({ status: 201, description: 'Solution successfully created.' })
  create(@Body() createSolutionDto: CreateSolutionDto, @Request() req) {
    return this.solutionsService.create(createSolutionDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all solutions' })
  @ApiResponse({ status: 200, description: 'Return all solutions.' })
  findAll() {
    return this.solutionsService.findAll();
  }

  @Get('mesh-node/:meshNodeId')
  @ApiOperation({ summary: 'Find solutions by mesh node' })
  @ApiParam({ name: 'meshNodeId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Return solutions for given mesh node.',
  })
  findByMeshNode(@Param('meshNodeId', ParseIntPipe) meshNodeId: number) {
    return this.solutionsService.findByMeshNode(meshNodeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one solution by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Return solution details.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.solutionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a solution' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Solution updated successfully.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSolutionDto: UpdateSolutionDto,
    @Request() req,
  ) {
    return this.solutionsService.update(id, updateSolutionDto, req.user.userId);
  }

  @Post(':id/vote')
  @ApiOperation({ summary: 'Vote for a solution (upvote/downvote)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Vote recorded successfully.' })
  vote(
    @Param('id', ParseIntPipe) id: number,
    @Body() voteSolutionDto: VoteSolutionDto,
  ) {
    return this.solutionsService.vote(id, voteSolutionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a solution (soft delete)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Solution deleted successfully.' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.solutionsService.remove(id, req.user.userId);
  }
}
