import { Injectable, NotFoundException } from '@nestjs/common';
import { StatisticsEntity } from './entities/statisticsEntity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(StatisticsEntity)
    private statisticEntity: Repository<StatisticsEntity>,
  ) {}
  async getUserStatisticById(id: string) {
    const statistic = await this.statisticEntity.findOne({
      where: { userId: id },
    });
    if (!statistic) {
      throw new NotFoundException(`Statistic with ID ${id} not found`);
    }
    return statistic;
  }
}
