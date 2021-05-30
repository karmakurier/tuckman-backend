import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectRepository(Question)
        private questionsRepository: Repository<Question>,
    ) { }

    findAll(): Promise<Question[]> {
        return this.questionsRepository.find();
    }

    findOne(id: string): Promise<Question> {
        return this.questionsRepository.findOne(id);
    }
}