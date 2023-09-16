import { Controller, Get, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiTags,    
    ApiOperation,
    ApiOkResponse,
    ApiCreatedResponse, } from '@nestjs/swagger';

@Controller('question')
@ApiTags('question')
export class QuestionController {

    constructor(private readonly questionSerive: QuestionService) {}

    @ApiOperation({ summary: 'Get question by ID' })
    @ApiOkResponse({ description: 'Successfully returned the question' })
    @Get(':id')
    getQuestionById(@Param('id') id: string) {
        return this.questionSerive.getQuestionById(id);
    }
}
