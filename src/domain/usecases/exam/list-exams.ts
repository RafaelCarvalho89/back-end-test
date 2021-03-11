import { ExamModel } from '../../models/exam/exam-model'

export interface ListExams {
  list: () => Promise<ExamModel[]>
}
