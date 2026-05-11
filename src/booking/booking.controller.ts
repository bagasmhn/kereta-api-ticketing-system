import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Param,
  UseGuards,
} from '@nestjs/common';

import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Query } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  // BOOKING TIKET
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req,
    @Body() dto: CreateBookingDto,
  ) {
    console.log(req.user);

    return this.bookingService.create(
      req.user.id,
      dto,
    );
  }

  // GET ALL BOOKING
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
@Get('my')
myBooking(
  @Req() req,
) {
  return this.bookingService.myBooking(
    req.user.id,
  );
}

// =========================
// HISTORI USER
// =========================
@UseGuards(JwtAuthGuard)
@Get('history/my')
historyUser(
  @Req() req,
  @Query('tanggal') tanggal?: string,
  @Query('bulan') bulan?: string,
) {
  return this.bookingService.historiUser(
    req.user.id,
    tanggal,
    bulan,
  );
}


// REKAP PEMASUKAN
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PETUGAS', 'SUPER_ADMIN')
@Get('rekap/pemasukan')
rekapPemasukan(
  @Query('bulan') bulan?: string,
  @Query('tahun') tahun?: string,
) {
  return this.bookingService.rekapPemasukan(
    bulan ? Number(bulan) : undefined,
    tahun ? Number(tahun) : undefined,
  );
}

  // DOWNLOAD PDF TIKET
  @Get('ticket/:id')
  generateTicket(
    @Param('id') id: string,
    @Res() res,
  ) {
    return this.bookingService.generateTicket(
      Number(id),
      res,
    );
  }
}