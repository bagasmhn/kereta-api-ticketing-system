import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { InitPaymentDto } from './dto/init-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // INIT PAYMENT -> frontend diarahkan ke halaman pembayaran (simulasi)
  @UseGuards(JwtAuthGuard)
  @Post('init')
  init(
    @Req() req,
    @Body() dto: InitPaymentDto,
  ) {
    return this.paymentService.initPayment(
      req.user.id,
      dto,
    );
  }

  // CONFIRM PAYMENT -> misal diakses oleh webhook dari payment gateway (simulasi)
  @UseGuards(JwtAuthGuard)
  @Post('confirm')
  confirm(
    @Req() req,
    @Body() dto: ConfirmPaymentDto,
  ) {
    return this.paymentService.confirmPayment(
      req.user.id,
      dto,
    );
  }

  // helper: link ke endpoint ticket
  @Get(':transaksiId/ticket-link')
  ticketLink(
    @Param('transaksiId') transaksiId: string,
  ) {
    return this.paymentService.ticketLink(
      Number(transaksiId),
    );
  }
}

