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
import { QuestionCategory } from './questioncategories/questioncategory.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_TYPE as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        process.env.ENTITYPATH + "questions/question.entity.js",
        process.env.ENTITYPATH + "questionnaires/questionnaire.entity.js",
        process.env.ENTITYPATH + "questionnairresults/questionResult.entity.js",
        process.env.ENTITYPATH + "questionnairresults/questionnaireresult.entity.js",
        process.env.ENTITYPATH + "rooms/room.entity.js",
        process.env.ENTITYPATH + "questioncategories/questioncategory.entity.js"
      ],
      synchronize: true
    }),
    QuestionsModule,
    RoomsModule,
    QuestionnairesModule,
    QuestionnaireResultModule,
  ],
  controllers: [AppController, ResultsController],
  providers: [AppService],
})
export class AppModule { }
