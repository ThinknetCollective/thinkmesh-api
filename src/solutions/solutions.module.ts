import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { Solution } from './entities/solution.entity';
import { MeshNode } from '../mesh-nodes/entities/mesh-node.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solution, MeshNode, User])],
  controllers: [SolutionsController],
  providers: [SolutionsService],
  exports: [SolutionsService],
})
export class SolutionsModule {}
