import { ExamModel } from '../../domain/models/exam'
import { AddExamModel } from '../../domain/usecases/add-exam'

export interface AddExamRepository {
  add: (ExamData: AddExamModel) => Promise<ExamModel>
}
