import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JenisKeretaModule } from './jenis-kereta/jenis-kereta.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { GerbongModule } from './gerbong/gerbong.module';
import { KursiModule } from './kursi/kursi.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env',
    }),

    UserModule,
    AuthModule,
    PrismaModule,
    JenisKeretaModule,
    JadwalModule,
    GerbongModule,
    KursiModule,
    BookingModule,
    PaymentModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}