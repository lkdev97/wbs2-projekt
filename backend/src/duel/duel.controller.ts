import { Controller, Get, UseGuards, Post, Body, Req, Patch } from '@nestjs/common';
import {AuthGuard} from "../auth/auth.guard";
import { DuelService } from './duel.service';
import { CreateDuelDto } from './dto/create-duel';
import { SubmitAnswerDto } from './dto/submit-answer';


@Controller('duel')
//@UseGuards(AuthGuard) //
export class DuelController {

    constructor(
        private readonly duelService: DuelService,
    ) {}
    @Get()
    duelPage() {
        return "Duel Page";
    }

    @Post()
    async startDuel(@Body() createDuelDto: CreateDuelDto, @Req() request)  {
        if(createDuelDto.challengerId == createDuelDto.opponentId) {
            return "you cant start a duel vs yourself";
        }
        if(await this.duelService.hasOngoingDuel(createDuelDto.challengerId)) {
            return `challenger ${createDuelDto.challengerId} has an ongoing duel`;
        }
        if(await this.duelService.hasOngoingDuel(createDuelDto.opponentId)) {
            return `opponent ${createDuelDto.opponentId} has an ongoing duel`;
        }

        return await this.duelService.createDuel(createDuelDto);
    }

    @Get('question')
    async getDuelQuestion(@Body() { duelId }) { 
        return this.duelService.selectNewQuestion(duelId);
    }

    @Patch('answer')
    async questionAnswer(@Body() { SubmitAnswerDto, userId }) {
        return await this.duelService.submitAnswer(SubmitAnswerDto.duelId, SubmitAnswerDto, userId);
    }

    @Patch('update')
    async finishDuel(@Body() { duelId, winnerId }) {
        return await this.duelService.updateDuel(duelId, winnerId);
    }
}
