import { User } from '../../users/entities/user.entity';
export declare enum MeshNodeStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ARCHIVED = "ARCHIVED"
}
export declare class MeshNode {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    status: MeshNodeStatus;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
}
