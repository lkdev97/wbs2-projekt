import { Controller, Get, Post, Body, Req, Patch, UseGuards } from '@nestjs/common';
import { DuelService } from './duel.service';
import { CreateDuelDto } from './dto/create-duel';
import { SubmitAnswerDto } from './dto/submit-answer';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionEntity } from '../question/entities/questionEntity.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('duel')
@UseGuards(AuthGuard) //
@ApiTags('Duel')
export class DuelController {
  constructor(private readonly duelService: DuelService) {}
  @Get()
  @ApiOperation({ summary: 'Duel Page' })
  @ApiOkResponse({ description: 'Displays the duel page' })
  duelPage() {
    return 'Duel Page';
  }

  @Post()
  @ApiOperation({ summary: 'Start a new duel' })
  @ApiBody({ type: CreateDuelDto })
  @ApiOkResponse({ description: 'Duel started' })
  @ApiBadRequestResponse({ description: 'Invalid inputs or ongoing duel' })
  async startDuel(@Body() createDuelDto: CreateDuelDto, @Req() request) {
    if (createDuelDto.challengerId == createDuelDto.opponentId) {
      return 'you cant start a duel vs yourself';
    }

    return await this.duelService.createDuel(createDuelDto);
  }

  @Post('question')
  @ApiOperation({ summary: 'Get a new question for the duel' })
  @ApiBody({ type: QuestionEntity })
  @ApiOkResponse({ description: 'Question selected' })
  async getDuelQuestion(@Body() { duelId }) {
    return this.duelService.selectNewQuestion(duelId);
  }

  @Patch('answer')
  @ApiOperation({ summary: 'Submit an answer for a duel question' })
  @ApiBody({ type: SubmitAnswerDto })
  @ApiOkResponse({ description: 'Answer submitted' })
  async questionAnswer(@Body() { SubmitAnswerDto, userId }) {
    return await this.duelService.submitAnswer(
      SubmitAnswerDto.duelId,
      SubmitAnswerDto,
      userId,
    );
  }

  @Patch('update')
  @ApiOperation({ summary: 'Finish the duel' })
  @ApiBody({ type: SubmitAnswerDto })
  @ApiOkResponse({ description: 'Duel finished' })
  //async finishDuel(@Body() { duelId, winnerId }) {
    async finishDuel(@Body() { duelId, duelStatus }) {
    //return await this.duelService.updateDuel(duelId, winnerId);
    return await this.duelService.updateDuel(duelId, duelStatus);
  }

  @Post('score')
  @ApiOperation({ summary: 'Get the score of a duel' })
  @ApiOkResponse({ description: 'Dispaly Duel score' })
  async getScore(@Body() { duelId }) {
    return this.duelService.getDuelScore(duelId);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get the duel of current user' })
  @ApiOkResponse({ description: 'Dispaly Duel' })
  async getDuel(@Req() request) {
    return this.duelService.getDuelByUserId(request.session.user.id);
  }

  @Get('requests')
  @ApiOperation({ summary: 'Get all pending duel requests of current user' })
  @ApiOkResponse({ description: 'Dispaly pending duel requests' })
  async getPendingDuelRequests(@Req() request) {
    return this.duelService.getPendingDuelRequestsByUserId(request.session.user.id);
  }
}
