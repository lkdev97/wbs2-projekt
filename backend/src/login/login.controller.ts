import { Controller, Get, Post, Body, Req, OnModuleInit  } from '@nestjs/common';
import { UserService } from '../user/user.service'
import { LoginDto } from "./dto/login.dto";
import * as session from 'express-session';

@Controller('login')
export class LoginController implements OnModuleInit{
    constructor(private readonly userService: UserService) {}

    onModuleInit() {
        this.startSessionChecker();
    }


    startSessionChecker() {
        setInterval(async () => {
            const sessionData = (session as any).Session;

            const onlineUsers = await this.userService.getOnlineUsers();
            console.log(sessionData);
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
        //@TODO: Check if session.user is still activ and set offline if
        }, 0.1 * 60 * 1000);
    }
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
            request.session.userId = user.id; //@TODO user in der Session speichern
            request.session.user = user; //
            request.session.user.online = true; //
            //request.session.user.save(); //
            await this.userService.updateUserOnlineStatus(user.id, true);
            return 'success';
        } else {
            return 'failed';
        }
    }
    //move this later to another controller
    @Get('logout')
    async logout(@Req() request) {
        if(request.session.userId) {
            const user = request.session.user.online
            await this.userService.updateUserOnlineStatus(request.session.userId, false);
            user.online = false;
            user.save();

            request.session.userId = null;
            return "logged out!";
        }

        request.session.destroy((err) => {
            if (err) {
                console.error('Fehler beim Löschen der Session:', err);
            }
        });
    }

    @Get()
    async loginPage(@Req() request) {
        //this.login({ username: 'admin', password: 'passwort' } as any, {} as Request);

        //rm
        //const user = await this.userService.findByUsername('admin');
        const user = await this.userService.findByUsername('neuer_benutzer');

        if (user && user.password === 'passwort') {
            request.session.userId = user.id;
            request.session.user = user; //
            request.session.user.online = true; //
            await this.userService.updateUserOnlineStatus(user.id, true);
            return 'success';
        } else {
            return 'failed';
        }
        //rm
        //return "This is the login page";
    }
}
