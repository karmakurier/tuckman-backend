import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {

    constructor(
        @InjectRepository(Room)
        private questionsRepository: Repository<Room>,
    ) { }

    findAll(): Promise<Room[]> {
        return this.questionsRepository.find();
    }

    findOne(id: string): Promise<Room> {
        return this.questionsRepository.findOne(id);
    }
}