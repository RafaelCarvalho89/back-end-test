import { QuestionModel } from '../../models/question-model'

export interface ListQuestions {
  list: (examId: string) => Promise<QuestionModel[]>
}
