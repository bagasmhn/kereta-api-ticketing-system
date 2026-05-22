import { PrismaService } from "../prisma/prisma.service";
import { CreateJenisKeretaDto } from './dto/create-jenis-kereta.dto';
import { UpdateJenisKeretaDto } from './dto/update-jenis-kereta.dto';
export declare class JenisKeretaService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateJenisKeretaDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }>;
    update(id: number, dto: UpdateJenisKeretaDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }>;
}
