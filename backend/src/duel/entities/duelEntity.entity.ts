import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity';
import { DuelAnswerEntity } from './duelAnswerEntity.entity';

export enum DuelStatus {
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
  PENDING = 'PENDING'
}

@Entity()
export class DuelEntity {
  @ApiProperty({ description: 'Duel ID', example: '1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Challenger ID' })
  @ManyToOne(() => UserEntity)
  challenger: UserEntity;

  @ApiProperty({ description: 'Opponent ID' })
  @ManyToOne(() => UserEntity)
  opponent: UserEntity;

  @ApiProperty({
    description: 'Status of the duel',
    example: DuelStatus.PENDING,
  })
  @Column({
    type: 'text',
    enum: DuelStatus,
    default: DuelStatus.PENDING,
  })
  status: DuelStatus;

  @ApiProperty({
    description: 'Winner ID',
    example: '1234567890',
    required: false,
  })
  @Column({ nullable: true })
  winnerId: string;

  @ApiProperty({ description: 'List of answers in this duel' })
  @OneToMany(() => DuelAnswerEntity, (duelAnswer) => duelAnswer.duel)
  duelAnswers: DuelAnswerEntity[];

  @ApiProperty({
    description: 'List of answered questions',
    example: ['questionId1', 'questionId2'],
  })
  @Column('simple-array')
  answeredQuestions: string[];
}
