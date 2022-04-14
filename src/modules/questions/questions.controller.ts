import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppRequest } from 'src/types/request';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateQuestionDto } from './questions.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/create')
  async createQuestion(@Body() questionDetails: CreateQuestionDto) {
    return await this.questionsService.create(questionDetails);
  }

  @Delete('/remove/:id')
  @UseGuards(JwtAuthGuard)
  async removeQuestion(
    @Param('id') id: string,
    @Request() request: AppRequest,
  ) {
    return await this.questionsService.delete(
      parseInt(id),
      parseInt(request.user.id),
    );
  }

  @Get('/get/:id')
  @UseGuards(JwtAuthGuard)
  async getOneQuestion(@Param('id') id: string) {
    return await this.questionsService.findOne(parseInt(id));
  }

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async getAllQuestion(@Request() request: AppRequest) {
    return await this.questionsService.findAll(parseInt(request.user.id));
  }
}
