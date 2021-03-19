import { QuestionModel } from '../../../domain/models/question-model'
import { GetQuestionModel } from '../../../domain/usecases/question/get-question'

export interface GetQuestionRepository {
  get: (questionData: GetQuestionModel) => Promise<QuestionModel>
}
