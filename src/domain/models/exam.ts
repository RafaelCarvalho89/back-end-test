export interface OptionModel {
  id: string
  key: string
  value: string
  correct: boolean
}

export interface QuestionModel {
  id: string
  statement: string
  options: OptionModel[]
}

export type ExamType = 'ONLINE' | 'OFFLINE'

export interface ExamModel {
  name: string
  description: string
  type: ExamType
  questions?: QuestionModel[]
}
