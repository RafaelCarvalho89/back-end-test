export interface DataOptionModel {
  key: string
  value: string
  correct: boolean
}

export interface OptionModel extends DataOptionModel {
  id: string
}

export interface QuestionModel {
  id: string
  statement: string
  options: OptionModel[]
}
