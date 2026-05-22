"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKursiDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_kursi_dto_1 = require("./create-kursi.dto");
class UpdateKursiDto extends (0, mapped_types_1.PartialType)(create_kursi_dto_1.CreateKursiDto) {
}
exports.UpdateKursiDto = UpdateKursiDto;
//# sourceMappingURL=update-kursi.dto.js.map