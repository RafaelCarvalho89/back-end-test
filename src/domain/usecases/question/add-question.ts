import { QuestionModel } from '../../models/question/question-model'

export interface AddOptionModel {
  key: string
  value: string
  correct: boolean
}

export interface AddQuestionModel {
  examId: string
  statement: string
  options: AddOptionModel[]
}

export interface AddQuestion {
  add: (question: AddQuestionModel) => Promise<QuestionModel>
}
