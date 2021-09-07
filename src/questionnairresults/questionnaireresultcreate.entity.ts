import { QuestionResultCreate } from './questionResultCreate.entity';

export class QuestionnaireResultCreate {
  id: number;
  roomId: number;
  QuestionResults: QuestionResultCreate[];
}
