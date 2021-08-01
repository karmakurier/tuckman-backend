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
import { QuestionnaireResult } from './questionnaireresult.entity';
import { QuestionnaireResultService } from './questions.service';

@ApiTags('questionnaireresult')
@Controller('questionnaireresult')
export class QuestionnaireResultController {
  constructor(private questionnaireResultService: QuestionnaireResultService) { }

  @Get()
  async findAll() {
    return await this.questionnaireResultService.findAll();
  }

  @Post()
  async createSingle(@Body() question: QuestionnaireResult): Promise<QuestionnaireResult> {
    return await this.questionnaireResultService.createOne(question);
  }

  @Put(':id')
  async updateSingle(
    @Param('id') id: number,
    @Body() question: QuestionnaireResult,
  ): Promise<QuestionnaireResult> {
    return await this.questionnaireResultService.createOne(question);
  }

  @Delete(':id')
  async deleteSingle(@Param('id') id: number) {
    return await this.questionnaireResultService.remove(id);
  }
}
