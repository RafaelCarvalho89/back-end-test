import { ExamModel } from '../../../domain/models/exam-model'
import { AddExamModel, UpdateExamModel } from '../../../domain/usecases/exam'

export interface ExamRepository {
  add: (ExamData: AddExamModel) => Promise<ExamModel>
  update: (id: string, ExamData: UpdateExamModel) => Promise<ExamModel>
  get: (id: string) => Promise<ExamModel>
  list: () => Promise<ExamModel[]>
  delete: (id: string) => Promise<any>
}
