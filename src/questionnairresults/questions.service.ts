import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionnaireResult } from './questionnaireresult.entity';

@Injectable()
export class QuestionnaireResultService {
  constructor(
    @InjectRepository(QuestionnaireResult)
    private questionsResultRepository: Repository<QuestionnaireResult>,
  ) { }

  findAll(): Promise<QuestionnaireResult[]> {
    return this.questionsResultRepository.find({ relations: ['QuestionResults'] });
  }

  findOne(id: string): Promise<QuestionnaireResult> {
    return this.questionsResultRepository.findOne(id, { relations: ['QuestionResults'] });
  }

  updateOne(id: string, question: QuestionnaireResult) {
    if (this.questionsResultRepository.findOne(id)) {
      return this.questionsResultRepository.save(question);
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }

  createOne(question: QuestionnaireResult) {
    return this.questionsResultRepository.create(question);
  }

  async remove(id: number): Promise<void> {
    await this.questionsResultRepository.delete(id);
  }
}
