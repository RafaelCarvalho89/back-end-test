import { DataOptionModel, QuestionModel } from '../../models/question-model'

export interface AddQuestionModel {
  statement: string
  options: DataOptionModel[]
}

export interface AddQuestion {
  add: (examId: string, question: AddQuestionModel) => Promise<QuestionModel>
}
