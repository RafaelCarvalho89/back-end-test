import { ExamModel } from '../../models/exam/exam-model'

export interface GetExam {
  get: (id: string) => Promise<ExamModel>
}
