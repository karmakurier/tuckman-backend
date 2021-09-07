import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './questionnaire.entity';

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectRepository(Questionnaire)
    private questionsRepository: Repository<Questionnaire>,
  ) {}

  findAll(): Promise<Questionnaire[]> {
    return this.questionsRepository.find({ relations: ['questions'] });
  }

  findOne(id: number): Promise<Questionnaire> {
    return this.questionsRepository.findOne(id, { relations: ['questions'] });
  }

  updateOne(id: string, questionnaire: Questionnaire) {
    if (this.questionsRepository.findOne(id)) {
      return this.questionsRepository.save(questionnaire);
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }

  createOne(questionnaire: Questionnaire) {
    return this.questionsRepository.save(questionnaire);
  }

  async remove(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
