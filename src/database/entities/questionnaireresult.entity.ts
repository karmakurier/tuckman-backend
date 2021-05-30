import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../../questions/question.entity';
import { QuestionResult } from './questionResult.entity';

@Entity()
export class QuestionnaireResult {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => QuestionResult, questionresult => questionresult.questionnair)
    QuestionResults: QuestionResult[];
}