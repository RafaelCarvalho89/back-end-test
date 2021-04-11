import { DataOptionModel, QuestionModel } from '../../models/question-model'

export interface UpdateQuestionModel {
  statement: string
  options: DataOptionModel[]
}

export interface UpdateQuestionResponseModel extends QuestionModel {
  examId: string
  examName: string
}

export interface UpdateQuestion {
  update: (id: string, question: UpdateQuestionModel) => Promise<QuestionModel>
}
