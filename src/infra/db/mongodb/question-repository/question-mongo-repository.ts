import { QuestionRepository } from '../../../../data/protocols/question-repository/question-repository'
import {
  AddQuestionModel,
  DeleteQuestionModel,
  GetQuestionModel,
  ListQuestionsModel,
  UpdateQuestionModel
} from '../../../../domain/usecases/question'
import { QuestionModel } from '../../../../domain/models/question/question-model'
import { MongoHelper } from '../helpers/mongo-helper'

export class QuestionMongoRepository implements QuestionRepository {
  async add (questionData: AddQuestionModel): Promise<QuestionModel> {
    const exam = await MongoHelper.getDocumentById(questionData.examId, 'exams')
    if (!exam) return null
    const examCollection = await MongoHelper.getCollection('exams')
    if (!exam.questions) exam.questions = []
    exam.questions.push(MongoHelper.addObjectId({
      statement: questionData.statement,
      options: MongoHelper.addObjectIdInObjectList(questionData.options)
    }))
    const { result: { ok } } = await MongoHelper.updateOne(examCollection, questionData.examId, exam)
    const updatedExam = await MongoHelper.getDocumentById(questionData.examId, 'exams')
    const lastPosition = updatedExam.questions.length - 1
    return ok ? updatedExam.questions[lastPosition] : null
  }

  async update (questionData: UpdateQuestionModel): Promise<any> {
    return { id: '42' }
  }

  async get (questionData: GetQuestionModel): Promise<QuestionModel> {
    return {
      id: '42',
      statement: 'statement',
      options: [
        {
          id: '607b9974-4914-44df-81e8-d56ec6a58951',
          key: 'a',
          value: 'viver',
          correct: false
        }
      ]
    }
  }

  async list (questionData: ListQuestionsModel): Promise<QuestionModel[]> {
    return [
      {
        id: '42',
        statement: 'statement',
        options: [
          {
            id: '607b9974-4914-44df-81e8-d56ec6a58951',
            key: 'a',
            value: 'viver',
            correct: false
          }
        ]
      }
    ]
  }

  async delete (questionData: DeleteQuestionModel): Promise<any> {
    return { ok: 'ok' }
  }
}
