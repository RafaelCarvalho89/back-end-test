import { ExamModel, ExamType } from '../../models/exam/exam-model'
import { QuestionModel } from '../../models/question/question-model'

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
