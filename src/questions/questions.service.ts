import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOne(id);
  }

  updateOne(id: number, question: Question) {
    if (this.questionsRepository.findOne(id)) {
      return this.questionsRepository.save(question);
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }

  createOne(question: Question) {
    return this.questionsRepository.save(question);
  }

  async remove(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
