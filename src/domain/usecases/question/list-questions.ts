import { QuestionModel } from '../../models/question/question-model'

export interface ListQuestions {
  list: (examId: string) => Promise<QuestionModel[]>
}
