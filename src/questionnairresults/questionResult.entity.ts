import { User } from 'src/database/entities/user.entity';
import { Question } from 'src/questions/question.entity';
import { Room } from 'src/rooms/room.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
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