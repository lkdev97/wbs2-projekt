import { Module } from '@nestjs/common';
import { DuelService } from './duel.service';
import { DuelController } from './duel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuelEntity } from './entities/duelEntity.entity';
import { UserEntity } from 'src/user/entities/userEntity.entity';
import { QuestionEntity } from 'src/question/entities/questionEntity.entity';
import { DuelAnswerEntity } from './entities/duelAnswerEntity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DuelEntity,
      UserEntity,
      QuestionEntity,
      DuelAnswerEntity,
    ]),
  ],
  providers: [DuelService],
  controllers: [DuelController],
})
export class DuelModule {}
