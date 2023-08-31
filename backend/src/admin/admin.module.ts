import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from '../question/entities/questionEntity.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/userEntity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, UserEntity])],
  providers: [AdminService, UserService],
  controllers: [AdminController],
})
export class AdminModule {}
