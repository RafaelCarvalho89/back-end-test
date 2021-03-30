import {
  DeleteQuestion,
  DeleteQuestionRepository
} from './db-delete-question-protocols'

export class DbDeleteQuestion implements DeleteQuestion {
  constructor (private readonly deleteQuestionRepository: DeleteQuestionRepository) {}

  async delete (id: string): Promise<any> {
    return await this.deleteQuestionRepository.delete(id)
  }
}
