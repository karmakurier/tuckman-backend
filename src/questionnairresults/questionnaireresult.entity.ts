import { Room } from 'src/rooms/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { QuestionResult } from './questionResult.entity';

@Entity()
export class QuestionnaireResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.questionnaireResults)
  room: Room;

  @Column()
  createdAt: Date;

  @Column()
  uuid: string;

  @OneToMany(
    () => QuestionResult,
    (questionresult) => questionresult.questionnair,
  )
  QuestionResults: QuestionResult[];
}
