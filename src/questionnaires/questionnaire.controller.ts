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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnairesService } from './questionnaire.service';

@Controller('questionnaires')
@ApiTags('questionnaires')
export class QuestionnairesController {
  constructor(private questionService: QuestionnairesService) { }

  @Get()
  async findAll(): Promise<Questionnaire[]> {
    return await this.questionService.findAll();
  }

  @Get(':id')
  async findSingle(@Param('id') id: number): Promise<Questionnaire> {
    return await this.questionService.findOne(id);
  }

  @Post()
  async createSingle(
    @Body() questionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return await this.questionService.createOne(questionnaire);
  }

  @Put(':id')
  async updateSingle(
    @Param('id') id: number,
    @Body() questionnaire: Questionnaire,
  ): Promise<Questionnaire> {
    return await this.questionService.createOne(questionnaire);
  }

  @Delete(':id')
  async deleteSingle(@Param('id') id: number) {
    return await this.questionService.remove(id);
  }
}
