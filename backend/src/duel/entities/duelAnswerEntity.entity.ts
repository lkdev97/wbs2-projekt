import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DuelEntity } from './duelEntity.entity';
import { UserEntity } from '../../user/entities/userEntity.entity';
import { QuestionEntity } from '../../question/entities/questionEntity.entity';

@Entity()
export class DuelAnswerEntity {
  @ApiProperty({ description: 'Duel Answer ID', example: '1234567890' })
  @PrimaryGeneratedColumn('uuid')
  duelAnswerId: string;

  @ManyToOne(() => DuelEntity, (duel) => duel.duelAnswers)
  duel: DuelEntity;

  @ManyToOne(() => QuestionEntity)
  question: QuestionEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @ApiProperty({ description: 'Is the answer correct?', example: true })
  @Column({ type: 'boolean' })
  correct: boolean;
}
