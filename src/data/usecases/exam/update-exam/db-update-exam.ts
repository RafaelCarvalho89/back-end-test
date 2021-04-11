import {
  UpdateExam,
  UpdateExamModel,
  UpdateExamRepository,
  ExamModel
} from './db-update-exam-protocols'

export class DbUpdateExam implements UpdateExam {
  constructor (private readonly updateExamRepository: UpdateExamRepository) { }

  async update (id: string, examData: UpdateExamModel): Promise<ExamModel> {
    return await this.updateExamRepository.update(id, examData)
  }
}
