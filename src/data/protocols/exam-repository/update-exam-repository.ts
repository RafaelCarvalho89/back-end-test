import { ExamModel } from '../../../domain/models/exam/exam-model'
import { UpdateExamModel } from '../../../domain/usecases/exam/update-exam'

export interface UpdateExamRepository {
  update: (ExamData: UpdateExamModel) => Promise<ExamModel>
}
