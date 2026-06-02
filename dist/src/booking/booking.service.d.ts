import { PrismaService } from "../prisma/prisma.service";
export declare class BookingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, body: any): Promise<{
        message: string;
        transaksiId: number;
    }>;
    generateTicket(id: number, res: any): Promise<void>;
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
        paymentMethod: string | null;
        paymentRef: string | null;
        userId: number;
    })[]>;
    myBooking(userId: number): Promise<({
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
        paymentMethod: string | null;
        paymentRef: string | null;
        userId: number;
    })[]>;
    checkStatus(kode: string): Promise<{
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
        paymentMethod: string | null;
        paymentRef: string | null;
        userId: number;
    }>;
    historiUser(userId: number, tanggal?: string, bulan?: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.StatusBooking;
        kodeTransaksi: string;
        totalPenumpang: number;
        totalHarga: number;
        paymentMethod: string | null;
        paymentRef: string | null;
        userId: number;
    }[]>;
    historiPetugas(tanggal?: string, bulan?: string): Promise<({
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
        paymentMethod: string | null;
        paymentRef: string | null;
        userId: number;
    })[]>;
    rekapPemasukan(bulan?: number, tahun?: number): Promise<{
        totalTransaksi: number;
        totalPemasukan: number;
        bulan: string | number;
        tahun: string | number;
    }>;
}
