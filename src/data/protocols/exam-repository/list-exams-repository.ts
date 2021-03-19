import { ExamModel } from '../../../domain/models/exam-model'

export interface ListExamsRepository {
  list: () => Promise<ExamModel[]>
}
