import { DataOptionModel, QuestionModel } from '../../models/question-model'

export interface AddQuestionModel {
  examId: string
  statement: string
  options: DataOptionModel[]
}

export interface AddQuestion {
  add: (question: AddQuestionModel) => Promise<QuestionModel>
}
