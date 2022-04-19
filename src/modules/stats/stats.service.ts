import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getDateBySubstractionMonths } from 'src/helpers/dates';
import { Repository } from 'typeorm';
import { StatsEntity } from './stats.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(StatsEntity)
    private statsRepository: Repository<StatsEntity>,
  ) {}

  async findAllStats(userId: number): Promise<any> {
    const monthlyNumberOfViews = await this.findNumberOfViewsByMonths(
      userId,
      1,
    );
    const yearlyNumberOfViews = await this.findNumberOfViewsByMonths(
      userId,
      12,
    );
    const percentageOfAppliedQuestions = await this.findPercentage(userId);

    return {
      monthlyNumberOfViews,
      yearlyNumberOfViews,
      percentageOfAppliedQuestions,
    };
  }

  async findPercentage(userId: number): Promise<number> {
    const statsQuestionType: number = await this.statsRepository
      .createQueryBuilder('stats')
      .where('stats.authorId = :id', { id: userId })
      .andWhere('stats.type = :type', {
        type: 'question',
      })
      .getCount();

    const allStatsByUser: number = await this.countAllStats(userId);
    const percentageOfQuestions: number =
      (statsQuestionType / allStatsByUser) * 100;

    return percentageOfQuestions;
  }

  async countAllStats(userId: number): Promise<number> {
    return await this.statsRepository.count({
      where: {
        authorId: userId,
      },
    });
  }

  async findNumberOfViewsByMonths(
    userId: number,
    monthsNumber: number,
  ): Promise<number> {
    return await this.statsRepository
      .createQueryBuilder('stats')
      .where('stats.authorId = :id', { id: userId })
      .andWhere('stats.viewedAt >= :date', {
        date: getDateBySubstractionMonths(monthsNumber),
      })
      .getCount();
  }

  async create(userId: number, offerId: number, type: 'view' | 'question') {
    const offerStats = this.statsRepository.create({
      offerId: offerId,
      authorId: userId,
      type: type,
    });

    return this.statsRepository.save(offerStats);
  }
}
