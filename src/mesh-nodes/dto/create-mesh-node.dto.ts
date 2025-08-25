import { IsString, IsNotEmpty, IsArray, IsOptional, IsEnum } from 'class-validator';
import { MeshNodeStatus } from '../entities/mesh-node.entity';

export class CreateMeshNodeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsEnum(MeshNodeStatus)
  @IsOptional()
  status?: MeshNodeStatus;
}
