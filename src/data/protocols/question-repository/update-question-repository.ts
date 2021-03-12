import { QuestionModel } from '../../../domain/models/question/question-model'
import { UpdateQuestionModel } from '../../../domain/usecases/question/update-question'

export interface UpdateQuestionRepository {
  update: (QuestionData: UpdateQuestionModel) => Promise<QuestionModel>
}
