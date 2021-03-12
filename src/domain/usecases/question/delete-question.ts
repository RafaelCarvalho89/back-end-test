export interface DeleteQuestionModel {
  id: string
}

export interface DeleteQuestion {
  delete: (deleteQuestionModel: DeleteQuestionModel) => Promise<any>
}
