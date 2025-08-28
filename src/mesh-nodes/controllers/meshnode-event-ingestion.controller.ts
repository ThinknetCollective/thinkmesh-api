import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { MeshNodeEventIngestionService, IngestedEvent } from '../services/meshnode-event-ingestion.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Mesh Nodes')
@ApiBearerAuth()
@Controller('api/v1/mesh-nodes/events')
@UseGuards(JwtAuthGuard)
export class MeshNodeEventIngestionController {
  constructor(private readonly ingestionService: MeshNodeEventIngestionService) {}

  @Post('ingest')
  @ApiOperation({ summary: 'Ingest events and auto-create MeshNodes for relevant ones' })
  @ApiResponse({ status: 201, description: 'MeshNodes auto-created for relevant events' })
  async ingestEvents(
    @Body() body: { events: IngestedEvent[]; scoreThreshold?: number },
    @Request() req
  ) {
    // Use the authenticated user as the system user for now
    return this.ingestionService.ingestEvents(
      body.events,
      body.scoreThreshold ?? 0.7,
      req.user
    );
  }
}
