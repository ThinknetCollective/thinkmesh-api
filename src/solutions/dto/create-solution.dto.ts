import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSolutionDto {
  @ApiProperty({
    example: 'You can optimize by using indexes in your DB.',
    description: 'Solution content (min 10 chars)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10, {
    message: 'Solution content must be at least 10 characters long',
  })
  content: string;

  @ApiProperty({
    example: 101,
    description: 'ID of the mesh node this solution belongs to',
  })
  @IsNotEmpty()
  meshNodeId: number;
}
