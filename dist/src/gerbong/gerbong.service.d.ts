import { PrismaService } from "../prisma/prisma.service";
import { CreateGerbongDto } from './dto/create-gerbong.dto';
import { UpdateGerbongDto } from './dto/update-gerbong.dto';
export declare class GerbongService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateGerbongDto): Promise<{
        jadwal: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        kapasitas: number;
        jadwalId: number;
    }>;
    findAll(): Promise<({
        jadwal: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        kapasitas: number;
        jadwalId: number;
    })[]>;
    findOne(id: number): Promise<{
        jadwal: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        kapasitas: number;
        jadwalId: number;
    }>;
    update(id: number, dto: UpdateGerbongDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        kapasitas: number;
        jadwalId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        kapasitas: number;
        jadwalId: number;
    }>;
}
