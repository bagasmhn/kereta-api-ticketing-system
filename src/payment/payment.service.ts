import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { InitPaymentDto } from './dto/init-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  // Buat payment ref + kembalikan redirectUrl
  async initPayment(
    userId: number,
    dto: InitPaymentDto,
  ) {
    const transaksi =
      await this.prisma.transaksi.findUnique({
        where: { id: dto.transaksiId },
        include: {
          detailBooking: true,
        },
      });

    if (!transaksi) {
      throw new BadRequestException(
        'Transaksi tidak ditemukan',
      );
    }

    if (transaksi.userId !== userId) {
      throw new BadRequestException(
        'Tidak diizinkan',
      );
    }

    if (transaksi.status !== 'PENDING') {
      throw new BadRequestException(
        'Transaksi tidak dalam status PENDING',
      );
    }

    // generate paymentRef sederhana (simulasi)
    const paymentRef =
      'PAY-' + Date.now() + '-' + Math.random().toString(16).slice(2);

    // Simpan payment ref dan metode pembayaran ke database supaya konfirmasi valid
    await this.prisma.transaksi.update({
      where: { id: transaksi.id },
      data: {
        paymentRef,
        paymentMethod: dto.paymentMethod,
      },
    });

    // Redirect ke halaman pembayaran di frontend (simulasi)
    // frontend bisa bikin page /payment?transaksiId=...&paymentRef=...
    const redirectUrl = `/payment?transaksiId=${transaksi.id}&paymentRef=${paymentRef}&method=${dto.paymentMethod}`;

    return {
      transaksiId: transaksi.id,
      paymentRef,
      paymentMethod: dto.paymentMethod,
      redirectUrl,
    };
  }

  // Simulasi webhook confirm payment
  async confirmPayment(
    userId: number,
    dto: ConfirmPaymentDto,
  ) {
    const transaksi =
      await this.prisma.transaksi.findUnique({
        where: { id: dto.transaksiId },
        include: {
          detailBooking: {
            include: {
              kursi: true,
            },
          },
        },
      });

    if (!transaksi) {
      throw new BadRequestException(
        'Transaksi tidak ditemukan',
      );
    }

    if (transaksi.userId !== userId) {
      throw new BadRequestException(
        'Tidak diizinkan',
      );
    }

    // paymentRef digunakan untuk simulasi validasi pembayaran
    if ((transaksi as any).paymentRef !== dto.paymentRef) {
      throw new BadRequestException(
        'Payment ref tidak sesuai',
      );
    }

    if (transaksi.status !== 'PENDING') {
      throw new BadRequestException(
        'Transaksi sudah diproses',
      );
    }

    // Update status transaksi menjadi SUCCESS
    await this.prisma.transaksi.update({
      where: { id: transaksi.id },
      data: {
        status: 'SUCCESS',
      },
    });

    // Update kursi menjadi BOOKED
    // (kursi yang terkait detailBooking)
    await Promise.all(
      transaksi.detailBooking.map(async (db) => {
        await this.prisma.kursi.update({
          where: { id: db.kursiId },
          data: { status: 'BOOKED' },
        });
      }),
    );

    return {
      message: 'Payment berhasil (simulasi)',
      transaksiId: transaksi.id,
      status: 'SUCCESS',
    };
  }

  ticketLink(transaksiId: number) {
    return {
      ticketUrl: `/booking/ticket/${transaksiId}`,
    };
  }
}

