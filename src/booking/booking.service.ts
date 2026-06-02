import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import PDFDocument from 'pdfkit';
import * as QRCode from 'qrcode';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================
  // CREATE BOOKING
  // =========================
  async create(userId: number, body: any) {
    const penumpang = body.penumpang;

    if (!penumpang || penumpang.length === 0) {
      throw new BadRequestException(
        'Penumpang wajib diisi',
      );
    }

    let totalHarga = 0;

    for (const item of penumpang) {
      const kursi =
        await this.prisma.kursi.findUnique({
          where: {
            id: item.kursiId,
          },

          include: {
            gerbong: {
              include: {
                jadwal: true,
              },
            },
          },
        });

      if (!kursi) {
        throw new BadRequestException(
          `Kursi ID ${item.kursiId} tidak ditemukan`,
        );
      }

      if (kursi.status === 'BOOKED') {
        throw new BadRequestException(
          `Kursi ${kursi.nomor} sudah dibooking`,
        );
      }

      totalHarga +=
        kursi.gerbong.jadwal.harga;
    }

    const transaksi =
      await this.prisma.transaksi.create({
        data: {
          kodeTransaksi:
            'TRX-' + Date.now(),

          userId,

          totalPenumpang:
            penumpang.length,

          totalHarga,

          status: 'PENDING',
        },
      });

    for (const item of penumpang) {
      // Pastikan transaksi tidak diproses ganda
      // Kursi diubah menjadi BOOKED setelah payment sukses
      await this.prisma.detailBooking.create({
        data: {
          transaksiId: transaksi.id,

          kursiId: item.kursiId,

          namaPenumpang:
            item.namaPenumpang,

          nik: item.nik,
        },
      });

      // Kursi baru akan diubah menjadi BOOKED setelah payment sukses.
      // (Update dilakukan di PaymentService saat transaksi status menjadi SUCCESS.)
    }

    return {
      message: 'Booking berhasil',
      transaksiId: transaksi.id,
    };
  }

  // =========================
  // GENERATE PDF TICKET
  // =========================
  async generateTicket(
    id: number,
    res: any,
  ) {
    const transaksi =
      await this.prisma.transaksi.findUnique({
        where: { id },

        include: {
          user: true,

          detailBooking: {
            include: {
              kursi: {
                include: {
                  gerbong: {
                    include: {
                      jadwal: {
                        include: {
                          jenisKereta: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

    if (!transaksi) {
      throw new BadRequestException(
        'Transaksi tidak ditemukan',
      );
    }

    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
    });

    res.setHeader(
      'Content-Type',
      'application/pdf',
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=ticket-${transaksi.kodeTransaksi}.pdf`,
    );

    doc.pipe(res);

    // HEADER
    doc
      .rect(0, 0, 700, 100)
      .fill('#005BAC');

    doc
      .fillColor('white')
      .fontSize(30)
      .text(
        'E-TIKET KERETA',
        50,
        30,
      );

    doc
      .fontSize(14)
      .text(
        'PT Kereta Api Indonesia',
        50,
        70,
      );

    doc.fillColor('black');

    // BOX INFO
    doc
      .roundedRect(
        40,
        130,
        520,
        120,
        10,
      )
      .lineWidth(2)
      .stroke('#005BAC');

    doc
      .fontSize(18)
      .fillColor('#005BAC')
      .text(
        'INFORMASI PEMESANAN',
        60,
        145,
      );

    doc.fillColor('black');

    doc
      .fontSize(12)
      .text(
        `Kode Booking : ${transaksi.kodeTransaksi}`,
        60,
        180,
      );

    doc.text(
      `Pemesan : ${transaksi.user.name}`,
      60,
      200,
    );

    doc.text(
      `Total Penumpang : ${transaksi.totalPenumpang}`,
      300,
      180,
    );

    doc.text(
      `Status : ${transaksi.status}`,
      300,
      200,
    );

    doc.text(
      `Total Harga : Rp ${transaksi.totalHarga.toLocaleString('id-ID')}`,
      60,
      220,
    );

    let y = 280;

    for (const [
      index,
      item,
    ] of transaksi.detailBooking.entries()) {
      const jadwal =
        item.kursi.gerbong.jadwal;

      const kereta =
        jadwal.jenisKereta;

      doc
        .roundedRect(
          40,
          y,
          520,
          180,
          10,
        )
        .lineWidth(1.5)
        .stroke('#E67E22');

      doc
        .fillColor('#E67E22')
        .fontSize(16)
        .text(
          `PENUMPANG ${index + 1}`,
          60,
          y + 15,
        );

      doc.fillColor('black');

      doc.fontSize(12);

      doc.text(
        `Nama : ${item.namaPenumpang}`,
        60,
        y + 50,
      );

      doc.text(
        `NIK : ${item.nik}`,
        60,
        y + 70,
      );

      doc.text(
        `Kereta : ${kereta.nama}`,
        60,
        y + 90,
      );

      doc.text(
        `Rute : ${jadwal.asal} → ${jadwal.tujuan}`,
        60,
        y + 110,
      );

      doc.text(
        `Tanggal : ${new Date(
          jadwal.tanggalBerangkat,
        ).toLocaleDateString('id-ID')}`,
        60,
        y + 130,
      );

      doc.text(
        `Jam : ${jadwal.jamBerangkat}`,
        320,
        y + 50,
      );

      doc.text(
        `Gerbong : ${item.kursi.gerbong.nama}`,
        320,
        y + 70,
      );

      doc.text(
        `Kursi : ${item.kursi.nomor}`,
        320,
        y + 90,
      );

      const qr =
        await QRCode.toDataURL(
          transaksi.kodeTransaksi,
        );

      const base64Data =
        qr.replace(
          /^data:image\/png;base64,/,
          '',
        );

      const qrBuffer =
        Buffer.from(
          base64Data,
          'base64',
        );

      doc.image(
        qrBuffer,
        430,
        y + 40,
        {
          width: 80,
        },
      );

      y += 210;

      if (y > 650) {
        doc.addPage();
        y = 50;
      }
    }

    doc
      .fontSize(10)
      .fillColor('gray')
      .text(
        'Terima kasih telah menggunakan layanan PT Kereta Api Indonesia.',
        40,
        760,
        {
          align: 'center',
        },
      );

    doc.end();
  }

  // =========================
  // GET ALL
  // =========================
  async findAll() {
    return this.prisma.transaksi.findMany({
      include: {
        user: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =========================
  // MY BOOKING
  // =========================
  async myBooking(userId: number) {
    return this.prisma.transaksi.findMany({
      where: {
        userId,
      },

      include: {
        detailBooking: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =========================
  // CHECK STATUS
  // =========================
  async checkStatus(kode: string) {
    const transaksi =
      await this.prisma.transaksi.findUnique({
        where: {
          kodeTransaksi: kode,
        },

        include: {
          user: true,
          detailBooking: true,
        },
      });

    if (!transaksi) {
      throw new BadRequestException(
        'Transaksi tidak ditemukan',
      );
    }

    return transaksi;
  }

  // =========================
  // HISTORI USER
  // =========================
  async historiUser(
    userId: number,
    tanggal?: string,
    bulan?: string,
  ) {
    const where: any = {
      userId,
    };

    if (tanggal) {
      const start =
        new Date(tanggal);

      const end =
        new Date(tanggal);

      end.setHours(
        23,
        59,
        59,
        999,
      );

      where.createdAt = {
        gte: start,
        lte: end,
      };
    }

    if (bulan) {
      const year =
        new Date().getFullYear();

      const start =
        new Date(
          year,
          Number(bulan) - 1,
          1,
        );

      const end =
        new Date(
          year,
          Number(bulan),
          0,
          23,
          59,
          59,
        );

      where.createdAt = {
        gte: start,
        lte: end,
      };
    }

    return this.prisma.transaksi.findMany({
      where,

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // =========================
  // HISTORI PETUGAS
  // =========================
  async historiPetugas(
    tanggal?: string,
    bulan?: string,
  ) {
    const where: any = {};

    if (tanggal) {
      const start =
        new Date(tanggal);

      const end =
        new Date(tanggal);

      end.setHours(
        23,
        59,
        59,
        999,
      );

      where.createdAt = {
        gte: start,
        lte: end,
      };
    }

    if (bulan) {
      const year =
        new Date().getFullYear();

      const start =
        new Date(
          year,
          Number(bulan) - 1,
          1,
        );

      const end =
        new Date(
          year,
          Number(bulan),
          0,
          23,
          59,
          59,
        );

      where.createdAt = {
        gte: start,
        lte: end,
      };
    }

    return this.prisma.transaksi.findMany({
      where,

      include: {
        user: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

async rekapPemasukan(
  bulan?: number,
  tahun?: number,
) {
  const where: any = {
    status: 'SUCCESS',
  };

  if (bulan && tahun) {
    const start = new Date(
      tahun,
      bulan - 1,
      1,
    );

    const end = new Date(
      tahun,
      bulan,
      0,
      23,
      59,
      59,
    );

    where.createdAt = {
      gte: start,
      lte: end,
    };
  }

  const transaksi =
    await this.prisma.transaksi.findMany({
      where,
    });

  const totalPemasukan =
    transaksi.reduce(
      (sum, item) =>
        sum + item.totalHarga,
      0,
    );

  return {
    totalTransaksi:
      transaksi.length,

    totalPemasukan,

    bulan:
      bulan || 'Semua',

    tahun:
      tahun || 'Semua',
  };
}
}