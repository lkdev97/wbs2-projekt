import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FriendshipEntity} from "./entities/friendshipEntity.entity";
import {Repository} from "typeorm";
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
    async showAllFriendsById(id: string) {
        //@TODO

        return null;
    }

    async showAllOnlineFriends(id: string) {
        //@TODO
        const friendships = await this.friendshipRepository.find({where: { friendId: id },});
        const userIds = friendships.map(friendship => friendship.userId);
        //const onlineFriends = null;
        return null;
    }

}
