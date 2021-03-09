import { ExamModel, ExamType, QuestionModel } from '../../models/exam/exam-model'

export interface UpdateExamModel {
  id: string
  name: string
  description: string
  type: ExamType
  questions?: QuestionModel[]
}

export interface UpdateExam {
  update: (exam: UpdateExamModel) => Promise<ExamModel>
}
