import {
  ListExams,
  ListExamsRepository,
  ExamModel
} from './db-list-exams-protocols'

export class DbListExams implements ListExams {
  constructor (private readonly listExamsRepository: ListExamsRepository) {}

  async list (): Promise<ExamModel[]> {
    const examList = await this.listExamsRepository.list()
    return examList
  }
}
