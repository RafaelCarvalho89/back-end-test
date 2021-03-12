import { ListQuestionsModel } from '../../../../domain/usecases/question'
import {
  ListQuestions,
  ListQuestionsRepository,
  QuestionModel
} from './db-list-questions-protocols'

export class DbListQuestions implements ListQuestions {
  constructor (private readonly listQuestionsRepository: ListQuestionsRepository) {}

  async list (questionData: ListQuestionsModel): Promise<QuestionModel[]> {
    const questionList = await this.listQuestionsRepository.list(questionData)
    return questionList
  }
}
