import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateKursiDto } from './dto/create-kursi.dto';
import { UpdateKursiDto } from './dto/update-kursi.dto';

@Injectable()
export class KursiService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateKursiDto) {
    return this.prisma.kursi.create({
      data: dto,
      include: {
        gerbong: true,
      },
    });
  }

  // GET ALL
  async findAll() {
    return this.prisma.kursi.findMany({
      include: {
        gerbong: true,
      },
    });
  }

  // GET BY ID
  async findOne(id: number) {
    const kursi = await this.prisma.kursi.findUnique({
      where: { id },
      include: {
        gerbong: true,
      },
    });

    if (!kursi) {
      throw new NotFoundException(
        'Kursi tidak ditemukan',
      );
    }

    return kursi;
  }

  // UPDATE
  async update(id: number, dto: UpdateKursiDto) {
    await this.findOne(id);

    return this.prisma.kursi.update({
      where: { id },
      data: dto,
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.kursi.delete({
      where: { id },
    });
  }
}