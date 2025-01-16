import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity';

export enum FriendStatus {
  PENDING = 'PENDING',
  BLOCKED = 'BLOCKED',
  ACCEPTED = 'ACCEPTED',
}

@Entity()
export class FriendshipEntity {
  @ApiProperty({
    description: 'Friend ID',
    example: '1234567890-friend',
  })
  @PrimaryColumn('uuid')
  friendId: string;

  @ApiProperty({
    description: 'User ID',
    example: '1234567890-user',
  })
  @PrimaryColumn('uuid')
  userId: string;

  @ApiProperty({
    description: 'User associated with the friendship',
  })
  @ManyToOne(() => UserEntity, (user) => user.friendships)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ApiProperty({
    description: 'Friend associated with the friendship',
  })
  @ManyToOne(() => UserEntity, (user) => user.friendships)
  @JoinColumn({ name: 'friendId' })
  friend: UserEntity;

  @ApiProperty({
    description: 'Status of the friendship',
    example: FriendStatus.PENDING,
  })
  @Column({
    type: 'text',
    enum: FriendStatus,
    default: FriendStatus.PENDING,
  })
  friendStatus: FriendStatus;
}
