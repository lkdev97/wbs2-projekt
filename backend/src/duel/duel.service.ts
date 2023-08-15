import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDuelDto } from './dto/create-duel';
import { SubmitAnswerDto } from './dto/submit-answer';
import { DuelEntity } from './entities/duelEntity.entity';

@Injectable()
export class DuelService {
  constructor(
    @InjectRepository(DuelEntity)
    private readonly duelRepository: Repository<DuelEntity>,
  ) {}

  async createDuel(createDuelDto: CreateDuelDto): Promise<DuelEntity> {
    // Hier wird ein neues Duel-Objekt erstellt und in der Datenbank gespeichert.
    return null;
  }

  async getDuel(id: string): Promise<DuelEntity> {
    // Hier wird ein Duel-Objekt aus der Datenbank abgerufen.
    return null;
  }

  async submitAnswer(
    duelId: string,
    submitAnswerDto: SubmitAnswerDto,
  ): Promise<void> {
    //die Antwort eines Spielers zu speichern.und die Richtigkeit der Antwort zu überprüfen.
    // Aktualisiert gegebenenfalls auch den Duel-Status und den Sieger.
  }
}
