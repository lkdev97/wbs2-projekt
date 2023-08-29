import { Controller, Get, UseGuards, Req, Body, Post, Patch} from '@nestjs/common';
import { AuthGuard } from "../auth/auth.guard";
import { FriendshipService } from "./friendship.service";
import { FriendStatus } from './entities/friendshipEntity.entity';

@Controller('friendship')
@UseGuards(AuthGuard)
export class FriendshipController {
    constructor(
        private readonly friendshipService: FriendshipService,
    ) {}
    
    @Get()
    async friendshipPage(@Req() request) {
        return await this.friendshipService.showAllOnlineFriends(request.session.user.id);
    }

    @Post('addFriend')
    async addFriend(@Body() { friendId }: { friendId: string }, @Req() request) {
        const userId = request.session.user.id;
        return await this.friendshipService.addFriendRequest(userId, friendId);
    }

    //@Update()
    @Patch('update')
    async updateFriendStatus(@Body() { userId, friendStatus }, @Req() request) {
        const frinedId = request.session.user.id;
        return this.friendshipService.updateFriendStatus(userId, frinedId, friendStatus);
    }
}
