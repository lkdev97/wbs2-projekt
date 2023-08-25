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
    //move this later to another controller
    @Get('logout')
    async logout(@Req() request) {
        if(request.session.userId) {
            request.session.userId = null;
            return "logged out!";
        }
    }
    @Get()
    async loginPage(@Req() request) {
        //this.login({ username: 'admin', password: 'passwort' } as any, {} as Request);

        //rm
        const user = await this.userService.findByUsername('admin');

        if (user && user.password === 'passwort') {
            request.session.userId = user.id;
            return 'success';
        } else {
            return 'failed';
        }
        //rm
        //return "This is the login page";
    }
}
