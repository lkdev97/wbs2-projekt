import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d "{\"username\": \"neuer_benutzer\", \"password\": \"passwort\"}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
