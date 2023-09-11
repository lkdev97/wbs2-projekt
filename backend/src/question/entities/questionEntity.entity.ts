import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QuestionEntity {
  @ApiProperty({
    description: 'The unique identifier for a question',
    example: '1234567890-question',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The text of the question',
    example: 'What is the capital of France?',
  })
  @Column()
  text: string;

  @ApiProperty({
    description: 'The available options for the question',
    example: ['Berlin', 'Paris', 'London', 'Madrid'],
  })
  @Column('text')
  options: string[];

  @ApiProperty({
    description: 'The correct answer to the question',
    example: 'Paris',
  })
  @Column()
  correctAnswer: string;
}
