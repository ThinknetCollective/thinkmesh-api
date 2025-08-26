import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ example: 'nestjs', description: 'Tag name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'NestJS framework related tag', description: 'Tag description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'backend', description: 'Category for grouping tags' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: ['nodejs', 'typescript'], description: 'Alternative names' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];
}
