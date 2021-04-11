import { QuestionModel } from '../../../domain/models/question-model'
import { AddQuestionModel } from '../../../domain/usecases/question/add-question'

export interface AddQuestionRepository {
  add: (examId: string, questionData: AddQuestionModel) => Promise<QuestionModel>
}
