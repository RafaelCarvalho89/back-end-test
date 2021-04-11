import {
  ListQuestions,
  ListQuestionsRepository,
  QuestionModel
} from './db-list-questions-protocols'

export class DbListQuestions implements ListQuestions {
  constructor (private readonly listQuestionsRepository: ListQuestionsRepository) {}

  async list (examId: string): Promise<QuestionModel[]> {
    return await this.listQuestionsRepository.list(examId)
  }
}
