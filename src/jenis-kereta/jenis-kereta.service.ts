import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJenisKeretaDto } from './dto/create-jenis-kereta.dto';
import { UpdateJenisKeretaDto } from './dto/update-jenis-kereta.dto';

@Injectable()
export class JenisKeretaService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateJenisKeretaDto) {
    return this.prisma.jenisKereta.create({
      data: {
        nama: dto.nama,
        deskripsi: dto.deskripsi,
      },
    });
  }

  // GET ALL
  async findAll() {
    return this.prisma.jenisKereta.findMany();
  }

  // GET BY ID
  async findOne(id: number) {
    const kereta = await this.prisma.jenisKereta.findUnique({
      where: { id },
    });

    if (!kereta) {
      throw new NotFoundException('Jenis kereta tidak ditemukan');
    }

    return kereta;
  }

  // UPDATE
  async update(id: number, dto: UpdateJenisKeretaDto) {
    await this.findOne(id);

    return this.prisma.jenisKereta.update({
      where: { id },
      data: {
        nama: dto.nama,
        deskripsi: dto.deskripsi,
      },
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.jenisKereta.delete({
      where: { id },
    });
  }
}