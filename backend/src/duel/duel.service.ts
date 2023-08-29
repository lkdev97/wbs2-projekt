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

  async createDuel(createDuelDto: CreateDuelDto): Promise<DuelEntity> {
    const { challengerId, opponentId } = createDuelDto;

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
}
