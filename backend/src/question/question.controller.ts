import { Controller, Get, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('question')
@ApiTags('question')
export class QuestionController {

    constructor(private readonly questionSerive: QuestionService) {}
    @Get(':id')
    getQuestionById(@Param('id') id: string) {
        return this.questionSerive.getQuestionById(id);
    }
}
