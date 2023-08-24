import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/createUserDto";

@Controller('register')
export class RegisterController {
    constructor(private readonly userService: UserService) {}

    /**
     *
     * @param registerDto
     *
     * Test with CURL in CLI
     *
     * curl -X POST "http://localhost:3000/register" -H "Content-Type: application/json" -d "{\"username\": \"test\", \"password\": \"passwort\"}"
     */
    @Post()
    async register(@Body() registerDto: CreateUserDto) {
        const user = await this.userService.createUser(registerDto);

        if (user) {
            return 'success';
        } else {
            return 'failed';
        }
    }
    @Get()
    registerPage() {
        return "This is the register page";
    }
}
