import {
  DeleteExam,
  DeleteExamModel,
  DeleteExamRepository
} from './db-delete-exam-protocols'

export class DbDeleteExam implements DeleteExam {
  constructor (private readonly deleteExamRepository: DeleteExamRepository) {}

  async delete (examData: DeleteExamModel): Promise<any> {
    const deleteResponse = await this.deleteExamRepository.delete(examData)
    return deleteResponse
  }
}
