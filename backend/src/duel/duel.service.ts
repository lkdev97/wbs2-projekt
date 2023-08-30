import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDuelDto } from './dto/create-duel';
import { SubmitAnswerDto } from './dto/submit-answer';
import { DuelEntity } from './entities/duelEntity.entity';
import { UserEntity } from 'src/user/entities/userEntity.entity';
import { DuelStatus } from './entities/duelEntity.entity';


@Injectable()
export class DuelService {
  constructor(
    @InjectRepository(DuelEntity)
    private readonly duelRepository: Repository<DuelEntity>,
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

    /*const challenger = await this.userService.getUserById(challengerId);
    const opponent = await this.userService.getUserById(opponentId);
  
    if (!challenger || !opponent) {
      throw new NotFoundException('Challenger or opponent not found in UserEntity.');
    }*/

    const duel = new DuelEntity();
    duel.challenger = { id: challengerId } as UserEntity;
    duel.opponent = { id: opponentId } as UserEntity;
    duel.status = DuelStatus.ONGOING;

    return this.duelRepository.save(duel);
  }

  async getDuel(id: string) {
    const duel = await this.duelRepository.findBy({id});

    if (!duel) {
      throw new NotFoundException(`Duel with ID ${id} not found`);
    }

    return duel;
  }

  async submitAnswer(
    duelId: string,
    submitAnswerDto: SubmitAnswerDto,
  ): Promise<void> {
    //die Antwort eines Spielers zu speichern.und die Richtigkeit der Antwort zu überprüfen.
    // Aktualisiert gegebenenfalls auch den Duel-Status und den Sieger.
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
}
