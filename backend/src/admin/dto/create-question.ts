import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The text of the question',
    example: 'What is the capital of France?',
  })
  readonly text: string;

  @ApiProperty({
    description: 'The options for the question',
    example: ['Berlin', 'Madrid', 'Paris', 'Rome'],
  })
  readonly options: [string, string, string, string];

  @ApiProperty({
    description: 'The correct answer to the question',
    example: 'Paris',
  })
  readonly correctAnswer: string;
}
