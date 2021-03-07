import {
  AddExam,
  AddExamModel,
  AddExamRepository,
  ExamModel
} from './db-add-exam-protocols'

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
