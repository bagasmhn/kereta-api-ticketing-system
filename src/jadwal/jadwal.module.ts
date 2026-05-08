import { Module } from '@nestjs/common';

import { JadwalController } from './jadwal.controller';
import { JadwalService } from './jadwal.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JadwalController],
  providers: [JadwalService],
})
export class JadwalModule {}