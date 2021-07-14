import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnairesController } from './questionnaire.controller';

describe('QuestionsController', () => {
  let controller: QuestionnairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnairesController],
    }).compile();

    controller = module.get<QuestionnairesController>(QuestionnairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
