import { FriendStatus } from '../entities/friendshipEntity.entity';

export class CreateFriendshipDto {
  userId: string;
  friendId: string;
  status: FriendStatus = FriendStatus.PENDING;
}
