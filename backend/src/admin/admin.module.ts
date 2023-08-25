import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionEntity } from "../question/entities/questionEntity.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
