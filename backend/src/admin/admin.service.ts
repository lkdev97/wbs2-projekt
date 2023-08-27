import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question';
import { QuestionEntity } from '../question/entities/questionEntity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {UpdateQuestionDto} from "./dto/update-question";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionsRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(dto: CreateQuestionDto): Promise<QuestionEntity> {
    const question = this.questionsRepository.create(dto);
    return await this.questionsRepository.save(question);
  }

  async updateQuestion(
    id: string,
    dto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    await this.questionsRepository.update(id, dto);
    return this.questionsRepository.findOne({ where: { id: id } });
  }

  async getAllQuestions(): Promise<QuestionEntity[]> {
    return await this.questionsRepository.find();
  }

  async deleteQuestion(id: string): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
