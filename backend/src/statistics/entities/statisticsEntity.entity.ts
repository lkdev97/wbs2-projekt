import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity';

@Entity()
export class StatisticsEntity {
  @ApiProperty({
    description: 'The unique identifier for a user',
    example: '1234567890-user',
  })
  @PrimaryColumn('uuid')
  userId: string;

  @ApiProperty({
    description: 'The number of wins for the user',
    example: 5,
  })
  @Column()
  wins: number;

  @ApiProperty({
    description: 'The total number of games played by the user',
    example: 20,
  })
  @Column()
  totalGames: number;

  @ManyToOne(() => UserEntity, (user) => user.statistics)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
