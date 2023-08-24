import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { LoginDto } from "./dto/login.dto";

@Controller('login')
export class LoginController {
    constructor(private readonly userService: UserService) {}

    /**
     *
     * @param loginDto
     *
     * Test with CURL in CLI
     *
     * replace "neuer_benutzer" and "passwort" with other valid or unvalid strings to test success and failed case
     * curl -X POST "http://localhost:3000/login" -H "Content-Type: application/json" -d "{\"username\": \"neuer_benutzer\", \"password\": \"passwort\"}"
     */
    @Post()
    async login(@Body() loginDto: LoginDto, @Req() request) {
        //const { username, password } = loginDto;
        const user = await this.userService.findByUsername(loginDto.username);

        if (user && user.password === loginDto.password) {
            request.session.userId = user.id;
            return 'success';
        } else {
            return 'failed';
        }
    }
    @Get()
    loginPage() {
        //this.login({ username: 'admin', password: 'passwort' } as any, {} as Request);
        return "This is the login page";
    }
}
