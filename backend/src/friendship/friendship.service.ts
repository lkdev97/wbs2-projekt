import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FriendshipEntity,
  FriendshipStatus,
} from './entities/friendshipEntity.entity';
import { UpdateFriendshipStatusDto } from './dto/update-friendship-status';
import { CreateFriendshipDto } from './dto/create-friendship';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(FriendshipEntity)
    private readonly friendshipRepository: Repository<FriendshipEntity>,
  ) {}

  async create(
    createFriendshipDto: CreateFriendshipDto,
  ): Promise<FriendshipEntity> {
    const friendship = this.friendshipRepository.create(createFriendshipDto);
    return this.friendshipRepository.save(friendship);
  }

  async updateStatus(
    id: string,
    updateFriendshipStatusDto: UpdateFriendshipStatusDto,
  ): Promise<FriendshipEntity> {
    await this.friendshipRepository.update(id, updateFriendshipStatusDto);
    return this.friendshipRepository.findOne({ where: { id: id } });
  }

  sendFriendRequest(requesteeId: string, requesterId: string) {
    return this.create({
      userId: requesteeId,
      friendId: requesterId,
      status: FriendshipStatus.PENDING,
    });
  }
}
