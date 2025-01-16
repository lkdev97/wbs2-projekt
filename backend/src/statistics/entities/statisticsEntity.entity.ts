import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity';

@Entity()
export class StatisticsEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The unique identifier for a user',
    example: '1234567890-user',
  })
  @ManyToOne(() => UserEntity, user => user.statistics)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty({
    description: 'The unique identifier for a opponent',
    example: '1234567890-user',
  })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'opponentId' })
  opponent: UserEntity;

  @ApiProperty({
    description: 'The number of games for the user against this opponent',
    example: 5,
  })
  @Column() 
  totalGamesAgainstOpponent: number;

  @ApiProperty({
    description: 'The number of wins for the user against this opponent',
    example: 5,
  })
  @Column() 
  winsAgainstOpponent: number;
}
