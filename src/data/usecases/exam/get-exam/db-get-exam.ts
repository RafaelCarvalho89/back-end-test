import {
  GetExam,
  GetExamRepository,
  ExamModel
} from './db-get-exam-protocols'

export class DbGetExam implements GetExam {
  constructor (private readonly getExamRepository: GetExamRepository) {}

  async get (id: string): Promise<ExamModel> {
    return await this.getExamRepository.get(id)
  }
}
