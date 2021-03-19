import { QuestionModel } from '../../../domain/models/question-model'
import { AddQuestionModel, DeleteQuestionModel, GetQuestionModel, GetQuestionResponseModel, ListQuestionsModel, UpdateQuestionModel } from '../../../domain/usecases/question'

export interface QuestionRepository {
  add: (questionData: AddQuestionModel) => Promise<QuestionModel>
  update: (questionData: UpdateQuestionModel) => Promise<QuestionModel>
  get: (questionData: GetQuestionModel) => Promise<GetQuestionResponseModel>
  list: (questionData: ListQuestionsModel) => Promise<QuestionModel[]>
  delete: (questionData: DeleteQuestionModel) => Promise<any>
}
