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

import { JadwalService } from './jadwal.service';

import { CreateJadwalDto } from './dto/create-jadwal.dto';
import { UpdateJadwalDto } from './dto/update-jadwal.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('jadwal')
export class JadwalController {
  constructor(
    private readonly jadwalService: JadwalService,
  ) {}

  // CREATE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Post()
  create(@Body() dto: CreateJadwalDto) {
    return this.jadwalService.create(dto);
  }

  // GET ALL (PUBLIC)
  @Get()
  findAll() {
    return this.jadwalService.findAll();
  }

  // GET BY ID (PUBLIC)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jadwalService.findOne(Number(id));
  }

  // UPDATE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateJadwalDto,
  ) {
    return this.jadwalService.update(Number(id), dto);
  }

  // DELETE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jadwalService.remove(Number(id));
  }
}