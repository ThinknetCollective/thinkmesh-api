import { IsArray, IsString, IsNotEmpty } from 'class-validator';

export class CreateSummaryDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  solutionTexts: string[];

  @IsString()
  @IsNotEmpty()
  nodeId: string;
}
