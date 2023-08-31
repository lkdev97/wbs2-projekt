import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { CreateDuelDto } from './dto/create-duel';
import { SubmitAnswerDto } from './dto/submit-answer';
import { DuelEntity } from './entities/duelEntity.entity';
import { UserEntity } from 'src/user/entities/userEntity.entity';
import { DuelStatus } from './entities/duelEntity.entity';
import { DuelAnswerEntity } from './entities/duelAnswerEntity.entity';
import { QuestionEntity } from 'src/question/entities/questionEntity.entity';



@Injectable()
export class DuelService {
  constructor(
    @InjectRepository(DuelEntity)
    private readonly duelRepository: Repository<DuelEntity>,
    @InjectRepository(DuelAnswerEntity)
    private readonly duelAnswerRepository: Repository<DuelAnswerEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async hasOngoingDuel(userId: string): Promise<boolean> {
    const ongoingDuel = await this.duelRepository.findOne({
      where: [
        { challenger: { id: userId }, status: DuelStatus.ONGOING },
        { opponent: { id: userId }, status: DuelStatus.ONGOING },
      ],
    });

    return !!ongoingDuel;
  }
  
  async createDuel(createDuelDto: CreateDuelDto): Promise<DuelEntity> {
    const { challengerId, opponentId } = createDuelDto;

    //@TODO: Check ob die Validierung im Frontend oder Backend gemacht wird
    /*const challenger = await this.userService.getUserById(challengerId);
    const opponent = await this.userService.getUserById(opponentId);
  
    if (!challenger || !opponent) {
      throw new NotFoundException('Challenger or opponent not found in UserEntity.');
    }*/

    const duel = new DuelEntity();
    duel.challenger = { id: challengerId } as UserEntity;
    duel.opponent = { id: opponentId } as UserEntity;
    duel.status = DuelStatus.ONGOING;
    duel.answeredQuestions = [];

    return this.duelRepository.save(duel);
  }

  async getDuel(id: string) {
    const duel = await this.duelRepository.findBy({id});

    if (!duel) {
      throw new NotFoundException(`Duel with ID ${id} not found`);
    }

    return duel;
  }

  async checkAnswer(id: string, answer: string) {
    const question = this.questionRepository.findOne({where: {id}});

    if(answer === (await question).correctAnswer) {
      return true;
    }
    return false;
  }

  //wieso sollte ich mir hier die duelId übergeben lassen wenn im Dto die duelid steht?
  async submitAnswer(duelId: string, submitAnswerDto: SubmitAnswerDto, userId: string): Promise<void> { 
    const duel = await this.duelRepository.findOne({ where: { id: duelId } });
    const question = await this.questionRepository.findOne({where: {id: submitAnswerDto.questionId}});
    const correct = await this.checkAnswer(submitAnswerDto.questionId, submitAnswerDto.answer);
    const user = await this.userEntity.findOne({ where: { id: userId } });

    const duelAnswer = this.duelAnswerRepository.create(); //@TODO: Create DTO for this 
    duelAnswer.correct = correct;
    duelAnswer.question = question;
    duelAnswer.user = user;
    duelAnswer.duel = duel;

    await this.duelAnswerRepository.save(duelAnswer);
  }

  async updateDuel(id: string, winnerId: string) {
    const duel = await this.duelRepository.findOne({ where: { id: id } });
    if (!duel) {
      throw new NotFoundException(`Duel with ID ${id} not found`);
    }
    duel.winnerId = winnerId;
    duel.status = DuelStatus.FINISHED;
    await this.duelRepository.save(duel);
    return duel;
  }

  async selectNewQuestion(duelId: string): Promise<QuestionEntity> {
    const duel = await this.duelRepository.findOne({ where: { id: duelId } });
    const answeredQuestionIds = duel.answeredQuestions;

    const unansweredQuestions = await this.questionRepository.find({
      where: {
        id: Not(In(answeredQuestionIds)), 
      },
    });

    if(unansweredQuestions.length == 0) {
      throw new NotFoundException(`No unanswered Question found for Duel: ${duelId}`);
    }
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    const newQuestion = unansweredQuestions[randomIndex];

    duel.answeredQuestions.push(newQuestion.id);
    await this.duelRepository.save(duel);
    return newQuestion
  }
}
