import { QuestionResultCreate } from './questionResultCreate.entity';

export class QuestionnaireResultCreate {
  participateId: string;
  QuestionResults: QuestionResultCreate[];
}
