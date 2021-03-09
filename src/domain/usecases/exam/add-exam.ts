import { ExamModel, ExamType, QuestionModel } from '../../models/exam/exam-model'

export interface AddExamModel {
  name: string
  description: string
  type: ExamType
  questions?: QuestionModel[]
}

export interface AddExam {
  add: (exam: AddExamModel) => Promise<ExamModel>
}
