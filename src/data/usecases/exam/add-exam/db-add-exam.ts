import {
  AddExam,
  AddExamModel,
  AddExamRepository,
  ExamModel
} from './db-add-exam-protocols'

export class DbAddExam implements AddExam {
  constructor (private readonly addExamRepository: AddExamRepository) { }

  async add (examData: AddExamModel): Promise<ExamModel> {
    const exam = await this.addExamRepository.add(examData)
    return exam
  }
}
