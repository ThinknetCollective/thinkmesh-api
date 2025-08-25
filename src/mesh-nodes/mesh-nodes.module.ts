import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshNode } from './entities/mesh-node.entity';
import { SummarizationService } from './services/summarization.service';
import { SummarizationController } from './controllers/summarization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MeshNode])],
  controllers: [SummarizationController],
  providers: [SummarizationService],
  exports: [SummarizationService],
})
export class MeshNodesModule {}
