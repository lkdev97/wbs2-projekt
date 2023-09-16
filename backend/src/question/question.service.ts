import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from './entities/questionEntity.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionEntity)
        private questionRepository: Repository<QuestionEntity>,
      ) {}

    getQuestionById(id: string) {
        return this.questionRepository.findOne({where: {id}});
    }
}
