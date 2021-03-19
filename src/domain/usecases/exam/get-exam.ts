import { ExamModel } from '../../models/exam-model'

export interface GetExam {
  get: (id: string) => Promise<ExamModel>
}
