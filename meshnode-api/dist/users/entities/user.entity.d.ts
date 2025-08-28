import { MeshNode } from '../../mesh-nodes/entities/mesh-node.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    meshNodes: MeshNode[];
}
