import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiProperty({
    description: 'The updated text of the question',
    example: 'What is the capital of Germany?',
    required: false,
  })
  readonly text?: string;

  @ApiProperty({
    description: 'The updated options for the question',
    example: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    required: false,
  })
  readonly options?: [string, string, string, string];

  @ApiProperty({
    description: 'The updated correct answer to the question',
    example: 'Berlin',
    required: false,
  })
  readonly correctAnswer?: string;
}
