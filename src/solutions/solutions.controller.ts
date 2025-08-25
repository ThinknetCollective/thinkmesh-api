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

@Controller('solutions')
@UseGuards(JwtAuthGuard)
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  create(@Body() createSolutionDto: CreateSolutionDto, @Request() req) {
    return this.solutionsService.create(createSolutionDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.solutionsService.findAll();
  }

  @Get('mesh-node/:meshNodeId')
  findByMeshNode(@Param('meshNodeId', ParseIntPipe) meshNodeId: number) {
    return this.solutionsService.findByMeshNode(meshNodeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.solutionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSolutionDto: UpdateSolutionDto,
    @Request() req,
  ) {
    return this.solutionsService.update(id, updateSolutionDto, req.user.userId);
  }

  @Post(':id/vote')
  vote(
    @Param('id', ParseIntPipe) id: number,
    @Body() voteSolutionDto: VoteSolutionDto,
  ) {
    return this.solutionsService.vote(id, voteSolutionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.solutionsService.remove(id, req.user.userId);
  }
}
