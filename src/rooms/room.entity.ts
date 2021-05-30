import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roomQuestionnaireId: string;

    @Column()
    roomResultsId: string;

    @Column()
    teamName: string;
}