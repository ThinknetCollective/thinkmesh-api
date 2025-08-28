import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshNodesService } from './mesh-nodes.service';
import { MeshNodesController } from './mesh-nodes.controller';
import { MeshNode } from './entities/mesh-node.entity';
import { TagsModule } from '../tags/tags.module';
import { SummarizationService } from './services/summarization.service';
import { SummarizationController } from './controllers/summarization.controller';
import { MeshNodeEventIngestionController } from './controllers/meshnode-event-ingestion.controller';
import { MeshNodeEventIngestionService } from './services/meshnode-event-ingestion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeshNode]),
    TagsModule
  ],
  controllers: [MeshNodesController, SummarizationController, MeshNodeEventIngestionController],
  providers: [MeshNodesService, SummarizationService, MeshNodeEventIngestionService],
  exports: [MeshNodesService, SummarizationService, MeshNodeEventIngestionService],
})
export class MeshNodesModule {}
