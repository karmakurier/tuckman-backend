import { Question } from 'src/questions/question.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuestionnaireResult } from './questionnaireresult.entity';

@Entity()
export class QuestionResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.questionResult)
  question: Question;

  @Column()
  answer: number;

  @ManyToOne(
    () => QuestionnaireResult,
    (questionnaireResult) => questionnaireResult.QuestionResults,
  )
  questionnair: QuestionnaireResult;
}
