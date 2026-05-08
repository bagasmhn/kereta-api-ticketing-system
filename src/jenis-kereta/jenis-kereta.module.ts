import { Module } from '@nestjs/common';
import { JenisKeretaController } from './jenis-kereta.controller';
import { JenisKeretaService } from './jenis-kereta.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JenisKeretaController],
  providers: [JenisKeretaService],
})
export class JenisKeretaModule {}