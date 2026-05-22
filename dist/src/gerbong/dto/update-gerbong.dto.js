"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGerbongDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_gerbong_dto_1 = require("./create-gerbong.dto");
class UpdateGerbongDto extends (0, mapped_types_1.PartialType)(create_gerbong_dto_1.CreateGerbongDto) {
}
exports.UpdateGerbongDto = UpdateGerbongDto;
//# sourceMappingURL=update-gerbong.dto.js.map