import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';

import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

import { Roles } from 'src/auth/decorators/roles.decorators';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // GET ALL USER
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN', 'PETUGAS')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // GET USER BY ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  // UPDATE USER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    return this.userService.update(
      Number(id),
      dto,
    );
  }

  // DELETE USER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(
      Number(id),
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
@Get('admin/all')
findAllAdmin() {
  return this.userService.findAllAdmin();
}

}