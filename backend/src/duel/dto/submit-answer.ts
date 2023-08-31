import { ApiProperty } from '@nestjs/swagger';

export class SubmitAnswerDto {
  @ApiProperty({
    description: 'ID of the duel',
    example: 'duel789',
  })
  readonly duelId: string;

  @ApiProperty({
    description: 'ID of the question being answered',
    example: 'ques567',
  })
  readonly questionId: string;

  @ApiProperty({
    description: 'The answer submitted',
    example: 'Paris',
  })
  readonly answer: string;
}
