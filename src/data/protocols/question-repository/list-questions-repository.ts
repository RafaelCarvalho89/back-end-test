import { QuestionModel } from '../../../domain/models/question-model'
import { ListQuestionsModel } from '../../../domain/usecases/question'

export interface ListQuestionsRepository {
  list: (questionData: ListQuestionsModel) => Promise<QuestionModel[]>
}
