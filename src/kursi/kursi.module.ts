import { Module } from '@nestjs/common';

import { KursiController } from './kursi.controller';
import { KursiService } from './kursi.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KursiController],
  providers: [KursiService],
})
export class KursiModule {}