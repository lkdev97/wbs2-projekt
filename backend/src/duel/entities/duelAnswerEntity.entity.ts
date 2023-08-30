import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DuelEntity } from './duelEntity.entity';
import { UserEntity } from 'src/user/entities/userEntity.entity';
import { QuestionEntity } from 'src/question/entities/questionEntity.entity';

@Entity()
export class DuelAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  duelAnswerId: string;

  @ManyToOne(() => DuelEntity, duel => duel.duelAnswers)
  duel: DuelEntity;

  @ManyToOne(() => QuestionEntity)
  question: QuestionEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({ type: 'boolean' })
  correct: boolean;
}
