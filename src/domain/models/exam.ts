export interface Option {
  id: string
  key: string
  value: string
  correct: boolean
}

export interface Question {
  id: string
  statement: string
  options: Option[]
}

export type ExamType = 'ONLINE' | 'OFFLINE'

export interface Exam {
  name: string
  description: string
  type: ExamType
  questions?: Question[]
}
