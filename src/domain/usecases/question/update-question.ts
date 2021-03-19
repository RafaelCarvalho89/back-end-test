import { DataOptionModel, QuestionModel } from '../../models/question-model'

export interface UpdateQuestionModel {
  id: string
  statement: string
  options: DataOptionModel[]
}

export interface UpdateQuestionResponseModel extends QuestionModel {
  examId: string
  examName: string
}

export interface UpdateQuestion {
  update: (question: UpdateQuestionModel) => Promise<QuestionModel>
}
