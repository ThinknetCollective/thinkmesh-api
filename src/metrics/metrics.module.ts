import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { IslamicMetrics } from './entities/islamic-metrics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IslamicMetrics])],
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService], // Export for use in SolutionsModule
})
export class MetricsModule {}
