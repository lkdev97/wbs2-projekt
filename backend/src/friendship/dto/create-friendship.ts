import { FriendshipStatus } from '../entities/friendshipEntity.entity';

export class CreateFriendshipDto {
  userId: string;
  friendId: string;
  status: FriendshipStatus = FriendshipStatus.PENDING;
}
