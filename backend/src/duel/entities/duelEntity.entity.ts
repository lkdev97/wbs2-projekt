import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from 'src/user/entities/userEntity.entity';
import { DuelAnswerEntity } from './duelAnswerEntity.entity';

export enum DuelStatus {
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}

@Entity()
export class DuelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  challenger: UserEntity;

  @ManyToOne(() => UserEntity)
  opponent: UserEntity;

  @Column({
    type: 'text',
    enum: DuelStatus,
    default: DuelStatus.ONGOING,
  })
  status: DuelStatus;

  @Column({ nullable: true })
  winnerId: string;

  @OneToMany(() => DuelAnswerEntity, duelAnswer => duelAnswer.duel)
  duelAnswers: DuelAnswerEntity[];
  
  @Column(({ type: 'text', array: true }))
  answeredQuestions: string[];

}
