import { GerbongService } from './gerbong.service';
import { CreateGerbongDto } from './dto/create-gerbong.dto';
import { UpdateGerbongDto } from './dto/update-gerbong.dto';
export declare class GerbongController {
    private readonly gerbongService;
    constructor(gerbongService: GerbongService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateGerbongDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        kapasitas: number;
        jadwalId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        kapasitas: number;
        jadwalId: number;
    }>;
}
