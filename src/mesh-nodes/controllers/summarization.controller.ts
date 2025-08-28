import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { SummarizationService } from '../services/summarization.service';
import { CreateSummaryDto } from '../dto/create-summary.dto';

@Controller('mesh-nodes/summaries')
export class SummarizationController {
  constructor(private readonly summarizationService: SummarizationService) {}

  @Post()
  async createSummary(@Body() createSummaryDto: CreateSummaryDto) {
    try {
      const summary = await this.summarizationService.createSummaryForNode(
        parseInt(createSummaryDto.nodeId),
        createSummaryDto.solutionTexts,
      );

      return {
        success: true,
        summary,
        message: 'Summary created successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create summary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':nodeId')
  async getSummary(@Param('nodeId') nodeId: string) {
    try {
      const summary = await this.summarizationService.getSummary(parseInt(nodeId));
      
      if (!summary) {
        throw new HttpException('Summary not found', HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        summary,
        nodeId: parseInt(nodeId),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve summary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('batch')
  async createBatchSummaries(@Body() batchData: { nodes: CreateSummaryDto[] }) {
  const results: { nodeId: string; success: boolean; summary?: string; error?: string }[] = [];
    
    for (const nodeData of batchData.nodes) {
      try {
        const summary = await this.summarizationService.createSummaryForNode(
          parseInt(nodeData.nodeId),
          nodeData.solutionTexts,
        );
        results.push({ nodeId: nodeData.nodeId, success: true, summary });
      } catch (error) {
        results.push({ nodeId: nodeData.nodeId, success: false, error: error.message });
      }
    }

    return {
      success: true,
      results,
      message: `Processed ${results.length} summaries`,
    };
  }
}