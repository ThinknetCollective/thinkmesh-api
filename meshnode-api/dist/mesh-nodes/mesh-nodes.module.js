"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshNodesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mesh_nodes_service_1 = require("./mesh-nodes.service");
const mesh_nodes_controller_1 = require("./mesh-nodes.controller");
const mesh_node_entity_1 = require("./entities/mesh-node.entity");
let MeshNodesModule = class MeshNodesModule {
};
exports.MeshNodesModule = MeshNodesModule;
exports.MeshNodesModule = MeshNodesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([mesh_node_entity_1.MeshNode])],
        controllers: [mesh_nodes_controller_1.MeshNodesController],
        providers: [mesh_nodes_service_1.MeshNodesService],
    })
], MeshNodesModule);
//# sourceMappingURL=mesh-nodes.module.js.map