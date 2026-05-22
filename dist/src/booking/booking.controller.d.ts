import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(req: any, dto: CreateBookingDto): Promise<{
        message: string;
        transaksiId: number;
    }>;
    findAll(): Promise<({
        user: {
            id: number;
            email: string;
            name: string;
            password: string;
            phone: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusBooking;
        kodeTransaksi: string;
        totalPenumpang: number;
        totalHarga: number;
        userId: number;
    })[]>;
    myBooking(req: any): Promise<({
        detailBooking: {
            id: number;
            createdAt: Date;
            namaPenumpang: string;
            nik: string;
            transaksiId: number;
            kursiId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusBooking;
        kodeTransaksi: string;
        totalPenumpang: number;
        totalHarga: number;
        userId: number;
    })[]>;
    historyUser(req: any, tanggal?: string, bulan?: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusBooking;
        kodeTransaksi: string;
        totalPenumpang: number;
        totalHarga: number;
        userId: number;
    }[]>;
    rekapPemasukan(bulan?: string, tahun?: string): Promise<{
        totalTransaksi: number;
        totalPemasukan: number;
        bulan: string | number;
        tahun: string | number;
    }>;
    generateTicket(id: string, res: any): Promise<void>;
}
