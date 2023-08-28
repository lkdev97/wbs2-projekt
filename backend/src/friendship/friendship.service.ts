import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FriendshipEntity} from "./entities/friendshipEntity.entity";
import {Repository, In} from "typeorm";
import {UserEntity} from "../user/entities/userEntity.entity";

@Injectable()
export class FriendshipService {
    constructor(
        @InjectRepository(FriendshipEntity)
        private friendshipRepository: Repository<FriendshipEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
    }
    async showAllFriendsById(userId: string) {
        //@TODO
        const friendshipEntries = await this.friendshipRepository.find({
            where: { userId },
        });
      
        const friendIds = friendshipEntries.map(
            (friendshipEntry) => friendshipEntry.friendId
        );
        return friendshipEntries;
    }

    async showAllOnlineFriends(userId: string) {
        //@TODO
        const friendshipEntries = await this.friendshipRepository.find({
            where: { userId },
          });
      
          const friendIds = friendshipEntries.map(
            (friendshipEntry) => friendshipEntry.friendId
          );

          const onlineFriends = await this.userRepository.find({
            where: { id: In(friendIds), online: true },
          });
      
          return onlineFriends;
    }

}
