import { Injectable, NotFoundException, ConflictException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { CreateDuelDto } from './dto/create-duel';
import { SubmitAnswerDto } from './dto/submit-answer';
import { DuelEntity } from './entities/duelEntity.entity';
import { UserEntity } from 'src/user/entities/userEntity.entity';
import { DuelStatus } from './entities/duelEntity.entity';
import { DuelAnswerEntity } from './entities/duelAnswerEntity.entity';
import { QuestionEntity } from 'src/question/entities/questionEntity.entity';
import { StatisticsEntity } from 'src/statistics/entities/statisticsEntity.entity';

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
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StatisticsEntity)
    private readonly statisticRepository: Repository<StatisticsEntity>,
  ) {}

  async hasOngoingDuel(userId: string) {
    const ongoingDuel = await this.duelRepository.findOne({
      where: [
        { challenger: { id: userId }, status: DuelStatus.ONGOING },
        { opponent: { id: userId }, status: DuelStatus.ONGOING },
      ],
      relations: ['challenger', 'opponent'],
    });

    if (!!ongoingDuel) {
      throw new ConflictException(`User: ${userId} has an ONGOING Duel`);
    }
    //return !!ongoingDuel;
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
    duel.status = DuelStatus.PENDING;
    duel.answeredQuestions = [];

    return this.duelRepository.save(duel);
  }

  async getDuel(id: string) {
    const duel = await this.duelRepository.findBy({ id });

    if (!duel) {
      throw new NotFoundException(`Duel with ID ${id} not found`);
    }

    return duel;
  }

  async checkAnswer(id: string, answer: string) {
    const question = this.questionRepository.findOne({ where: { id } });

    if (answer === (await question).correctAnswer) {
      return true;
    }
    return false;
  }

  /**
   * @param duelId 
   * @returns The user who won the Duel. 
   * @returns duel.opponent => opponent is the winner
   * @returns duel.challenger => challenger is the winner
   * @returns null => duel ends in an draw
   * 
   * Can be also changed to just the userId: duel.opponent; => duel.opponent.id;
   * 
   */
  async getWinnerByDuelId(duelId: string) {
    const duel = await this.duelRepository.findOne({
      where: { id: duelId },
      relations: ['challenger', 'opponent', 'duelAnswers'],
    });

    if (!duel) {
      throw new NotFoundException(`Duel with ID ${duelId} not found`);
    }

    const challengerId = duel.challenger.id;
    const opponentId = duel.opponent.id;

    const challengerCount = await this.duelAnswerRepository.count({
      where: {
        duel: { id: duelId },
        user: { id: challengerId },
        correct: true,
      },
    });
  
    const opponentCount = await this.duelAnswerRepository.count({
      where: {
        duel: { id: duelId },
        user: { id: opponentId },
        correct: true,
      },
    });

    if (challengerCount > opponentCount) {
      return duel.challenger; // challenger is winner
    } else if (opponentCount > challengerCount) {
      return duel.opponent; // opponent is winner
    } else {
      return null; // draw
    }
  }

  /**
   * Returns the Score from an Duel as object 'score' with the challengerScore and opponentScore.
   * 
   * @param duelId 
   * @returns score Object with score.challengerScore and score.opponentScore
   */
  async getDuelScore(duelId: string) {
    if(!duelId) {
      throw new ConflictException(`duelId is undefined - Submit a valid duelId`);
    }
    const duel = await this.duelRepository.findOne({
      where: { id: duelId },
      relations: ['challenger', 'opponent', 'duelAnswers', 'duelAnswers.user'],
    });

    if (!duel) {
      throw new NotFoundException(`Duel with ID ${duelId} not found`);
    }

    const challengerId = duel.challenger?.id;
    const opponentId = duel.opponent?.id;

    if (!challengerId || !opponentId) {
      throw new NotFoundException(
        `Challenger or opponent not found in Duel with ID ${duelId}`
      );
    }

    const challengerCount = await this.duelAnswerRepository.count({
      where: {
        duel: { id: duelId },
        user: { id: challengerId },
        correct: true,
      },
    });

    const opponentCount = await this.duelAnswerRepository.count({
      where: {
        duel: { id: duelId },
        user: { id: opponentId },
        correct: true,
      },
    });

    const score = {
      challengerScore: challengerCount,
      opponentScore: opponentCount,
    };

    return score;
  }

  //wieso sollte ich mir hier die duelId übergeben lassen wenn im Dto die duelid steht?
  async submitAnswer(
    duelId: string,
    submitAnswerDto: SubmitAnswerDto,
    userId: string,
  ): Promise<void> {
    const duel = await this.duelRepository.findOne({
      where: { id: duelId },
      relations: ['challenger', 'opponent'],
    });
    if (duel.challenger.id !== userId && duel.opponent.id !== userId) {
      throw new UnauthorizedException(`User with userId ${userId} is not a participant in the duel with duelId ${duelId}`,);
    }
    const question = await this.questionRepository.findOne({
      where: { id: submitAnswerDto.questionId },
    });
    const correct = await this.checkAnswer(
      submitAnswerDto.questionId,
      submitAnswerDto.answer,
    );
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const existingDuelAnswer = await this.duelAnswerRepository.findOne({
      where: {
        duel: { id: duel.id },
        user: { id: user.id },
        question: { id: question.id },
      },
      relations: ['duel', 'user', 'question'],
    });

    if (existingDuelAnswer) {
      throw new ConflictException(`User: ${user.id} has already answered Question: ${question.id} in Duel: ${duel.id}`);
    }
  
    const duelAnswer = this.duelAnswerRepository.create(); //@TODO: Create DTO for this
    duelAnswer.correct = correct;
    duelAnswer.question = question;
    duelAnswer.user = user;
    duelAnswer.duel = duel;

    await this.duelAnswerRepository.save(duelAnswer);
  }

  async updateStatistic(userId: string, opponentId: string, winnerId: string) {
    let statistic = await this.statisticRepository.findOne({
      where: {
        user: { id: userId },
        opponent: { id: opponentId },
      },
      relations: ['user', 'opponent'],
    });
    if(!statistic) {
      statistic = new StatisticsEntity();
      statistic.user = await this.userRepository.findOne({ where: { id: userId } });
      statistic.opponent = await this.userRepository.findOne({ where: { id: opponentId } });
      statistic.winsAgainstOpponent = 0;
      statistic.totalGamesAgainstOpponent = 1;
    } else {
      statistic.totalGamesAgainstOpponent++;
    }
    if(winnerId === statistic.user.id) {
      statistic.winsAgainstOpponent++;
    }
    await this.statisticRepository.save(statistic);
  }

  //async updateDuel(id: string, winnerId: string) {
    async updateDuel(id: string, newStatus: DuelStatus) {
    const duel = await this.duelRepository.findOne({ where: { id: id }, relations: ['challenger', 'opponent'] });
    if (!duel) {
      throw new NotFoundException(`Duel with ID ${id} not found`);
    }

    if(duel.status == DuelStatus.FINISHED) {
      throw new ConflictException(`Duel with ID ${id} is already finished`);
    }

    if(newStatus == DuelStatus.FINISHED) {
      const winner = await this.getWinnerByDuelId(duel.id); //@TODO: Test

      //await this.updateStatistic(duel.challenger.id, duel.opponent.id, winnerId); 
      //await this.updateStatistic(duel.opponent.id, duel.challenger.id, winnerId);
      if(winner != null) {
        await this.updateStatistic(duel.challenger.id, duel.opponent.id, winner.id); 
        await this.updateStatistic(duel.opponent.id, duel.challenger.id, winner.id); 
        duel.winnerId = winner.id;
      } else { // DRAW
        await this.updateStatistic(duel.challenger.id, duel.opponent.id, null); 
        await this.updateStatistic(duel.opponent.id, duel.challenger.id, null); 
        duel.winnerId = null;
      }

      duel.status = DuelStatus.FINISHED;
    } else if(newStatus == DuelStatus.ONGOING) {
      await this.hasOngoingDuel(duel.challenger.id)
      await this.hasOngoingDuel(duel.opponent.id)

      duel.status = DuelStatus.ONGOING;
    }
    await this.duelRepository.save(duel);
    return duel;
  }

  async selectNewQuestion(duelId: string): Promise<QuestionEntity> {
    const duel = await this.duelRepository.findOne({ where: { id: duelId } });
    const answeredQuestionIds = duel.answeredQuestions;

    if(duel.status == DuelStatus.PENDING) {
      throw new ConflictException(`Duel with ${duelId} has not started yet!`);
    }

    const unansweredQuestions = await this.questionRepository.find({
      where: {
        id: Not(In(answeredQuestionIds)),
      },
    });

    if (unansweredQuestions.length == 0) {
      throw new NotFoundException(
        `No unanswered Question found for Duel: ${duelId}`,
      );
    }
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    const newQuestion = unansweredQuestions[randomIndex];

    duel.answeredQuestions.push(newQuestion.id);
    await this.duelRepository.save(duel);
    return newQuestion;
  }

  async getDuelByUserId(userId: string) {
    const duel = await this.duelRepository.findOne({
      where: [
        { challenger: { id: userId }, status: DuelStatus.ONGOING },
        { opponent: { id: userId }, status: DuelStatus.ONGOING },
      ],
      relations: ['challenger', 'opponent'],
    });

    if (!duel) {
      throw new NotFoundException(`No ONGOING duel for the user with ID: ${userId} found.`);
    }

    return duel;
  }

  async getPendingDuelRequestsByUserId(userId: string) {
    const duels = await this.duelRepository.find({
      where: [
        { opponent: { id: userId }, status: DuelStatus.PENDING },
      ],
      relations: ['challenger', 'opponent'],
    });
    return duels;
  }
}
