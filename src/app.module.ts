import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsController } from './rooms/rooms.controller';
import { QuestionsController } from './questions/questions.controller';
import { ResultsController } from './results/results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/question.entity';
import { Questionnaire } from './questionnaires/questionnaire.entity';
import { QuestionResult } from './database/entities/questionResult.entity';
import { QuestionnaireResult } from './database/entities/questionnaireresult.entity';
import { Room } from './rooms/room.entity';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      entities: [Question, Questionnaire, QuestionResult, QuestionnaireResult, Room],
      synchronize: true,
    }),
    QuestionsModule
  ],
  controllers: [AppController, RoomsController, ResultsController],
  providers: [AppService],
})
export class AppModule { }
