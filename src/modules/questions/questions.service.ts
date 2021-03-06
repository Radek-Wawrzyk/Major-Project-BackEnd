import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './questions.dto';
import { QuestionsEntity } from './questions.entity';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { EMAIL_CONFIG, QUESTIONS_HTTP_RESPONSES } from './questions.enum';
import { renderQuestionEmailTemplate } from 'src/helpers/mailing-messages';
import { StatsService } from '../stats/stats.service';
import { PaginationResponse } from 'src/types/response';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private questionRepository: Repository<QuestionsEntity>,
    private readonly sendGrid: SendGridService,
    private readonly statsService: StatsService,
  ) {}

  async create(question: CreateQuestionDto): Promise<QuestionsEntity> {
    const newQuestion: QuestionsEntity =
      this.questionRepository.create(question);
    const savedQuestion: QuestionsEntity = await this.questionRepository.save(
      newQuestion,
    );

    const questionWithUser: QuestionsEntity =
      await this.questionRepository.findOne({
        where: {
          id: savedQuestion.id,
        },
        relations: {
          user: true,
          offer: true,
        },
      });

    // Create stats record for the dashboard
    await this.statsService.create(
      question.userId,
      question.offerId,
      'question',
    );

    // SendGrid mailing action
    try {
      await this.sendGrid.send({
        to: questionWithUser.user.email,
        from: EMAIL_CONFIG.FROM,
        subject: EMAIL_CONFIG.SUBJECT,
        text: EMAIL_CONFIG.TEXT,
        html: renderQuestionEmailTemplate(
          questionWithUser.user.first_name,
          savedQuestion.question,
          savedQuestion.full_name,
          savedQuestion.email,
          savedQuestion.phone,
          questionWithUser.offer.name,
        ),
      });
    } catch (err) {
      console.log('err', err.response.body.errors);
    }

    // Despite the failing email action,
    // we should save the question to the DB
    return savedQuestion;
  }

  async findOne(questionId: number): Promise<QuestionsEntity> {
    const question: QuestionsEntity = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });

    if (!question) {
      throw new NotFoundException(QUESTIONS_HTTP_RESPONSES.NOT_FOUND);
    }

    return question;
  }

  async findAll(userId: number, params: any): Promise<PaginationResponse> {
    const pagination = {
      page: parseInt(params.page) || 1,
      limit: parseInt(params.limit) || 8,
    };
    const skippedItems: number = (pagination.page - 1) * pagination.limit;

    const [questions, totalCount] = await this.questionRepository
      .createQueryBuilder('questions')
      .where('questions.userId = :userId', { userId })
      .leftJoinAndSelect('questions.offer', 'offer')
      .offset(skippedItems)
      .limit(pagination.limit)
      .select(['questions', 'offer.name'])
      .getManyAndCount();

    const totalPages: number = Math.ceil(totalCount / pagination.limit);

    return {
      totalCount: !questions.length ? 0 : totalCount,
      totalPages: totalPages,
      limit: pagination.limit,
      page: pagination.page,
      data: questions,
    };
  }

  async delete(questionId: number, userId: number): Promise<QuestionsEntity> {
    const question: QuestionsEntity = await this.findOne(questionId);

    if (question.userId !== userId) {
      throw new ForbiddenException(QUESTIONS_HTTP_RESPONSES.FORBIDDEN);
    }

    return this.questionRepository.remove(question);
  }
}
