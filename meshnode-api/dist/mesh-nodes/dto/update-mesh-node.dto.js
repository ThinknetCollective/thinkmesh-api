"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeshNodeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mesh_node_dto_1 = require("./create-mesh-node.dto");
class UpdateMeshNodeDto extends (0, mapped_types_1.PartialType)(create_mesh_node_dto_1.CreateMeshNodeDto) {
}
exports.UpdateMeshNodeDto = UpdateMeshNodeDto;
//# sourceMappingURL=update-mesh-node.dto.js.map