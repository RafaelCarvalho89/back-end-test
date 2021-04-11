import { QuestionModel } from '../../../domain/models/question-model'

export interface GetQuestionRepository {
  get: (id: string) => Promise<QuestionModel>
}
