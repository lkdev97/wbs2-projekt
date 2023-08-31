import { ApiProperty } from '@nestjs/swagger';

export class CreateDuelDto {
  @ApiProperty({
    description: 'ID of the user initiating the duel',
    example: 'abc123',
  })
  readonly challengerId: string;

  @ApiProperty({
    description: 'ID of the user being challenged',
    example: 'def456',
  })
  readonly opponentId: string;
}
