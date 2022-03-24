import { Module } from '@nestjs/common';
import { QuestionsEntity } from './questions.entity';

@Module({
  imports: [QuestionsEntity],
})
export class QuestionsModule {}
