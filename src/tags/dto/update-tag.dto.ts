import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @ApiPropertyOptional({ example: 'nestjs-updated', description: 'Updated tag name' })
  name?: string;
}
