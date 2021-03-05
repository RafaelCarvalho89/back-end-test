import { ExamModel } from '../../../domain/models/exam'
import { AddExam, AddExamModel } from '../../../domain/usecases/add-exam'
import { AddExamRepository } from '../../protocols/add-exam-repository'

export class DbAddExam implements AddExam {
  private readonly addExamRepository: AddExamRepository

  constructor (addExamRepository: AddExamRepository) {
    this.addExamRepository = addExamRepository
  }

  async add (examData: AddExamModel): Promise<ExamModel> {
    const exam = await this.addExamRepository.add(examData)
    return exam
  }
}
