import { ExamModel, ExamType } from '../../models/exam/exam-model'
import { UpdateOptionModel } from '../question'

export interface UpdateExamQuestionModel {
  id: string
  statement: string
  options: UpdateOptionModel[]
}

export interface UpdateExamModel {
  id: string
  name: string
  description: string
  type: ExamType
  questions?: UpdateExamQuestionModel[]
}

export interface UpdateExam {
  update: (exam: UpdateExamModel) => Promise<ExamModel>
}
