import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';

@Injectable()
export class JadwalService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateJadwalDto) {
    return this.prisma.jadwal.create({
      data: dto,
      include: {
        jenisKereta: true,
      },
    });
  }

  // GET ALL
  async findAll() {
    return this.prisma.jadwal.findMany({
      include: {
        jenisKereta: true,
      },
    });
  }

  // GET BY ID
  async findOne(id: number) {
    const jadwal = await this.prisma.jadwal.findUnique({
      where: { id },
      include: {
        jenisKereta: true,
      },
    });

    if (!jadwal) {
      throw new NotFoundException(
        'Jadwal tidak ditemukan',
      );
    }

    return jadwal;
  }

  // UPDATE
  async update(id: number, dto: UpdateJadwalDto) {
    await this.findOne(id);

    return this.prisma.jadwal.update({
      where: { id },
      data: dto,
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.jadwal.delete({
      where: { id },
    });
  }
}