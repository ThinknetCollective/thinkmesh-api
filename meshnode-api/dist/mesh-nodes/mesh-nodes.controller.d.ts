import { MeshNodesService } from './mesh-nodes.service';
import { CreateMeshNodeDto } from './dto/create-mesh-node.dto';
import { UpdateMeshNodeDto } from './dto/update-mesh-node.dto';
export declare class MeshNodesController {
    private readonly meshNodesService;
    constructor(meshNodesService: MeshNodesService);
    create(createMeshNodeDto: CreateMeshNodeDto, req: any): Promise<import("./entities/mesh-node.entity").MeshNode>;
    findAll(category?: string, userId?: number): Promise<import("./entities/mesh-node.entity").MeshNode[]>;
    findOne(id: string): Promise<import("./entities/mesh-node.entity").MeshNode>;
    update(id: string, updateMeshNodeDto: UpdateMeshNodeDto, req: any): Promise<import("./entities/mesh-node.entity").MeshNode>;
    remove(id: string, req: any): Promise<void>;
}
