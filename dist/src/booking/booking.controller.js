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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const common_2 = require("@nestjs/common");
const roles_decorators_1 = require("../auth/decorators/roles.decorators");
const roles_guard_1 = require("../auth/guard/roles.guard");
let BookingController = class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    create(req, dto) {
        console.log(req.user);
        return this.bookingService.create(req.user.id, dto);
    }
    findAll() {
        return this.bookingService.findAll();
    }
    myBooking(req) {
        return this.bookingService.myBooking(req.user.id);
    }
    historyUser(req, tanggal, bulan) {
        return this.bookingService.historiUser(req.user.id, tanggal, bulan);
    }
    rekapPemasukan(bulan, tahun) {
        return this.bookingService.rekapPemasukan(bulan ? Number(bulan) : undefined, tahun ? Number(tahun) : undefined);
    }
    generateTicket(id, res) {
        return this.bookingService.generateTicket(Number(id), res);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "myBooking", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('history/my'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_2.Query)('tanggal')),
    __param(2, (0, common_2.Query)('bulan')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "historyUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorators_1.Roles)('PETUGAS', 'SUPER_ADMIN'),
    (0, common_1.Get)('rekap/pemasukan'),
    __param(0, (0, common_2.Query)('bulan')),
    __param(1, (0, common_2.Query)('tahun')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "rekapPemasukan", null);
__decorate([
    (0, common_1.Get)('ticket/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "generateTicket", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map