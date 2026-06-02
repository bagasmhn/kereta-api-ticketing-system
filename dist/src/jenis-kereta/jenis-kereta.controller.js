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
exports.JenisKeretaController = void 0;
const common_1 = require("@nestjs/common");
const jenis_kereta_service_1 = require("./jenis-kereta.service");
const create_jenis_kereta_dto_1 = require("./dto/create-jenis-kereta.dto");
const update_jenis_kereta_dto_1 = require("./dto/update-jenis-kereta.dto");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorators_1 = require("../auth/decorators/roles.decorators");
const swagger_1 = require("@nestjs/swagger");
let JenisKeretaController = class JenisKeretaController {
    jenisKeretaService;
    constructor(jenisKeretaService) {
        this.jenisKeretaService = jenisKeretaService;
    }
    create(dto) {
        return this.jenisKeretaService.create(dto);
    }
    findAll() {
        return this.jenisKeretaService.findAll();
    }
    findOne(id) {
        return this.jenisKeretaService.findOne(Number(id));
    }
    update(id, dto) {
        return this.jenisKeretaService.update(Number(id), dto);
    }
    remove(id) {
        return this.jenisKeretaService.remove(Number(id));
    }
};
exports.JenisKeretaController = JenisKeretaController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_jenis_kereta_dto_1.CreateJenisKeretaDto]),
    __metadata("design:returntype", void 0)
], JenisKeretaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JenisKeretaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JenisKeretaController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_jenis_kereta_dto_1.UpdateJenisKeretaDto]),
    __metadata("design:returntype", void 0)
], JenisKeretaController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JenisKeretaController.prototype, "remove", null);
exports.JenisKeretaController = JenisKeretaController = __decorate([
    (0, common_1.Controller)('jenis-kereta'),
    __metadata("design:paramtypes", [jenis_kereta_service_1.JenisKeretaService])
], JenisKeretaController);
//# sourceMappingURL=jenis-kereta.controller.js.map