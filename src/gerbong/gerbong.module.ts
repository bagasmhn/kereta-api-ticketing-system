import { Module } from '@nestjs/common';

import { GerbongController } from './gerbong.controller';
import { GerbongService } from './gerbong.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GerbongController],
  providers: [GerbongService],
})
export class GerbongModule {}