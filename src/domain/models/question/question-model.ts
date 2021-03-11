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
