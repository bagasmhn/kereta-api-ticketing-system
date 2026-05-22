import { PrismaService } from "../prisma/prisma.service";
import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';
export declare class JadwalService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, dto: UpdateJadwalDto): Promise<{
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
    remove(id: number): Promise<{
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
