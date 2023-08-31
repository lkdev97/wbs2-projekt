import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { FriendshipService } from './friendship.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('friendship')
@UseGuards(AuthGuard)
@ApiTags('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Get()
  async friendshipPage(@Req() request) {
    return await this.friendshipService.showAllOnlineFriends(
      request.session.user.id,
    );
  }

  @Get('list-friends/:userId')
  async listFriends(@Param('userId') userId: string) {
    return this.friendshipService.showAllFriendsById(userId);
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
    return this.friendshipService.updateFriendStatus(
      userId,
      frinedId,
      friendStatus,
    );
  }
}
