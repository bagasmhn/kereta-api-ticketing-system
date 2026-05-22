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
exports.GerbongController = void 0;
const common_1 = require("@nestjs/common");
const gerbong_service_1 = require("./gerbong.service");
const create_gerbong_dto_1 = require("./dto/create-gerbong.dto");
const update_gerbong_dto_1 = require("./dto/update-gerbong.dto");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const roles_guard_1 = require("../auth/guard/roles.guard");
const roles_decorators_1 = require("../auth/decorators/roles.decorators");
let GerbongController = class GerbongController {
    gerbongService;
    constructor(gerbongService) {
        this.gerbongService = gerbongService;
    }
    create(dto) {
        return this.gerbongService.create(dto);
    }
    findAll() {
        return this.gerbongService.findAll();
    }
    findOne(id) {
        return this.gerbongService.findOne(Number(id));
    }
    update(id, dto) {
        return this.gerbongService.update(Number(id), dto);
    }
    remove(id) {
        return this.gerbongService.remove(Number(id));
    }
};
exports.GerbongController = GerbongController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gerbong_dto_1.CreateGerbongDto]),
    __metadata("design:returntype", void 0)
], GerbongController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GerbongController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GerbongController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_gerbong_dto_1.UpdateGerbongDto]),
    __metadata("design:returntype", void 0)
], GerbongController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('SUPER_ADMIN', 'PETUGAS'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GerbongController.prototype, "remove", null);
exports.GerbongController = GerbongController = __decorate([
    (0, common_1.Controller)('gerbong'),
    __metadata("design:paramtypes", [gerbong_service_1.GerbongService])
], GerbongController);
//# sourceMappingURL=gerbong.controller.js.map