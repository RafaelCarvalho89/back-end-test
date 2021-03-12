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
    const { examId, statement, options } = questionData
    const examCollection = await MongoHelper.getCollection('exams')
    const exam = await MongoHelper.getById(examId, examCollection)
    if (!exam) return null

    if (!exam.questions) exam.questions = []
    exam.questions.push(MongoHelper.addObjectId({
      statement,
      options: MongoHelper.addObjectIdInObjectList(options)
    }))

    const { result: { ok } } = await MongoHelper.updateOne(examCollection, examId, exam)
    const updatedExam = await MongoHelper.getDocumentById(examId, 'exams')
    const lastPosition = updatedExam.questions.length - 1
    const addedQuestion = updatedExam.questions[lastPosition]
    return ok ? addedQuestion : null
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
