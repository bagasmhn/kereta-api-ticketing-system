import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateGerbongDto } from './dto/create-gerbong.dto';
import { UpdateGerbongDto } from './dto/update-gerbong.dto';

@Injectable()
export class GerbongService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreateGerbongDto) {
    return this.prisma.gerbong.create({
      data: dto,
      include: {
        jadwal: true,
      },
    });
  }

  // GET ALL
  async findAll() {
    return this.prisma.gerbong.findMany({
      include: {
        jadwal: true,
      },
    });
  }

  // GET BY ID
  async findOne(id: number) {
    const gerbong = await this.prisma.gerbong.findUnique({
      where: { id },
      include: {
        jadwal: true,
      },
    });

    if (!gerbong) {
      throw new NotFoundException(
        'Gerbong tidak ditemukan',
      );
    }

    return gerbong;
  }

  // UPDATE
  async update(id: number, dto: UpdateGerbongDto) {
    await this.findOne(id);

    return this.prisma.gerbong.update({
      where: { id },
      data: dto,
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.gerbong.delete({
      where: { id },
    });
  }
}