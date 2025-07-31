import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshNodesService } from './mesh-nodes.service';
import { MeshNodesController } from './mesh-nodes.controller';
import { MeshNode } from './entities/mesh-node.entity';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeshNode]),
    TagsModule
  ],
  controllers: [MeshNodesController],
  providers: [MeshNodesService],
  exports: [MeshNodesService],
})
export class MeshNodesModule {}
