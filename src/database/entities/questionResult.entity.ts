import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from '../../questions/question.entity';
import { QuestionnaireResult } from './questionnaireresult.entity';

@Entity()
export class QuestionResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Question, (question) => question.questionResult)
  question: Question;

  @Column()
  answer: number;

  @ManyToOne(
    (type) => QuestionnaireResult,
    (questionnaireResult) => questionnaireResult.QuestionResults,
  )
  questionnair: QuestionnaireResult;
}
