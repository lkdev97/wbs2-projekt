import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StatisticsEntity } from '../../statistics/entities/statisticsEntity.entity';
import { FriendshipEntity } from '../../friendship/entities/friendshipEntity.entity';
import { DuelEntity } from '../../duel/entities/duelEntity.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  online: boolean;

  @Column({
    type: 'text',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.user)
  userFriend: FriendshipEntity[];

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.friend)
  friend: FriendshipEntity[];

  @OneToMany(() => StatisticsEntity, (statistics) => statistics.user)
  statistics: StatisticsEntity[];

  @OneToMany(() => DuelEntity, (duel) => duel.id)
  duelsAsPlayer1: DuelEntity[];
}
