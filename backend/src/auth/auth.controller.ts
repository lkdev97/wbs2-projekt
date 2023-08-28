import {Controller, Post, Get, Body, Req, OnModuleInit} from '@nestjs/common';
import { LoginDto } from "./dto/login.dto";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/createUserDto";
import * as session from 'express-session';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('auth')
export class AuthController implements OnModuleInit {

    constructor(
        private readonly userService: UserService,
        private readonly socketGateway: SocketGateway
        ) {}

    onModuleInit() {
        this.startSessionChecker();
    }

    //@TODO: Check if session.user is still activ and set offline
    startSessionChecker() {
        setInterval(async () => {
            const sessionData = (session as any).Session;
            if(!sessionData.user) return;

            const onlineUsers = await this.userService.getOnlineUsers();
            console.log(sessionData.user.id);
            await Promise.all(
                onlineUsers.map(async (user) => {
                    /*const hasSession = await this.sessionCheckerService.hasSession(user.id);
                    if (!hasSession) {
                        await this.userService.updateUserOnlineStatus(user.id, false);
                    }*/
                })
            );
            if(!sessionData) {
                //await this.userService.updateUserOnlineStatus()
            }
        }, 0.1 * 60 * 1000); // change timeout
    }

    /**
     *
     * @param loginDto
     *
     * Test with CURL in CLI
     *
     * replace "neuer_benutzer" and "passwort" with other valid or unvalid strings to test success and failed case
     * curl -X POST "http://localhost:3000/auth/login" -H "Content-Type: application/json" -d "{\"username\": \"admin\", \"password\": \"passwort\"}"
     */
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() request) {
        //const { username, password } = loginDto;
        const user = await this.userService.findByUsername(loginDto.username);

        if (user && user.password === loginDto.password) {
            request.session.user = user; //
            request.session.user.online = true; //
            this.socketGateway.server.emit('statusChange', { id: request.session.user.id, online: request.session.user.online }); // @Test
            //request.session.user.save(); //
            await this.userService.updateUserOnlineStatus(user.id, true);
            return 'success';
        } else {
            return 'failed';
        }
    }

    @Get('logout')
    async logout(@Req() request) {
        if(request.session.user) {
            //const user = request.session.user.online
            await this.userService.updateUserOnlineStatus(request.session.user.id, false);
            request.session.user.online = false;
            this.socketGateway.server.emit('statusChange', { id: request.session.user.id, online: request.session.user.online }); // @Test
            request.session.user = null;
            return "logged out!";
        }

        request.session.destroy((err) => {
            if (err) {
                console.error('Fehler beim Löschen der Session:', err);
            }
        });
    }

    /**
     *
     * @param registerDto
     *
     * Test with CURL in CLI
     *
     * curl -X POST "http://localhost:3000/auth/register" -H "Content-Type: application/json" -d "{\"username\": \"test\", \"password\": \"passwort\"}"
     */
    @Post('register')
    async register(@Body() registerDto: CreateUserDto) {
        const user = await this.userService.createUser(registerDto);

        if (user) {
            return 'success';
        } else {
            return 'failed';
        }
    }

    @Get()
    async loginPage(@Req() request) {
        //this.login({ username: 'admin', password: 'passwort' } as any, {} as Request);

        //rm
        //const user = await this.userService.findByUsername('admin');
        const user = await this.userService.findByUsername('user');

        if (user && user.password === 'passwort') {
            request.session.user = user; //
            request.session.user.online = true; //
            this.socketGateway.server.emit('statusChange', { id: user.id, online: request.session.user.online }); // @test
            await this.userService.updateUserOnlineStatus(user.id, true);
            return 'success';
        } else {
            return 'failed';
        }
        //rm
        //return "This is the login page";
    }
}
