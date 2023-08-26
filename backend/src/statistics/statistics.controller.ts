import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from "../auth/auth.guard";
import { StatisticsService } from "./statistics.service";

@UseGuards(AuthGuard)
@Controller('statistics')

export class StatisticsController {
    constructor(
        private readonly statisticService: StatisticsService,
        ) {}
    @Get()
    showStatistics(@Req() request) {
        if(request.session.user.id) {
            return this.statisticService.getUserStatisticById(request.session.user.id);
        }
    }
}
