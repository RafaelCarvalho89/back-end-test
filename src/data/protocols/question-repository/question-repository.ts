import { QuestionModel } from '../../../domain/models/question-model'
import { AddQuestionModel, GetQuestionResponseModel, UpdateQuestionModel } from '../../../domain/usecases/question'

export interface QuestionRepository {
  add: (examId: string, questionData: AddQuestionModel) => Promise<QuestionModel>
  get: (id: string) => Promise<GetQuestionResponseModel>
  list: (examId: string) => Promise<QuestionModel[]>
  update: (questionData: UpdateQuestionModel) => Promise<QuestionModel>
  delete: (id: string) => Promise<any>
}
