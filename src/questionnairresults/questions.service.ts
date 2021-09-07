import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/rooms/room.entity';
import { Repository } from 'typeorm';
import { QuestionnaireResult } from './questionnaireresult.entity';
import { QuestionResult } from './questionResult.entity';

@Injectable()
export class QuestionnaireResultService {
  constructor(
    @InjectRepository(QuestionnaireResult)
    private questionsResultRepository: Repository<QuestionnaireResult>,
    @InjectRepository(QuestionResult)
    private questionResultResultRepository: Repository<QuestionResult>,
  ) {}

  findAllByRoom(room: Room): Promise<QuestionnaireResult[]> {
    return this.questionsResultRepository.find({
      relations: ['QuestionResults'],
      where: { room: room },
    });
  }

  findOne(id: number): Promise<QuestionnaireResult> {
    return this.questionsResultRepository.findOne(id, {
      relations: ['QuestionResults'],
    });
  }

  findOneByUUID(id: string): Promise<QuestionnaireResult> {
    return this.questionsResultRepository.findOne({
      relations: ['QuestionResults'],
      where: { uuid: id },
    });
  }

  updateOne(id: number, question: QuestionnaireResult) {
    if (this.questionsResultRepository.findOne(id)) {
      return this.questionsResultRepository.save(question);
    } else {
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }

  createOne(question: QuestionnaireResult) {
    return this.questionsResultRepository.save(question);
  }

  async remove(id: number): Promise<void> {
    await this.questionsResultRepository.delete(id);
  }

  async addQuestionResultToQuestionnaireResult(
    questionResults: QuestionResult[],
  ) {
    for (let i = 0; i < questionResults.length; i++) {
      await this.questionResultResultRepository.save(questionResults[i]);
    }
  }
}
