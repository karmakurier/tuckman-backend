import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Question } from '../questions/question.entity';

@Entity()
export class QuestionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Question,
    (question) => question.category)
  @JoinTable()
  questions: Question[];
}
