import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { StatisticsService } from './statistics.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('statistics')
@ApiTags('Statistics')
export class StatisticsController {
  constructor(private readonly statisticService: StatisticsService) {}

  @Get()
  @ApiOperation({ summary: 'Show statistics for the current user' })
  @ApiOkResponse({ description: 'Successfully returned user statistics' })
  showStatistics(@Req() request) {
    if (request.session.user.id) {
      return this.statisticService.getUserStatisticById(
        request.session.user.id,
      );
    }
  }
}
