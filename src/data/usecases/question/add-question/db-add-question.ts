import {
  AddQuestion,
  AddQuestionModel,
  AddQuestionRepository,
  QuestionModel
} from './db-add-question-protocols'

export class DbAddQuestion implements AddQuestion {
  constructor (private readonly addQuestionRepository: AddQuestionRepository) { }

  async add (questionData: AddQuestionModel): Promise<QuestionModel> {
    const question = await this.addQuestionRepository.add(questionData)
    return question
  }
}
