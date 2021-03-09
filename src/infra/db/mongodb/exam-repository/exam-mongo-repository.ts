import { AddExamRepository } from '../../../../data/protocols/exam-repository/add-exam-repository'
import { AddExamModel } from '../../../../domain/usecases/exam/add-exam'
import { ExamModel } from '../../../../domain/models/exam/exam-model'
import { MongoHelper } from '../helpers/mongo-helper'

export class ExamMongoRepository implements AddExamRepository {
  async add (examData: AddExamModel): Promise<ExamModel> {
    const examCollection = MongoHelper.getCollection('exams')
    const result = await examCollection.insertOne(examData)
    const { _id, ...examWithoutId } = result.ops[0]
    return Object.assign({}, examWithoutId, { id: _id })
  }
}