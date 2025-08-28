"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshNodesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mesh_node_entity_1 = require("./entities/mesh-node.entity");
let MeshNodesService = class MeshNodesService {
    meshNodesRepository;
    constructor(meshNodesRepository) {
        this.meshNodesRepository = meshNodesRepository;
    }
    async create(createMeshNodeDto, user) {
        const meshNode = this.meshNodesRepository.create({
            ...createMeshNodeDto,
            createdBy: user,
        });
        return this.meshNodesRepository.save(meshNode);
    }
    async findAll() {
        return this.meshNodesRepository.find({
            relations: ['createdBy'],
            select: {
                createdBy: {
                    id: true,
                    username: true,
                },
            },
        });
    }
    async findOne(id) {
        const meshNode = await this.meshNodesRepository.findOne({
            where: { id },
            relations: ['createdBy'],
            select: {
                createdBy: {
                    id: true,
                    username: true,
                },
            },
        });
        if (!meshNode) {
            throw new common_1.NotFoundException(`MeshNode with ID ${id} not found`);
        }
        return meshNode;
    }
    async update(id, updateMeshNodeDto, user) {
        const meshNode = await this.findOne(id);
        if (meshNode.createdBy.id !== user.id) {
            throw new common_1.ForbiddenException('You can only update your own mesh nodes');
        }
        Object.assign(meshNode, updateMeshNodeDto);
        return this.meshNodesRepository.save(meshNode);
    }
    async remove(id, user) {
        const meshNode = await this.findOne(id);
        if (meshNode.createdBy.id !== user.id) {
            throw new common_1.ForbiddenException('You can only delete your own mesh nodes');
        }
        await this.meshNodesRepository.remove(meshNode);
    }
    async findByUser(userId) {
        return this.meshNodesRepository.find({
            where: { createdBy: { id: userId } },
            relations: ['createdBy'],
        });
    }
    async findByCategory(category) {
        return this.meshNodesRepository.find({
            where: { category },
            relations: ['createdBy'],
        });
    }
};
exports.MeshNodesService = MeshNodesService;
exports.MeshNodesService = MeshNodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mesh_node_entity_1.MeshNode)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MeshNodesService);
//# sourceMappingURL=mesh-nodes.service.js.map