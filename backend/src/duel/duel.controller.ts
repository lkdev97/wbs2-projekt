import { Controller, Get, UseGuards } from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";

@Controller('duel')
@UseGuards(AuthGuard) //
export class DuelController {

    @Get()
    duelPage() {
        return "Duel Page";
    }
}
