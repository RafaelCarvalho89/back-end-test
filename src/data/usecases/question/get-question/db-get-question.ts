import {
  GetQuestion,
  GetQuestionRepository,
  QuestionModel
} from './db-get-question-protocols'

export class DbGetQuestion implements GetQuestion {
  constructor (private readonly getQuestionRepository: GetQuestionRepository) {}

  async get (id: string): Promise<QuestionModel> {
    return await this.getQuestionRepository.get(id)
  }
}
