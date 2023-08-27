import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { QuestionEntity } from '../question/entities/questionEntity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
