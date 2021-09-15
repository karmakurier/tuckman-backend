import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { QuestionsService } from 'src/questions/questions.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { QuestionnaireResult } from './questionnaireresult.entity';
import { QuestionnaireResultCreate } from './questionnaireresultcreate.entity';
import { QuestionResult } from './questionResult.entity';
import { QuestionnaireResultService } from './questions.service';

@ApiTags('questionnaireresult')
@Controller('questionnaireresult')
export class QuestionnaireResultController {
  constructor(
    private questionnaireResultService: QuestionnaireResultService,
    private roomService: RoomsService,
    private questionService: QuestionsService,
  ) { }

  @ApiQuery({
    name: 'roomUUID',
    description: 'room UUID for retrieving room results',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'resultUUID',
    description: 'resultUUID for retrieving single user results',
    required: false,
    type: String,
  })
  @Get()
  async findAll(
    @Query('roomUUID') roomUUID?: string,
    @Query('resultUUID') resultUUID?: string,
  ) {
    if (roomUUID) {
      const room = await this.roomService.findRoomByRoomUUID(roomUUID);
      if (room) {
        const results = await this.questionnaireResultService.findAllByRoom(room);

        //  todo: make this nicer!
        results.forEach(res => {
          res.QuestionResults.forEach(qr => {
            qr.id = qr.question.id;
            delete qr.question;
          })
        })
        return results;
      }
    } else if (resultUUID) {
      return [await this.questionnaireResultService.findOneByUUID(resultUUID)];
    } else {
      return [];
    }
  }

  @Post()
  async createSingle(
    @Body() question: QuestionnaireResultCreate,
    @Query('participateUUID') participateUUID: string,
  ): Promise<QuestionnaireResult> {
    const newQuestionnaireResult = new QuestionnaireResult();
    newQuestionnaireResult.createdAt = new Date();

    const room = await this.roomService.findOne(question.roomId);

    if (room.participateUUID === participateUUID) {
      newQuestionnaireResult.room = room;
      newQuestionnaireResult.uuid = uuidv4();
      newQuestionnaireResult.QuestionResults = [];

      const createdQR = await this.questionnaireResultService.createOne(
        newQuestionnaireResult,
      );

      const questionResultsToCreate = [];
      for (let i = 0; i < question.QuestionResults.length; i++) {
        const newQuestionResult = new QuestionResult();
        const quest = await this.questionService.findOne(
          question.QuestionResults[i].questionId,
        );
        newQuestionResult.answer = question.QuestionResults[i].answer;
        newQuestionResult.question = quest;
        newQuestionResult.questionnair = createdQR;
        questionResultsToCreate.push(newQuestionResult);
      }

      await this.questionnaireResultService.addQuestionResultToQuestionnaireResult(
        questionResultsToCreate,
      );

      return await this.questionnaireResultService.findOne(createdQR.id);
    } else {
      return null;
    }
  }

  @Delete(':id')
  async deleteSingle(@Param('id') id: number) {
    return await this.questionnaireResultService.remove(id);
  }
}
