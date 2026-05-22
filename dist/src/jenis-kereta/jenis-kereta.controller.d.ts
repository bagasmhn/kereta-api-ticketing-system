import { JenisKeretaService } from './jenis-kereta.service';
import { CreateJenisKeretaDto } from './dto/create-jenis-kereta.dto';
import { UpdateJenisKeretaDto } from './dto/update-jenis-kereta.dto';
export declare class JenisKeretaController {
    private readonly jenisKeretaService;
    constructor(jenisKeretaService: JenisKeretaService);
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
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }>;
    update(id: string, dto: UpdateJenisKeretaDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        deskripsi: string | null;
    }>;
}
