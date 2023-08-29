import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity'

export enum FriendStatus {
<<<<<<< HEAD
    PENDING = 'PENDING',
    BLOCKED = 'BLOCKED',
    ACCEPTED = 'ACCEPTED',
=======

>>>>>>> 77be42071220043b2b88e44f46803efbe448175e
}

@Entity()
export class FriendshipEntity {
    @PrimaryColumn('uuid')
    friendId: string;
  
    @PrimaryColumn('uuid')
    userId: string;
  
    @ManyToOne(() => UserEntity, user => user.friendships)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
  
    @ManyToOne(() => UserEntity, user => user.friendships)
    @JoinColumn({ name: 'friendId' })
    friend: UserEntity;
<<<<<<< HEAD

    @Column({
        type: 'text',
        enum: FriendStatus,
        default: FriendStatus.PENDING,
    })
    friendStatus: FriendStatus;
=======
>>>>>>> 77be42071220043b2b88e44f46803efbe448175e
}


