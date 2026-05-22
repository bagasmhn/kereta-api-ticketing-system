import { KursiService } from './kursi.service';
import { CreateKursiDto } from './dto/create-kursi.dto';
import { UpdateKursiDto } from './dto/update-kursi.dto';
export declare class KursiController {
    private readonly kursiService;
    constructor(kursiService: KursiService);
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
        gerbongId: number;
        status: import(".prisma/client").$Enums.StatusKursi;
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
        gerbongId: number;
        status: import(".prisma/client").$Enums.StatusKursi;
    })[]>;
    findOne(id: string): Promise<{
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
        gerbongId: number;
        status: import(".prisma/client").$Enums.StatusKursi;
    }>;
    update(id: string, dto: UpdateKursiDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nomor: string;
        gerbongId: number;
        status: import(".prisma/client").$Enums.StatusKursi;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nomor: string;
        gerbongId: number;
        status: import(".prisma/client").$Enums.StatusKursi;
    }>;
}
