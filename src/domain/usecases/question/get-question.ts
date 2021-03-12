import { QuestionModel } from '../../models/question/question-model'

export interface GetQuestionModel {
  id: string
}

export interface GetQuestion {
  get: (getQuestionModel: GetQuestionModel) => Promise<QuestionModel>
}
