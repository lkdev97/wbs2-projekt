import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question';
import { UpdateQuestionDto } from './dto/update-question';
// Sie müssen ein entsprechendes ORM-Modell für die Question-Entität hinzufügen.
// import { Question } from './entities/question.entity';
import { QuestionEntity } from "../question/entities/questionEntity.entity";
import { InjectRepository } from "@nestjs/typeorm";
import  { Repository } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
      @InjectRepository(QuestionEntity)
      private questionRepository: Repository<QuestionEntity>,
  ) {
  }
  // Hier sollten Sie Dependency Injection für die Datenbank verwenden.

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    //const existingQuestion = await this.findById(createQuestionDto.id);
    return await this.questionRepository.save(this.questionRepository.create(createQuestionDto));
  }
  updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
    // Logik zum Aktualisieren einer Frage.
  }

  async deleteQuestion(id: string) {
    const result = await this.questionRepository.delete(id);
    if(result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }
  async getAllQuestions() {
    return await this.questionRepository.find();
  }
}
