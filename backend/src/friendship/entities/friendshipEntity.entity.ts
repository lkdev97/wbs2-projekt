import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity';

export enum FriendshipStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

@Entity()
export class FriendshipEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.userFriend)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.friend)
  @JoinColumn({ name: 'friendId' })
  friend: UserEntity;

  @Column({
    type: 'text',
    enum: FriendshipStatus,
    default: FriendshipStatus.PENDING,
  })
  status: FriendshipStatus;
}
