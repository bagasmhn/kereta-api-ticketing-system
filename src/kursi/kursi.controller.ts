import {
  Body,
  Controller,
 Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { KursiService } from './kursi.service';

import { CreateKursiDto } from './dto/create-kursi.dto';
import { UpdateKursiDto } from './dto/update-kursi.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('kursi')
export class KursiController {
  constructor(
    private readonly kursiService: KursiService,
  ) {}

  // CREATE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PETUGAS')
  @Post()
  create(@Body() dto: CreateKursiDto) {
    return this.kursiService.create(dto);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.kursiService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kursiService.findOne(Number(id));
  }

  // UPDATE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PETUGAS')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateKursiDto,
  ) {
    return this.kursiService.update(Number(id), dto);
  }

  // DELETE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PETUGAS')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kursiService.remove(Number(id));
  }
}