import { ExamModel } from '../../../domain/models/exam/exam-model'
import { AddExamModel, DeleteExamModel, GetExamModel, UpdateExamModel } from '../../../domain/usecases/exam'

export interface ExamRepository {
  add: (ExamData: AddExamModel) => Promise<ExamModel>
  update: (ExamData: UpdateExamModel) => Promise<any>
  get: (ExamData: GetExamModel) => Promise<ExamModel>
  list: () => Promise<ExamModel[]>
  delete: (ExamData: DeleteExamModel) => Promise<any>
}
