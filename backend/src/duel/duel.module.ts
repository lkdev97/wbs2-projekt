import { Module } from '@nestjs/common';
import { DuelService } from './duel.service';
import { DuelController } from './duel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DuelEntity } from './entities/duelEntity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DuelEntity])],
  providers: [DuelService],
  controllers: [DuelController],
})
export class DuelModule {}
