import { QuestionModel } from '../../../domain/models/question-model'
import { UpdateQuestionModel } from '../../../domain/usecases/question/update-question'

export interface UpdateQuestionRepository {
  update: (id: string, QuestionData: UpdateQuestionModel) => Promise<QuestionModel>
}
