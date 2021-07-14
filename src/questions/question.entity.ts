import { ApiProperty } from '@nestjs/swagger';
import { QuestionResult } from 'src/database/entities/questionResult.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Questionnaire } from '../questionnaires/questionnaire.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionString: string;

  @OneToMany(
    (type) => QuestionResult,
    (questionresult) => questionresult.question,
  )
  questionResult: QuestionResult;
}
