import {
  GetExam,
  GetExamModel,
  GetExamRepository,
  ExamModel
} from './db-get-exam-protocols'

export class DbGetExam implements GetExam {
  constructor (private readonly getExamRepository: GetExamRepository) {}

  async get (examData: GetExamModel): Promise<ExamModel> {
    const exam = await this.getExamRepository.get(examData)
    return exam
  }
}
