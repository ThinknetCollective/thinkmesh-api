import { ApiProperty } from '@nestjs/swagger';

export class MetricsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 20 })
  maslaha: number;

  @ApiProperty({ example: 22 })
  adalah: number;

  @ApiProperty({ example: 18 })
  ihsan: number;

  @ApiProperty({ example: 21 })
  amanah: number;

  @ApiProperty({ example: -5 })
  dhararPrevention: number;

  @ApiProperty({ example: 76 })
  overallScore: number;

  @ApiProperty({ example: 'This solution promotes...' })
  aiExplanation: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
