import {
  UpdateQuestion,
  UpdateQuestionModel,
  UpdateQuestionRepository,
  QuestionModel
} from './db-update-question-protocols'

export class DbUpdateQuestion implements UpdateQuestion {
  constructor (private readonly updateQuestionRepository: UpdateQuestionRepository) { }

  async update (id: string, questionData: UpdateQuestionModel): Promise<QuestionModel> {
    return await this.updateQuestionRepository.update(id, questionData)
  }
}
