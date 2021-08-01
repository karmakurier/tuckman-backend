import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { QuestionResult } from './questionResult.entity';

@Entity()
export class QuestionnaireResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  createdAt: Date;

  @OneToMany(
    (type) => QuestionResult,
    (questionresult) => questionresult.questionnair,
  )
  QuestionResults: QuestionResult[];
}
