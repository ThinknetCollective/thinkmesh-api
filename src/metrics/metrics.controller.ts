import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateMetricsDto } from './dto/create-metrics.dto';
import { MetricsResponseDto } from './dto/metrics-response.dto';

@ApiTags('Islamic Metrics')
@Controller('api/v1/metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post('calculate')
  @ApiOperation({
    summary: 'Calculate Islamic metrics for a solution (test endpoint)',
  })
  @ApiResponse({ status: 201, type: MetricsResponseDto })
  async calculate(
    @Body() body: { solutionText: string; problemContext: string },
  ) {
    const metrics = await this.metricsService.calculateMetrics(
      body.solutionText,
      body.problemContext,
    );
    return metrics;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Islamic metrics by ID' })
  @ApiResponse({ status: 200, type: MetricsResponseDto })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.metricsService.findOne(id);
  }
}
