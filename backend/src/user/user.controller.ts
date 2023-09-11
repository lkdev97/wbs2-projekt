import { Controller, Post, Body, Get, Param, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d "{\"username\": \"neuer_benutzer\", \"password\": \"passwort\"}
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: CreateUserDto, // assuming CreateUserDto is what you return
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  
  @Get('online')
  @ApiOperation({ summary: 'Get all online users' })
  @ApiOkResponse({ description: 'Successfully returned all users that are currently online' })
  getOnlineUsers() {
    return this.userService.getOnlineUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({ description: 'Successfully returned the user' })
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('role')
  @ApiOperation({ summary: 'Get user role by session ID' })
  @ApiOkResponse({ description: 'Successfully returned the user role' })
  getUserRoleBySessionId(@Req() request) {
    if (!request.session.user.id) {
      return null;
    }

    return this.userService.getUserRoleById(request.session.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiOkResponse({ description: 'Successfully updated the user' })
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
