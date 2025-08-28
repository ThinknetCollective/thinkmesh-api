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
exports.MeshNodesController = void 0;
const common_1 = require("@nestjs/common");
const mesh_nodes_service_1 = require("./mesh-nodes.service");
const create_mesh_node_dto_1 = require("./dto/create-mesh-node.dto");
const update_mesh_node_dto_1 = require("./dto/update-mesh-node.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let MeshNodesController = class MeshNodesController {
    meshNodesService;
    constructor(meshNodesService) {
        this.meshNodesService = meshNodesService;
    }
    create(createMeshNodeDto, req) {
        return this.meshNodesService.create(createMeshNodeDto, req.user);
    }
    findAll(category, userId) {
        if (category) {
            return this.meshNodesService.findByCategory(category);
        }
        if (userId) {
            return this.meshNodesService.findByUser(userId);
        }
        return this.meshNodesService.findAll();
    }
    findOne(id) {
        return this.meshNodesService.findOne(+id);
    }
    update(id, updateMeshNodeDto, req) {
        return this.meshNodesService.update(+id, updateMeshNodeDto, req.user);
    }
    remove(id, req) {
        return this.meshNodesService.remove(+id, req.user);
    }
};
exports.MeshNodesController = MeshNodesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mesh_node_dto_1.CreateMeshNodeDto, Object]),
    __metadata("design:returntype", void 0)
], MeshNodesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], MeshNodesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MeshNodesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_mesh_node_dto_1.UpdateMeshNodeDto, Object]),
    __metadata("design:returntype", void 0)
], MeshNodesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MeshNodesController.prototype, "remove", null);
exports.MeshNodesController = MeshNodesController = __decorate([
    (0, common_1.Controller)('api/v1/mesh-nodes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [mesh_nodes_service_1.MeshNodesService])
], MeshNodesController);
//# sourceMappingURL=mesh-nodes.controller.js.map