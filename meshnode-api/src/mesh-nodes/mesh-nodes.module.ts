import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshNodesService } from './mesh-nodes.service';
import { MeshNodesController } from './mesh-nodes.controller';
import { MeshNode } from './entities/mesh-node.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MeshNode])],
  controllers: [MeshNodesController],
  providers: [MeshNodesService],
})
export class MeshNodesModule {}
