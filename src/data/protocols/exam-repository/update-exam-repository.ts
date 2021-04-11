import { ExamModel } from '../../../domain/models/exam-model'
import { UpdateExamModel } from '../../../domain/usecases/exam/update-exam'

export interface UpdateExamRepository {
  update: (id: string, ExamData: UpdateExamModel) => Promise<ExamModel>
}
