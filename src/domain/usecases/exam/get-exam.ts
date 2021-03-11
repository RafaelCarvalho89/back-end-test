export interface GetExamModel {
  id: string
}

export interface GetExam {
  get: (exam: GetExamModel) => Promise<any>
}
