import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FriendshipEntity} from "./entities/friendshipEntity.entity";
import {Repository} from "typeorm";

@Injectable()
export class FriendshipService {
    constructor(
        @InjectRepository(FriendshipEntity)
        private friendshipRepository: Repository<FriendshipEntity>,
    ) {
    }
    async showAllFriendsById(id: string) {
        //@TODO

        return null;
    }
}
