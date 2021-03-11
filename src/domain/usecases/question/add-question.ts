import { OptionModel, QuestionModel } from '../../models/question/question-model'

export interface AddQuestionModel {
  examId: string
  statement: string
  options: OptionModel[]
}

export interface AddQuestion {
  add: (question: AddQuestionModel) => Promise<QuestionModel>
}
