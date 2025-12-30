import { Injectable, Logger } from '@nestjs/common';
import { MeshNodesService } from '../mesh-nodes.service';
import { CreateMeshNodeDto } from '../dto/create-mesh-node.dto';

export interface IngestedEvent {
  title: string;
  description: string;
  category: string;
  tags?: string[];
  score: number;
}

@Injectable()
export class MeshNodeEventIngestionService {
  private readonly logger = new Logger(MeshNodeEventIngestionService.name);

  constructor(private readonly meshNodesService: MeshNodesService) {}

  async ingestEvents(
    events: IngestedEvent[],
    scoreThreshold = 0.7,
    systemUser: any,
  ) {
    const createdNodes: import('../entities/mesh-node.entity').MeshNode[] = [];
    for (const event of events) {
      if (event.score >= scoreThreshold) {
        const dto: CreateMeshNodeDto = {
          title: event.title,
          description: event.description,
          category: event.category,
          tags: event.tags || [],
          systemGenerated: true,
        };
        const node = await this.meshNodesService.create(dto, systemUser);
        createdNodes.push(node);
        this.logger.log(`Auto-created MeshNode: ${node.title}`);
      }
    }
    return createdNodes;
  }
}
