import {
  DeleteExam,
  DeleteExamRepository
} from './db-delete-exam-protocols'

export class DbDeleteExam implements DeleteExam {
  constructor (private readonly deleteExamRepository: DeleteExamRepository) {}

  async delete (id: string): Promise<any> {
    return await this.deleteExamRepository.delete(id)
  }
}
