import { ExamModel, ExamType } from '../../models/exam-model'
import { DataOptionModel } from '../../models/question-model'

export interface UpdateExamQuestionModel {
  id: string
  statement: string
  options: DataOptionModel[]
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
