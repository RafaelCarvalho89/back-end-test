import { ExamModel } from '../../../domain/models/exam/exam-model'

export interface ListExamsRepository {
  list: () => Promise<ExamModel[]>
}
