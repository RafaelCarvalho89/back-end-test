import {
  AddQuestion,
  AddQuestionModel,
  AddQuestionRepository,
  QuestionModel
} from './db-add-question-protocols'

export class DbAddQuestion implements AddQuestion {
  constructor (private readonly addQuestionRepository: AddQuestionRepository) { }

  async add (examId: string, questionData: AddQuestionModel): Promise<QuestionModel> {
    return await this.addQuestionRepository.add(examId, questionData)
  }
}
