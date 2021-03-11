import { DeleteExamModel } from '../../../domain/usecases/exam/delete-exam'

export interface DeleteExamRepository {
  delete: (ExamData: DeleteExamModel) => Promise<any>
}
