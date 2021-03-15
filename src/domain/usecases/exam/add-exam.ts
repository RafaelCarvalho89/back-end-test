import { ExamModel, ExamType } from '../../models/exam/exam-model'
import { AddOptionModel } from '../question'

export interface AddExamQuestionModel {
  statement: string
  options: AddOptionModel[]
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
