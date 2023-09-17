import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipEntity } from './entities/friendshipEntity.entity';
import { UserEntity } from '../user/entities/userEntity.entity';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([FriendshipEntity, UserEntity])],
  providers: [FriendshipService, SocketGateway],
  controllers: [FriendshipController],
})
export class FriendshipModule {}
