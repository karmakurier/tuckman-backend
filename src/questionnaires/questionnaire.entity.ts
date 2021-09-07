import { Room } from 'src/rooms/room.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Question } from '../questions/question.entity';

@Entity()
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Question)
  @JoinTable()
  questions: Question[];

  @OneToMany(() => Room, (room) => room.roomQuestionnaire)
  rooms: Room[];
}
