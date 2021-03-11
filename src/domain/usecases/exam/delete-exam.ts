export interface DeleteExamModel {
  id: string
}

export interface DeleteExam {
  delete: (exam: DeleteExamModel) => Promise<any>
}
