import { ExamModel } from '../../models/exam-model'

export interface ListExams {
  list: () => Promise<ExamModel[]>
}
