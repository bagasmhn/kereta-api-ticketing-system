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

@Controller('jenis-kereta')
export class JenisKeretaController {
  constructor(private readonly jenisKeretaService: JenisKeretaService) {}

  // CREATE
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateJenisKeretaDto) {
    return this.jenisKeretaService.create(dto);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.jenisKeretaService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jenisKeretaService.findOne(Number(id));
  }

  // UPDATE
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateJenisKeretaDto,
  ) {
    return this.jenisKeretaService.update(Number(id), dto);
  }

  // DELETE
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jenisKeretaService.remove(Number(id));
  }
}