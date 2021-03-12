import { QuestionModel } from '../../../domain/models/question/question-model'
import { AddQuestionModel, DeleteQuestionModel, GetQuestionModel, ListQuestionsModel, UpdateQuestionModel } from '../../../domain/usecases/question'

export interface QuestionRepository {
  add: (questionData: AddQuestionModel) => Promise<QuestionModel>
  update: (questionData: UpdateQuestionModel) => Promise<QuestionModel>
  get: (questionData: GetQuestionModel) => Promise<QuestionModel>
  list: (questionData: ListQuestionsModel) => Promise<QuestionModel[]>
  delete: (questionData: DeleteQuestionModel) => Promise<any>
}
