import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppRequest } from 'src/types/request';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('/dashboard')
  @UseGuards(JwtAuthGuard)
  getDashboardDetails(@Request() request: AppRequest) {
    return this.statsService.findDashboard(parseInt(request.user.id));
  }
}
