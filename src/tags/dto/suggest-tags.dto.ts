import { IsNotEmpty, IsString } from 'class-validator';

export class SuggestTagsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
