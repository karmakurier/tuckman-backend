import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultsController } from './results/results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from './questions/questions.module';
import { RoomsModule } from './rooms/rooms.module';
import { QuestionnairesModule } from './questionnaires/questionnaire.module';
import { QuestionnaireResultModule } from './questionnairresults/questionnaireresult.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    QuestionsModule,
    RoomsModule,
    QuestionnairesModule,
    QuestionnaireResultModule,
  ],
  controllers: [AppController, ResultsController],
  providers: [AppService],
})
export class AppModule { }
