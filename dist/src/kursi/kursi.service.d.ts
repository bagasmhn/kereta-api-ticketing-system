import { PrismaService } from "../prisma/prisma.service";
import { CreateKursiDto } from './dto/create-kursi.dto';
import { UpdateKursiDto } from './dto/update-kursi.dto';
export declare class KursiService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateKursiDto): Promise<{
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
    }>;
    findAll(): Promise<({
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
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, dto: UpdateKursiDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nomor: string;
        status: import(".prisma/client").$Enums.StatusKursi;
        gerbongId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nomor: string;
        status: import(".prisma/client").$Enums.StatusKursi;
        gerbongId: number;
    }>;
}
