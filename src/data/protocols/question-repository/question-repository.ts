import { QuestionModel } from '../../../domain/models/question-model'
import { AddQuestionModel, GetQuestionResponseModel, ListQuestionsModel, UpdateQuestionModel } from '../../../domain/usecases/question'

export interface QuestionRepository {
  add: (questionData: AddQuestionModel) => Promise<QuestionModel>
  get: (id: string) => Promise<GetQuestionResponseModel>
  list: (questionData: ListQuestionsModel) => Promise<QuestionModel[]>
  update: (questionData: UpdateQuestionModel) => Promise<QuestionModel>
  delete: (id: string) => Promise<any>
}
