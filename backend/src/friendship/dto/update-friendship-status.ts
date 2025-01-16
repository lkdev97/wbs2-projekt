import { ApiProperty } from '@nestjs/swagger';
import { FriendStatus } from '../entities/friendshipEntity.entity';

export class UpdateFriendshipStatusDto {
  @ApiProperty({
    description: 'The updated status of the friendship',
    enum: FriendStatus,
  })
  status: FriendStatus;
}
