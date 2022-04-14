import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './questions.dto';
import { QuestionsEntity } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private questionRepository: Repository<QuestionsEntity>,
  ) {}

  async create(question: CreateQuestionDto): Promise<QuestionsEntity> {
    const newQuestion: QuestionsEntity =
      this.questionRepository.create(question);

    return await this.questionRepository.save(newQuestion);
  }

  async findOne(questionId: number): Promise<QuestionsEntity> {
    const question: QuestionsEntity = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question;
  }

  async findAll(userId: number): Promise<QuestionsEntity[]> {
    const questions: QuestionsEntity[] = await this.questionRepository.find({
      where: {
        userId: userId,
      },
    });

    return questions;
  }

  async delete(questionId: number, userId: number): Promise<QuestionsEntity> {
    const question: QuestionsEntity = await this.findOne(questionId);

    if (question.userId !== userId) {
      throw new ForbiddenException('You have no access to this question');
    }

    return this.questionRepository.remove(question);
  }
}
