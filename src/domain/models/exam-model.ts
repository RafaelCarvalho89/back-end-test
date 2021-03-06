import { QuestionModel } from './question-model'

export type ExamType = 'ONLINE' | 'OFFLINE'

export interface ExamModel {
  id: string
  name: string
  description: string
  type: ExamType
  questions?: QuestionModel[]
}
