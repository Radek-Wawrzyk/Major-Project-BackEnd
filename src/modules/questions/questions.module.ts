import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsModule } from '../stats/stats.module';
import { QuestionsController } from './questions.controller';
import { QuestionsEntity } from './questions.entity';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsEntity]), StatsModule],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
