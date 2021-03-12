import {
  GetQuestion,
  GetQuestionModel,
  GetQuestionRepository,
  QuestionModel
} from './db-get-question-protocols'

export class DbGetQuestion implements GetQuestion {
  constructor (private readonly getQuestionRepository: GetQuestionRepository) {}

  async get (questionData: GetQuestionModel): Promise<QuestionModel> {
    const question = await this.getQuestionRepository.get(questionData)
    return question
  }
}
