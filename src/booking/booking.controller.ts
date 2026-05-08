import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { BookingService } from './booking.service';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

import { CreateBookingDto } from './dto/create-booking.dto';

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
}