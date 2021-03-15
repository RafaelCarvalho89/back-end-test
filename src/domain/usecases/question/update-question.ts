import { QuestionModel } from '../../models/question/question-model'

export interface UpdateOptionModel {
  key: string
  value: string
  correct: boolean
}

export interface UpdateQuestionModel {
  id: string
  statement: string
  options: UpdateOptionModel[]
}

export interface UpdateQuestionResponseModel extends QuestionModel{
  examId: string
  examName: string
}

export interface UpdateQuestion {
  update: (question: UpdateQuestionModel) => Promise<QuestionModel>
}
