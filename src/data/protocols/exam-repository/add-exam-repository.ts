import { ExamModel } from '../../../domain/models/exam-model'
import { AddExamModel } from '../../../domain/usecases/exam/add-exam'

export interface AddExamRepository {
  add: (ExamData: AddExamModel) => Promise<ExamModel>
}
