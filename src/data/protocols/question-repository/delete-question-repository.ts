export interface DeleteQuestionRepository {
  delete: (id: string) => Promise<any>
}
