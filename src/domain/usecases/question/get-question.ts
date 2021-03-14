import { QuestionModel } from '../../models/question/question-model'

export interface GetQuestionModel {
  id: string
}

export interface GetQuestionResponseModel extends QuestionModel{
  examId: string
  examName: string
}

export interface GetQuestion {
  get: (getQuestionModel: GetQuestionModel) => Promise<QuestionModel>
}
