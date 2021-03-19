import { ExamModel } from '../../../domain/models/exam/exam-model'
import { AddExamModel, UpdateExamModel } from '../../../domain/usecases/exam'

export interface ExamRepository {
  add: (ExamData: AddExamModel) => Promise<ExamModel>
  update: (ExamData: UpdateExamModel) => Promise<any>
  get: (id: string) => Promise<ExamModel>
  list: () => Promise<ExamModel[]>
  delete: (id: string) => Promise<any>
}
