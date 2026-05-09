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

    // CHECK KURSI
    for (const item of penumpang) {
      const kursi = await this.prisma.kursi.findUnique({
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

      totalHarga += kursi.gerbong.jadwal.harga;
    }

    // CREATE TRANSAKSI
    const transaksi =
      await this.prisma.transaksi.create({
        data: {
          kodeTransaksi:
            'TRX-' + Date.now(),

          userId,

          totalPenumpang:
            penumpang.length,

          totalHarga,

          status: 'SUCCESS',
        },
      });

    // CREATE DETAIL BOOKING
    for (const item of penumpang) {
      await this.prisma.detailBooking.create({
        data: {
          transaksiId: transaksi.id,

          kursiId: item.kursiId,

          namaPenumpang:
            item.namaPenumpang,

          nik: item.nik,
        },
      });

      // UPDATE STATUS KURSI
      await this.prisma.kursi.update({
        where: {
          id: item.kursiId,
        },
        data: {
          status: 'BOOKED',
        },
      });
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

    // =========================
    // HEADER
    // =========================
    doc
      .rect(0, 0, 700, 100)
      .fill('#005BAC');

    doc
      .fillColor('white')
      .fontSize(28)
      .text(
        'E-TIKET KERETA',
        50,
        35,
      );

    doc
      .fontSize(14)
      .text(
        'PT Kereta Api Indonesia',
        50,
        70,
      );

    doc.fillColor('black');

    // =========================
    // BOX INFORMASI
    // =========================
    doc
      .roundedRect(40, 130, 520, 120, 10)
      .stroke('#005BAC');

    doc
      .fontSize(18)
      .text(
        'INFORMASI PEMESANAN',
        60,
        145,
      );

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
      `Total Harga : Rp ${transaksi.totalHarga}`,
      60,
      220,
    );

    let y = 280;

    // =========================
    // DETAIL PENUMPANG
    // =========================
    for (const [index, item] of transaksi.detailBooking.entries()) {
      const jadwal =
        item.kursi.gerbong.jadwal;

      const kereta =
        jadwal.jenisKereta;

      // BOX
      doc
        .roundedRect(40, y, 520, 170, 10)
        .stroke('#E67E22');

      // TITLE
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

      // LEFT SIDE
      doc.text(
        'Nama',
        60,
        y + 50,
      );

      doc.text(
        `: ${item.namaPenumpang}`,
        150,
        y + 50,
      );

      doc.text(
        'NIK',
        60,
        y + 70,
      );

      doc.text(
        `: ${item.nik}`,
        150,
        y + 70,
      );

      doc.text(
        'Kereta',
        60,
        y + 90,
      );

      doc.text(
        `: ${kereta.nama}`,
        150,
        y + 90,
      );

      doc.text(
        'Rute',
        60,
        y + 110,
      );

      doc.text(
        `: ${jadwal.asal} → ${jadwal.tujuan}`,
        150,
        y + 110,
      );

      doc.text(
        'Tanggal',
        60,
        y + 130,
      );

      doc.text(
        `: ${new Date(
          jadwal.tanggalBerangkat,
        ).toLocaleDateString('id-ID')}`,
        150,
        y + 130,
      );

      // RIGHT SIDE
      doc.text(
        'Jam',
        320,
        y + 50,
      );

      doc.text(
        `: ${jadwal.jamBerangkat}`,
        390,
        y + 50,
      );

      doc.text(
        'Gerbong',
        320,
        y + 70,
      );

      doc.text(
        `: ${item.kursi.gerbong.nama}`,
        390,
        y + 70,
      );

      doc.text(
        'Kursi',
        320,
        y + 90,
      );

      doc.text(
        `: ${item.kursi.nomor}`,
        390,
        y + 90,
      );

      // QR CODE
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

      y += 200;
    }

    // =========================
    // FOOTER
    // =========================
    doc
      .fontSize(10)
      .fillColor('gray')
      .text(
        'Tunjukkan e-ticket ini kepada petugas sebelum keberangkatan.',
        40,
        760,
        {
          align: 'center',
        },
      );

    doc.end();
  }

  // =========================
  // GET ALL TRANSAKSI
  // =========================
  async findAll() {
    return this.prisma.transaksi.findMany({
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

    return transaksi;
  }
}