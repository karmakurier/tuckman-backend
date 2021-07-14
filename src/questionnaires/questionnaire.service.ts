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
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Questionnaire> {
    return this.questionsRepository.findOne(id);
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
    return this.questionsRepository.create(questionnaire);
  }

  async remove(id: number): Promise<void> {
    await this.questionsRepository.delete(id);
  }
}
