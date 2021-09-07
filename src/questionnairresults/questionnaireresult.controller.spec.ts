import { Test, TestingModule } from '@nestjs/testing';
import { QuestionnaireResultController } from './questionnaireresult.controller';

describe('QuestionaireResultController', () => {
  let controller: QuestionnaireResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnaireResultController],
    }).compile();

    controller = module.get<QuestionnaireResultController>(
      QuestionnaireResultController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
