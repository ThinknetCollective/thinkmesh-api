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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshNode = exports.MeshNodeStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var MeshNodeStatus;
(function (MeshNodeStatus) {
    MeshNodeStatus["ACTIVE"] = "ACTIVE";
    MeshNodeStatus["INACTIVE"] = "INACTIVE";
    MeshNodeStatus["ARCHIVED"] = "ARCHIVED";
})(MeshNodeStatus || (exports.MeshNodeStatus = MeshNodeStatus = {}));
let MeshNode = class MeshNode {
    id;
    title;
    description;
    category;
    tags;
    status;
    createdAt;
    updatedAt;
    createdBy;
};
exports.MeshNode = MeshNode;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MeshNode.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MeshNode.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], MeshNode.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MeshNode.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], MeshNode.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MeshNodeStatus,
        default: MeshNodeStatus.ACTIVE
    }),
    __metadata("design:type", String)
], MeshNode.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MeshNode.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MeshNode.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.meshNodes, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], MeshNode.prototype, "createdBy", void 0);
exports.MeshNode = MeshNode = __decorate([
    (0, typeorm_1.Entity)('mesh_nodes')
], MeshNode);
//# sourceMappingURL=mesh-node.entity.js.map