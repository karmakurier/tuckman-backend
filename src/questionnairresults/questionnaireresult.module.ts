import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireResultController } from './questionnaireresult.controller';
import { QuestionnaireResult } from './questionnaireresult.entity';
import { QuestionnaireResultService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireResult])],
  providers: [QuestionnaireResultService],
  controllers: [QuestionnaireResultController],
})
export class QuestionnaireResultModule { }
