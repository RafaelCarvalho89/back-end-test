import { QuestionModel, OptionModel } from '../../models/question/question-model'

export interface UpdateQuestionModel {
  id: string
  statement: string
  options: OptionModel[]
}

export interface UpdateQuestionResponseModel extends QuestionModel{
  examId: string
  examName: string
}

export interface UpdateQuestion {
  update: (question: UpdateQuestionModel) => Promise<QuestionModel>
}
