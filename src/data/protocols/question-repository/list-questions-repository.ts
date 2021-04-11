import { QuestionModel } from '../../../domain/models/question-model'

export interface ListQuestionsRepository {
  list: (examId: string) => Promise<QuestionModel[]>
}
