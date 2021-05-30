import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Question } from '../../questions/question.entity';
import { Questionnaire } from './questionnaire.entity';
import { QuestionnaireResult } from './questionnaireresult.entity';

@Entity()
export class QuestionResult {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Question, question => question.questionResult)
    question: Question;

    @Column()
    answer: number;

    @ManyToOne(type => QuestionnaireResult, questionnaireResult => questionnaireResult.QuestionResults)
    questionnair: QuestionnaireResult;
}