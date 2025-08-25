import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshNodesService } from './mesh-nodes.service';
import { MeshNodesController } from './mesh-nodes.controller';
import { MeshNode } from './entities/mesh-node.entity';
import { TagsModule } from '../tags/tags.module';
import { SummarizationService } from './services/summarization.service';
import { SummarizationController } from './controllers/summarization.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeshNode]),
    TagsModule
  ],
  controllers: [MeshNodesController, SummarizationController],
  providers: [MeshNodesService, SummarizationService],
  exports: [MeshNodesService, SummarizationService],
})
export class MeshNodesModule {}
