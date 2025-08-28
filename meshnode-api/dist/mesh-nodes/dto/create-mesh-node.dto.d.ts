import { MeshNodeStatus } from '../entities/mesh-node.entity';
export declare class CreateMeshNodeDto {
    title: string;
    description: string;
    category: string;
    tags?: string[];
    status?: MeshNodeStatus;
}
