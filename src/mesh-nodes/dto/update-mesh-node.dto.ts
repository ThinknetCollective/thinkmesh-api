import { PartialType } from '@nestjs/mapped-types';
import { CreateMeshNodeDto } from './create-mesh-node.dto';

export class UpdateMeshNodeDto extends PartialType(CreateMeshNodeDto) {}
