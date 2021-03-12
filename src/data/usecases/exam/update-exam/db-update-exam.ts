import {
  UpdateExam,
  UpdateExamModel,
  UpdateExamRepository,
  ExamModel
} from './db-update-exam-protocols'

export class DbUpdateExam implements UpdateExam {
  constructor (private readonly updateExamRepository: UpdateExamRepository) { }

  async update (examData: UpdateExamModel): Promise<ExamModel> {
    const exam = await this.updateExamRepository.update(examData)
    return exam
  }
}
