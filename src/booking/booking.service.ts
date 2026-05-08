import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateBookingDto) {
    // cek kursi
    const kursi = await this.prisma.kursi.findUnique({
      where: {
        id: dto.kursiId,
      },
    });

    if (!kursi) {
      throw new BadRequestException(
        'Kursi tidak ditemukan',
      );
    }

    // cek status kursi
    if (kursi.status === 'BOOKED') {
      throw new BadRequestException(
        'Kursi sudah dibooking',
      );
    }

    // booking
    const booking = await this.prisma.booking.create({
      data: {
        kodeBooking:
          'TRX-' + Date.now(),

        userId,
        kursiId: dto.kursiId,

        status: 'SUCCESS',
      },

      include: {
        user: true,
        kursi: {
          include: {
            gerbong: {
              include: {
                jadwal: true,
              },
            },
          },
        },
      },
    });

    // update kursi
    await this.prisma.kursi.update({
      where: {
        id: dto.kursiId,
      },

      data: {
        status: 'BOOKED',
      },
    });

    return booking;
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        kursi: {
          include: {
            gerbong: {
              include: {
                jadwal: true,
              },
            },
          },
        },
      },
    });
  }
}