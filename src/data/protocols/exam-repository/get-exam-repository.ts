import { ExamModel } from '../../../domain/models/exam/exam-model'
import { GetExamModel } from '../../../domain/usecases/exam/get-exam'

export interface GetExamRepository {
  get: (ExamData: GetExamModel) => Promise<ExamModel>
}
