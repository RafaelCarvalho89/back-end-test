import { AddExamRepository } from '../../../../data/protocols/add-exam-repository'
import { AddExamModel } from '../../../../domain/usecases/add-exam'
import { ExamModel } from '../../../../domain/models/exam'
import { MongoHelper } from '../helpers/mongo-helper'

export class ExamMongoRepository implements AddExamRepository {
  async add (examData: AddExamModel): Promise<ExamModel> {
    const examCollection = MongoHelper.getCollection('exams')
    const result = await examCollection.insertOne(examData)
    return MongoHelper.map(result.ops[0])
  }
}
