import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMetricsDto {
  @ApiProperty({ example: 20, minimum: 0, maximum: 25 })
  @IsNumber()
  @Min(0)
  @Max(25)
  maslaha: number;

  @ApiProperty({ example: 22, minimum: 0, maximum: 25 })
  @IsNumber()
  @Min(0)
  @Max(25)
  adalah: number;

  @ApiProperty({ example: 18, minimum: 0, maximum: 25 })
  @IsNumber()
  @Min(0)
  @Max(25)
  ihsan: number;

  @ApiProperty({ example: 21, minimum: 0, maximum: 25 })
  @IsNumber()
  @Min(0)
  @Max(25)
  amanah: number;

  @ApiProperty({ example: -5, minimum: -50, maximum: 0 })
  @IsNumber()
  @Min(-50)
  @Max(0)
  dhararPrevention: number;

  @ApiPropertyOptional({ example: 'This solution promotes public welfare...' })
  @IsOptional()
  @IsString()
  aiExplanation?: string;
}
