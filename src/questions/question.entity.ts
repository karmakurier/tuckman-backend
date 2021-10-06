import { ApiProperty } from '@nestjs/swagger';
import { QuestionCategory } from 'src/questioncategories/questioncategory.entity';
import { QuestionResult } from 'src/questionnairresults/questionResult.entity';

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

  @ManyToOne(
    (type) => QuestionCategory,
    (category) => category.questions
  )
  category: QuestionCategory;

  @OneToMany(
    (type) => QuestionResult,
    (questionresult) => questionresult.question,
  )
  questionResult: QuestionResult;
}
