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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('friendship')
@UseGuards(AuthGuard)
@ApiTags('Friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService,
    private readonly websocketGateway: SocketGateway) {}

  @Get()
  @ApiOperation({ summary: 'List all online friends of the current user' })
  @ApiOkResponse({
    description: 'Successfully returned a list of online friends',
  })
  async friendshipPage(@Req() request) {
    return await this.friendshipService.showAllOnlineFriends(
      request.session.user.id,
    );
  }

  @Get('list-friends/:userId')
  @ApiOperation({ summary: 'List all friends of a specific user by their ID' })
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ description: 'Successfully returned a list of all friends' })
  async listFriends(@Param('userId') userId: string) {
    return this.friendshipService.showAllFriendsById(userId);
  }

  @Post('addFriend')
  @ApiOperation({ summary: 'Send a friend request' })
  @ApiBody({ schema: { example: { friendId: '123' } } })
  @ApiOkResponse({ description: 'Successfully sent a friend request' })
  async addFriend(@Body() { friendId }: { friendId: string }, @Req() request) {
    const userId = request.session.user.id;
    this.websocketGateway.server.emit('friendRequestSent');
    return await this.friendshipService.addFriendRequest(userId, friendId);
  }

  //@Update()
  @Patch('update')
  @ApiOperation({ summary: 'Update the friendship status' })
  @ApiBody({ schema: { example: { userId: '123', friendStatus: 'accepted' } } })
  @ApiOkResponse({ description: 'Successfully updated the friendship status' })
  async updateFriendStatus(@Body() { userId, friendStatus }, @Req() request) {
    const friendId = request.session.user.id;
    this.websocketGateway.server.emit('friendshipStatusUpdated');
    return this.friendshipService.updateFriendStatus(
      userId,
      friendId,
      friendStatus,
    );
  }

  @Get('requests')
  @ApiOperation({ summary: 'Return pending friend request from current user' })
  @ApiOkResponse({ description: 'Successfully returned all pending friend requests' })
  async getFriendRequests(@Req() request) {
    const friendId = request.session.user.id;
    return this.friendshipService.getAllPendingFriendRequestsByFriendId(friendId);
  }
}
