import { ExamModel, ExamType } from '../../models/exam/exam-model'
import { QuestionModel } from '../../models/question/question-model'

export interface AddExamModel {
  name: string
  description: string
  type: ExamType
  questions?: QuestionModel[]
}

export interface AddExam {
  add: (exam: AddExamModel) => Promise<ExamModel>
}
