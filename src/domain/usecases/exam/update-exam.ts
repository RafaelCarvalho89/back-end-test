import { ExamModel, ExamType } from '../../models/exam/exam-model'
import { UpdateOptionModel } from '../question'

export interface UpdateExamQuestionModel {
  id: string
  statement: string
  options: UpdateOptionModel[]
}

export interface UpdateExamModel {
  name: string
  description: string
  type: ExamType
  questions?: UpdateExamQuestionModel[]
}

export interface UpdateExam {
  update: (id: string, exam: UpdateExamModel) => Promise<ExamModel>
}
