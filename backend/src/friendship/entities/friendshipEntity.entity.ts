import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/userEntity.entity'

export enum FriendStatus {

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
}


