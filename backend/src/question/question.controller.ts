import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('question')
@ApiTags('question')
export class QuestionController {}
