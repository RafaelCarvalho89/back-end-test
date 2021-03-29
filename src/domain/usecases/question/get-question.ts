import { QuestionModel } from '../../models/question-model'

export interface GetQuestionResponseModel extends QuestionModel {
  examId: string
  examName: string
}

export interface GetQuestion {
  get: (id: string) => Promise<QuestionModel>
}
