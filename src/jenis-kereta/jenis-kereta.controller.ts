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

import { JenisKeretaService } from './jenis-kereta.service';
import { CreateJenisKeretaDto } from './dto/create-jenis-kereta.dto';
import { UpdateJenisKeretaDto } from './dto/update-jenis-kereta.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('jenis-kereta')
export class JenisKeretaController {
  constructor(
    private readonly jenisKeretaService: JenisKeretaService,
  ) {}

  // CREATE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Post()
  create(@Body() dto: CreateJenisKeretaDto) {
    return this.jenisKeretaService.create(dto);
  }

  // GET ALL (PUBLIC)
  @Get()
  findAll() {
    return this.jenisKeretaService.findAll();
  }

  // GET BY ID (PUBLIC)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jenisKeretaService.findOne(Number(id));
  }

  // UPDATE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateJenisKeretaDto,
  ) {
    return this.jenisKeretaService.update(Number(id), dto);
  }

  // DELETE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jenisKeretaService.remove(Number(id));
  }
}