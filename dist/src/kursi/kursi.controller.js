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
exports.KursiController = void 0;
const common_1 = require("@nestjs/common");
const kursi_service_1 = require("./kursi.service");
const create_kursi_dto_1 = require("./dto/create-kursi.dto");
const update_kursi_dto_1 = require("./dto/update-kursi.dto");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorators_1 = require("../auth/decorators/roles.decorators");
const swagger_1 = require("@nestjs/swagger");
let KursiController = class KursiController {
    kursiService;
    constructor(kursiService) {
        this.kursiService = kursiService;
    }
    create(dto) {
        return this.kursiService.create(dto);
    }
    findAll() {
        return this.kursiService.findAll();
    }
    findOne(id) {
        return this.kursiService.findOne(Number(id));
    }
    update(id, dto) {
        return this.kursiService.update(Number(id), dto);
    }
    remove(id) {
        return this.kursiService.remove(Number(id));
    }
};
exports.KursiController = KursiController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kursi_dto_1.CreateKursiDto]),
    __metadata("design:returntype", void 0)
], KursiController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KursiController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KursiController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_kursi_dto_1.UpdateKursiDto]),
    __metadata("design:returntype", void 0)
], KursiController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KursiController.prototype, "remove", null);
exports.KursiController = KursiController = __decorate([
    (0, common_1.Controller)('kursi'),
    __metadata("design:paramtypes", [kursi_service_1.KursiService])
], KursiController);
//# sourceMappingURL=kursi.controller.js.map