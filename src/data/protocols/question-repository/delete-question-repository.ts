import { DeleteQuestionModel } from '../../../domain/usecases/question/delete-question'

export interface DeleteQuestionRepository {
  delete: (questionData: DeleteQuestionModel) => Promise<any>
}
