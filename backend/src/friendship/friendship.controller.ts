import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from "../auth/auth.guard";
import { FriendshipService } from "./friendship.service";

@Controller('friendship')
@UseGuards(AuthGuard)
export class FriendshipController {
    constructor(
        private readonly friendshipService: FriendshipService,
    ) {}
    @Get()
    friendshipPage(@Req() request) {
        return this.friendshipService.showAllFriendsById(request.session.user.id);
    }
}
