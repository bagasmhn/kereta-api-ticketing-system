import { JadwalService } from './jadwal.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';
export declare class JadwalController {
    private readonly jadwalService;
    constructor(jadwalService: JadwalService);
    create(dto: CreateJadwalDto): Promise<{
        jenisKereta: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            deskripsi: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        asal: string;
        tujuan: string;
        tanggalBerangkat: Date;
        jamBerangkat: string;
        jamTiba: string;
        harga: number;
        jenisKeretaId: number;
    }>;
    findAll(): Promise<({
        jenisKereta: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            deskripsi: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        asal: string;
        tujuan: string;
        tanggalBerangkat: Date;
        jamBerangkat: string;
        jamTiba: string;
        harga: number;
        jenisKeretaId: number;
    })[]>;
    findOne(id: string): Promise<{
        jenisKereta: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            deskripsi: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        asal: string;
        tujuan: string;
        tanggalBerangkat: Date;
        jamBerangkat: string;
        jamTiba: string;
        harga: number;
        jenisKeretaId: number;
    }>;
    findKursiByJadwal(jadwalId: string): Promise<({
        gerbong: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            kapasitas: number;
            jadwalId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nomor: string;
        status: import(".prisma/client").$Enums.StatusKursi;
        gerbongId: number;
    })[]>;
    update(id: string, dto: UpdateJadwalDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        asal: string;
        tujuan: string;
        tanggalBerangkat: Date;
        jamBerangkat: string;
        jamTiba: string;
        harga: number;
        jenisKeretaId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        asal: string;
        tujuan: string;
        tanggalBerangkat: Date;
        jamBerangkat: string;
        jamTiba: string;
        harga: number;
        jenisKeretaId: number;
    }>;
}
