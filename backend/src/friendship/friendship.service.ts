import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FriendshipEntity,
  FriendStatus,
} from './entities/friendshipEntity.entity';
import { Repository, In } from 'typeorm';
import { UserEntity } from '../user/entities/userEntity.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(FriendshipEntity)
    private friendshipRepository: Repository<FriendshipEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async showAllFriendsById(userId: string) {
    const friendshipEntries = await this.friendshipRepository.find({
      where: { userId, friendStatus: FriendStatus.ACCEPTED },
    });

    const friendIds = friendshipEntries.map(
      (friendshipEntry) => friendshipEntry.friendId,
    );
    return friendshipEntries;
  }

  async showAllOnlineFriends(userId: string) {
    const friendshipEntries = await this.friendshipRepository.find({
      where: { userId, friendStatus: FriendStatus.ACCEPTED }, // add: friendStatus: FriendStatus.ACCEPTED
    });

    const friendIds = friendshipEntries.map(
      (friendshipEntry) => friendshipEntry.friendId,
    );

    const onlineFriends = await this.userRepository.find({
      where: { id: In(friendIds), online: true },
    });

    return onlineFriends;
  }

  // User als Freund adden: userId ist die Id von dem Benutzer, der die Anfrage sendet und friendId von dem User der die Anfrage erhält
  async addFriendRequest(userId: string, friendId: string) {
    if (userId === friendId) {
      return 'You cannot send a friend request to yourself';
    }

    const existingEntry = await this.friendshipRepository.findOne({
      // Check ob es schon einen Eintrag in der Entity gibt mit der FriendId, UserId
      where: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId },
      ],
    });

    if (existingEntry) {
      return 'Friend request already sent.';
    }
    const newFriendship = this.friendshipRepository.create({
      friendId: friendId,
      userId: userId,
    });
    await this.friendshipRepository.save(newFriendship);
  }

  // Sobald der Benutzer, der die Anfrage erhalten hat die Anfrage bestätigt wird der Status geupdatet
  async updateFriendStatus(
    userId: string,
    friendId: string,
    newStatus: FriendStatus,
  ) {
    const friendship = await this.friendshipRepository.findOne({
      where: { friendId: friendId, userId: userId },
    });

    if (friendship) {
      friendship.friendStatus = newStatus;
      await this.friendshipRepository.save(friendship);
    }
  }

  async getAllPendingFriendRequestsByFriendId(friendId: string) {
    return this.friendshipRepository.find({
      where: {
        friendId: friendId,
        friendStatus: FriendStatus.PENDING,
      },
    });
  }
}
