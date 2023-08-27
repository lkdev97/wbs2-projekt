import { Controller, Post, Get, Param, Patch } from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('send-request/:requesteeId/:requesterId')
  sendFriendRequest(
    @Param('requesteeId') requesteeId: string,
    @Param('requesterId') requesterId: string,
  ) {
    return this.friendshipService.sendFriendRequest(requesteeId, requesterId);
  }

  /* @Post('send-request/:requesteeId')
  sendFriendRequest(
    @Param('requesteeId') requesteeId: string,
    @Param('requesterId') requesterId: string,
  ) {
    return this.friendshipService.create();
  }

  @Patch('accept-request/:id')
  validateFriendRequest(@Param('id') id: string) {
    return this.friendshipService.acceptFriendRequest(id);
  }

  @Patch('decline-request/:id')
  declineFriendRequest(@Param('id') id: string) {
    return this.friendshipService.declineFriendRequest(id);
  }

  @Get('list-friends/:userId')
  listFriends(@Param('userId') userId: string) {
    return this.friendshipService.listFriends(userId);
  }*/
}
