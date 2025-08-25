import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuggestTagsDto {
  @ApiProperty({ example: 'Implement caching', description: 'Title of the suggestion' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'We need to add caching to improve performance.', description: 'Detailed description' })
  @IsNotEmpty()
  @IsString()
  description: string;
}
