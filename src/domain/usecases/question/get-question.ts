import { QuestionModel } from '../../models/question/question-model'

export interface GetQuestion {
  get: (id: string) => Promise<QuestionModel>
}
