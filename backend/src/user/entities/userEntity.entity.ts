import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StatisticsEntity } from '../../statistics/entities/statisticsEntity.entity';
import { FriendshipEntity } from '../../friendship/entities/friendshipEntity.entity';
import { AdminEntity } from '../../admin/entities/adminEntity.entity';
import { DuelEntity } from '../../duel/entities/duelEntity.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class UserEntity {
  @ApiProperty({ description: 'User ID', example: '1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Username', example: 'JohnDoe' })
  @Column()
  username: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Is user online', example: false })
  @Column({ default: false })
  online: boolean;

  @ApiProperty({ description: 'Role of the user', example: UserRole.USER })
  @Column({
    type: 'text',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ description: 'List of friendships' })
  @OneToMany(() => FriendshipEntity, (friendship) => friendship.user)
  friendships: FriendshipEntity[];

  @ApiProperty({ description: 'List of statistics' })
  @OneToMany(() => StatisticsEntity, (statistics) => statistics.user)
  statistics: StatisticsEntity[];

  @ApiProperty({ description: 'List of duels where user is challenger' })
  @OneToMany(() => DuelEntity, duel => duel.challenger)
  duelsAsChallenger: DuelEntity[];

  @ApiProperty({ description: 'List of duels where user is opponent' })
  @OneToMany(() => DuelEntity, duel => duel.opponent)
  duelsAsOpponent: DuelEntity[];


  @ApiProperty({ description: 'List of admin roles if user is an admin' })
  @OneToMany(() => AdminEntity, (admin) => admin.user)
  admin: AdminEntity[];
}
