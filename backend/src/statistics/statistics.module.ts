import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import {StatisticsEntity} from "./entities/statisticsEntity.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StatisticsEntity])],
  providers: [StatisticsService],
  controllers: [StatisticsController]
})
export class StatisticsModule {}
