import {
  DeleteQuestion,
  DeleteQuestionModel,
  DeleteQuestionRepository
} from './db-delete-questions-protocols'

export class DbDeleteQuestion implements DeleteQuestion {
  constructor (private readonly deleteQuestionRepository: DeleteQuestionRepository) {}

  async delete (questionData: DeleteQuestionModel): Promise<any> {
    const deleteResponse = await this.deleteQuestionRepository.delete(questionData)
    return deleteResponse
  }
}
