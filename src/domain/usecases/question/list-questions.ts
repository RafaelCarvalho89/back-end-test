import { QuestionModel } from '../../models/question/question-model'

export interface ListQuestionsModel {
  examId: string
}

export interface ListQuestions {
  list: (listQuestionsModel: ListQuestionsModel) => Promise<QuestionModel[]>
}
