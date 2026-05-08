import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users -> ambil semua user
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  // GET /users/:id -> ambil user by id
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
}