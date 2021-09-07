import { Questionnaire } from 'src/questionnaires/questionnaire.entity';
import { QuestionnaireResult } from 'src/questionnairresults/questionnaireresult.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.rooms)
  roomQuestionnaire: Questionnaire;

  @Column()
  teamName: string;

  @Column()
  notes: string;

  @Column()
  initiatorEmail: string;

  @Column()
  expiresAt: Date;

  @Column()
  roomUUID: string;

  @Column()
  participateUUID: string;

  @OneToMany(
    (type) => QuestionnaireResult,
    (questionnaireResult) => questionnaireResult.room,
  )
  questionnaireResults: QuestionnaireResult[];
}
