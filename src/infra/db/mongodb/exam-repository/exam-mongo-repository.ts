import { ExamRepository } from '../../../../data/protocols/exam-repository/exam-repository'
import {
  AddExamModel,
  DeleteExamModel,
  GetExamModel,
  UpdateExamModel
} from '../../../../domain/usecases/exam'
import { ExamModel } from '../../../../domain/models/exam/exam-model'
import { MongoHelper } from '../helpers/mongo-helper'

export class ExamMongoRepository implements ExamRepository {
  async add (examData: AddExamModel): Promise<ExamModel> {
    const examCollection = MongoHelper.getCollection('exams')
    const result = await examCollection.insertOne(examData)
    return MongoHelper.map(result.ops[0])
  }

  async update (examData: UpdateExamModel): Promise<any> {
    const examCollection = MongoHelper.getCollection('exams')
    const { upsertedId } = await examCollection.updateOne(
      { _id: examData.id },
      { $set: examData },
      { upsert: true }
    )
    return { id: upsertedId._id }
  }

  async get (examData: GetExamModel): Promise<ExamModel> {
    const examCollection = MongoHelper.getCollection('exams')
    const exam = await examCollection.findOne({
      _id: examData.id
    })
    return MongoHelper.map(exam)
  }

  async list (): Promise<ExamModel[]> {
    const examCollection = MongoHelper.getCollection('exams')
    const examList = await examCollection.find().toArray()
    return examList.map((collection) => MongoHelper.map(collection))
  }

  async delete (examData: DeleteExamModel): Promise<any> {
    const examCollection = MongoHelper.getCollection('exams')
    const { result: { n, ...ok } } = await examCollection.deleteOne({
      _id: examData.id
    })
    return ok
  }
}
