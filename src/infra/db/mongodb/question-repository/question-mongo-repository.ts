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
  async add (questionData: AddQuestionModel): Promise<any> {
    const { examId, ...addQuestionData } = questionData
    const examCollection = await MongoHelper.getCollection('exams')
    const exam = await examCollection.findOne({
      _id: examId
    })

    if (!exam?.questions) exam.questions = []
    exam.questions.push(addQuestionData)
    const { result: { ok } } = await examCollection.updateOne(
      { _id: examId },
      { $set: exam },
      { upsert: true }
    )
    return { ok } || null
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
