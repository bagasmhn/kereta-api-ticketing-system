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

import { GerbongService } from './gerbong.service';

import { CreateGerbongDto } from './dto/create-gerbong.dto';
import { UpdateGerbongDto } from './dto/update-gerbong.dto';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('gerbong')
export class GerbongController {
  constructor(
    private readonly gerbongService: GerbongService,
  ) {}

  // CREATE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PETUGAS')
  @Post()
  create(@Body() dto: CreateGerbongDto) {
    return this.gerbongService.create(dto);
  }

  // GET ALL
  @Get()
  findAll() {
    return this.gerbongService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gerbongService.findOne(Number(id));
  }

  // UPDATE
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGerbongDto,
  ) {
    return this.gerbongService.update(Number(id), dto);
  }

  // DELETE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gerbongService.remove(Number(id));
  }
}