import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Question } from '../questions/question.entity';

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => Question) @JoinTable()
    questions: Question[];
}