import { ExamModel } from '../../models/exam/exam-model'

export interface GetExamModel {
  id: string
}

export interface GetExam {
  get: (exam: GetExamModel) => Promise<ExamModel>
}
