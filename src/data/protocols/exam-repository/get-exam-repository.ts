import { ExamModel } from '../../../domain/models/exam-model'

export interface GetExamRepository {
  get: (id: string) => Promise<ExamModel>
}
