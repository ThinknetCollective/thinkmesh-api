import { Repository } from 'typeorm';
import { MeshNode } from './entities/mesh-node.entity';
import { CreateMeshNodeDto } from './dto/create-mesh-node.dto';
import { UpdateMeshNodeDto } from './dto/update-mesh-node.dto';
import { User } from '../users/entities/user.entity';
export declare class MeshNodesService {
    private meshNodesRepository;
    constructor(meshNodesRepository: Repository<MeshNode>);
    create(createMeshNodeDto: CreateMeshNodeDto, user: User): Promise<MeshNode>;
    findAll(): Promise<MeshNode[]>;
    findOne(id: number): Promise<MeshNode>;
    update(id: number, updateMeshNodeDto: UpdateMeshNodeDto, user: User): Promise<MeshNode>;
    remove(id: number, user: User): Promise<void>;
    findByUser(userId: number): Promise<MeshNode[]>;
    findByCategory(category: string): Promise<MeshNode[]>;
}
