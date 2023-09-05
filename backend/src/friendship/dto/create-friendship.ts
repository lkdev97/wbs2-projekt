import { ApiProperty } from '@nestjs/swagger';
import { FriendStatus } from '../entities/friendshipEntity.entity';

export class CreateFriendshipDto {
  @ApiProperty({
    description: 'ID of the user sending the friend request',
    example: 'user001',
  })
  userId: string;

  @ApiProperty({
    description: 'ID of the user receiving the friend request',
    example: 'user002',
  })
  friendId: string;

  @ApiProperty({
    description: 'The status of the friendship',
    enum: FriendStatus,
    default: FriendStatus.PENDING,
  })
  status: FriendStatus = FriendStatus.PENDING;
}
