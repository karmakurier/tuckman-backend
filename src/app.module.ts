import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultsController } from './results/results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/question.entity';
import { Questionnaire } from './questionnaires/questionnaire.entity';
import { Room } from './rooms/room.entity';
import { QuestionsModule } from './questions/questions.module';
import { RoomsModule } from './rooms/rooms.module';
import { QuestionnairesModule } from './questionnaires/questionnaire.module';
import { QuestionnaireResultModule } from './questionnairresults/questionnaireresult.module';
import { QuestionResult } from './questionnairresults/questionResult.entity';
import { QuestionnaireResult } from './questionnairresults/questionnaireresult.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      entities: [
        Question,
        Questionnaire,
        QuestionResult,
        QuestionnaireResult,
        Room,
      ],
      synchronize: true,
    }),
    QuestionsModule,
    RoomsModule,
    QuestionnairesModule,
    QuestionnaireResultModule,
  ],
  controllers: [AppController, ResultsController],
  providers: [AppService],
})
export class AppModule {}
