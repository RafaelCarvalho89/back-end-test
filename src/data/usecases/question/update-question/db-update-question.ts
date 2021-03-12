import {
  UpdateQuestion,
  UpdateQuestionModel,
  UpdateQuestionRepository,
  QuestionModel
} from './db-update-question-protocols'

export class DbUpdateQuestion implements UpdateQuestion {
  constructor (private readonly updateQuestionRepository: UpdateQuestionRepository) { }

  async update (questionData: UpdateQuestionModel): Promise<QuestionModel> {
    const question = await this.updateQuestionRepository.update(questionData)
    return question
  }
}
