import { QuestionModel } from '../../../domain/models/question-model'
import { AddQuestionModel } from '../../../domain/usecases/question/add-question'

export interface AddQuestionRepository {
  add: (questionData: AddQuestionModel) => Promise<QuestionModel>
}
