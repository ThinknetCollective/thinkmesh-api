import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MetricsResponseDto } from '../../metrics/dto/metrics-response.dto';

export class SolutionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  upvotes: number;

  @ApiProperty()
  downvotes: number;

  @ApiProperty()
  totalVotes: number;

  @ApiProperty({ description: 'Islamic ethics score (0-100)' })
  totalScore: number;

  @ApiProperty({ description: 'Ranking position (1 = best)' })
  rank: number;

  @ApiPropertyOptional({ type: MetricsResponseDto })
  islamicMetrics?: MetricsResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
