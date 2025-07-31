import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSolutionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Solution content must be at least 10 characters long' })
  content: string;

  @IsNotEmpty()
  meshNodeId: number;
}
