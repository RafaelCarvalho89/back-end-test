import { ExamModel, ExamType } from '../../models/exam-model'
import { DataOptionModel } from '../../models/question-model'

export interface AddExamQuestionModel {
  statement: string
  options: DataOptionModel[]
}
export interface AddExamModel {
  name: string
  description: string
  type: ExamType
  questions?: AddExamQuestionModel[]
}

export interface AddExam {
  add: (exam: AddExamModel) => Promise<ExamModel>
}
