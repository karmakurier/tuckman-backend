import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from 'src/questionnaires/questionnaire.entity';
import { Question } from 'src/questions/question.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { Room } from 'src/rooms/room.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { QuestionnaireResultController } from './questionnaireresult.controller';
import { QuestionnaireResult } from './questionnaireresult.entity';
import { QuestionResult } from './questionResult.entity';
import { QuestionnaireResultService } from './questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      Questionnaire,
      QuestionResult,
      QuestionnaireResult,
      Room,
    ]),
  ],
  providers: [QuestionnaireResultService, RoomsService, QuestionsService],
  controllers: [QuestionnaireResultController],
})
export class QuestionnaireResultModule {}
