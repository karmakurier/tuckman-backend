import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }

  @Post()
  async createSingle(@Body() question: Question): Promise<Question> {
    return await this.questionService.createOne(question);
  }

  @Put(':id')
  async updateSingle(
    @Param('id') id: number,
    @Body() question: Question,
  ): Promise<Question> {
    return await this.questionService.createOne(question);
  }

  @Delete(':id')
  async deleteSingle(@Param('id') id: number) {
    return await this.questionService.remove(id);
  }
}
