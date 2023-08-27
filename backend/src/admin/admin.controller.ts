import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateQuestionDto } from './dto/create-question';
import { QuestionEntity } from '../question/entities/questionEntity.entity';
import { UpdateQuestionDto } from './dto/update-question';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/questions')
  async createQuestion(
    @Body() dto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.adminService.createQuestion(dto);
  }

  @Get('/questions')
  async getAllQuestions(): Promise<QuestionEntity[]> {
    return this.adminService.getAllQuestions();
  }

  @Delete('/questions/:id')
  async deleteQuestion(@Param('id') id: string): Promise<void> {
    return this.adminService.deleteQuestion(id);
  }

  @Put('/questions/:id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.adminService.updateQuestion(id, dto);
  }
}
