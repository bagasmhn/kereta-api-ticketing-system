"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pdfkit_1 = __importDefault(require("pdfkit"));
const QRCode = __importStar(require("qrcode"));
let BookingService = class BookingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, body) {
        const penumpang = body.penumpang;
        if (!penumpang || penumpang.length === 0) {
            throw new common_1.BadRequestException('Penumpang wajib diisi');
        }
        let totalHarga = 0;
        for (const item of penumpang) {
            const kursi = await this.prisma.kursi.findUnique({
                where: {
                    id: item.kursiId,
                },
                include: {
                    gerbong: {
                        include: {
                            jadwal: true,
                        },
                    },
                },
            });
            if (!kursi) {
                throw new common_1.BadRequestException(`Kursi ID ${item.kursiId} tidak ditemukan`);
            }
            if (kursi.status === 'BOOKED') {
                throw new common_1.BadRequestException(`Kursi ${kursi.nomor} sudah dibooking`);
            }
            totalHarga +=
                kursi.gerbong.jadwal.harga;
        }
        const transaksi = await this.prisma.transaksi.create({
            data: {
                kodeTransaksi: 'TRX-' + Date.now(),
                userId,
                totalPenumpang: penumpang.length,
                totalHarga,
                status: 'SUCCESS',
            },
        });
        for (const item of penumpang) {
            await this.prisma.detailBooking.create({
                data: {
                    transaksiId: transaksi.id,
                    kursiId: item.kursiId,
                    namaPenumpang: item.namaPenumpang,
                    nik: item.nik,
                },
            });
            await this.prisma.kursi.update({
                where: {
                    id: item.kursiId,
                },
                data: {
                    status: 'BOOKED',
                },
            });
        }
        return {
            message: 'Booking berhasil',
            transaksiId: transaksi.id,
        };
    }
    async generateTicket(id, res) {
        const transaksi = await this.prisma.transaksi.findUnique({
            where: { id },
            include: {
                user: true,
                detailBooking: {
                    include: {
                        kursi: {
                            include: {
                                gerbong: {
                                    include: {
                                        jadwal: {
                                            include: {
                                                jenisKereta: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!transaksi) {
            throw new common_1.BadRequestException('Transaksi tidak ditemukan');
        }
        const doc = new pdfkit_1.default({
            size: 'A4',
            margin: 40,
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=ticket-${transaksi.kodeTransaksi}.pdf`);
        doc.pipe(res);
        doc
            .rect(0, 0, 700, 100)
            .fill('#005BAC');
        doc
            .fillColor('white')
            .fontSize(30)
            .text('E-TIKET KERETA', 50, 30);
        doc
            .fontSize(14)
            .text('PT Kereta Api Indonesia', 50, 70);
        doc.fillColor('black');
        doc
            .roundedRect(40, 130, 520, 120, 10)
            .lineWidth(2)
            .stroke('#005BAC');
        doc
            .fontSize(18)
            .fillColor('#005BAC')
            .text('INFORMASI PEMESANAN', 60, 145);
        doc.fillColor('black');
        doc
            .fontSize(12)
            .text(`Kode Booking : ${transaksi.kodeTransaksi}`, 60, 180);
        doc.text(`Pemesan : ${transaksi.user.name}`, 60, 200);
        doc.text(`Total Penumpang : ${transaksi.totalPenumpang}`, 300, 180);
        doc.text(`Status : ${transaksi.status}`, 300, 200);
        doc.text(`Total Harga : Rp ${transaksi.totalHarga.toLocaleString('id-ID')}`, 60, 220);
        let y = 280;
        for (const [index, item,] of transaksi.detailBooking.entries()) {
            const jadwal = item.kursi.gerbong.jadwal;
            const kereta = jadwal.jenisKereta;
            doc
                .roundedRect(40, y, 520, 180, 10)
                .lineWidth(1.5)
                .stroke('#E67E22');
            doc
                .fillColor('#E67E22')
                .fontSize(16)
                .text(`PENUMPANG ${index + 1}`, 60, y + 15);
            doc.fillColor('black');
            doc.fontSize(12);
            doc.text(`Nama : ${item.namaPenumpang}`, 60, y + 50);
            doc.text(`NIK : ${item.nik}`, 60, y + 70);
            doc.text(`Kereta : ${kereta.nama}`, 60, y + 90);
            doc.text(`Rute : ${jadwal.asal} → ${jadwal.tujuan}`, 60, y + 110);
            doc.text(`Tanggal : ${new Date(jadwal.tanggalBerangkat).toLocaleDateString('id-ID')}`, 60, y + 130);
            doc.text(`Jam : ${jadwal.jamBerangkat}`, 320, y + 50);
            doc.text(`Gerbong : ${item.kursi.gerbong.nama}`, 320, y + 70);
            doc.text(`Kursi : ${item.kursi.nomor}`, 320, y + 90);
            const qr = await QRCode.toDataURL(transaksi.kodeTransaksi);
            const base64Data = qr.replace(/^data:image\/png;base64,/, '');
            const qrBuffer = Buffer.from(base64Data, 'base64');
            doc.image(qrBuffer, 430, y + 40, {
                width: 80,
            });
            y += 210;
            if (y > 650) {
                doc.addPage();
                y = 50;
            }
        }
        doc
            .fontSize(10)
            .fillColor('gray')
            .text('Terima kasih telah menggunakan layanan PT Kereta Api Indonesia.', 40, 760, {
            align: 'center',
        });
        doc.end();
    }
    async findAll() {
        return this.prisma.transaksi.findMany({
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async myBooking(userId) {
        return this.prisma.transaksi.findMany({
            where: {
                userId,
            },
            include: {
                detailBooking: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async checkStatus(kode) {
        const transaksi = await this.prisma.transaksi.findUnique({
            where: {
                kodeTransaksi: kode,
            },
            include: {
                user: true,
                detailBooking: true,
            },
        });
        if (!transaksi) {
            throw new common_1.BadRequestException('Transaksi tidak ditemukan');
        }
        return transaksi;
    }
    async historiUser(userId, tanggal, bulan) {
        const where = {
            userId,
        };
        if (tanggal) {
            const start = new Date(tanggal);
            const end = new Date(tanggal);
            end.setHours(23, 59, 59, 999);
            where.createdAt = {
                gte: start,
                lte: end,
            };
        }
        if (bulan) {
            const year = new Date().getFullYear();
            const start = new Date(year, Number(bulan) - 1, 1);
            const end = new Date(year, Number(bulan), 0, 23, 59, 59);
            where.createdAt = {
                gte: start,
                lte: end,
            };
        }
        return this.prisma.transaksi.findMany({
            where,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async historiPetugas(tanggal, bulan) {
        const where = {};
        if (tanggal) {
            const start = new Date(tanggal);
            const end = new Date(tanggal);
            end.setHours(23, 59, 59, 999);
            where.createdAt = {
                gte: start,
                lte: end,
            };
        }
        if (bulan) {
            const year = new Date().getFullYear();
            const start = new Date(year, Number(bulan) - 1, 1);
            const end = new Date(year, Number(bulan), 0, 23, 59, 59);
            where.createdAt = {
                gte: start,
                lte: end,
            };
        }
        return this.prisma.transaksi.findMany({
            where,
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async rekapPemasukan(bulan, tahun) {
        const where = {
            status: 'SUCCESS',
        };
        if (bulan && tahun) {
            const start = new Date(tahun, bulan - 1, 1);
            const end = new Date(tahun, bulan, 0, 23, 59, 59);
            where.createdAt = {
                gte: start,
                lte: end,
            };
        }
        const transaksi = await this.prisma.transaksi.findMany({
            where,
        });
        const totalPemasukan = transaksi.reduce((sum, item) => sum + item.totalHarga, 0);
        return {
            totalTransaksi: transaksi.length,
            totalPemasukan,
            bulan: bulan || 'Semua',
            tahun: tahun || 'Semua',
        };
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
//# sourceMappingURL=booking.service.js.map