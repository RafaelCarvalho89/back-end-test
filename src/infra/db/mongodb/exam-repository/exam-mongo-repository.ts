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
  private readonly collectionName = 'exams'

  private newExam (exam: AddExamModel): ExamModel {
    const { name, description, type, questions } = exam
    return MongoHelper.addObjectId({
      name,
      description,
      type,
      questions: questions ? MongoHelper.addObjectIdInObjectList(questions) : []
    })
  }

  async add (examData: AddExamModel): Promise<ExamModel> {
    const examCollection = await MongoHelper.getCollection('exams')
    const result = await examCollection.insertOne(examData)
    return MongoHelper.map(result.ops[0])
  }

  async update (examData: UpdateExamModel): Promise<any|null> {
    const { id, ...updatedContent } = examData
    const result = await MongoHelper.updateOne(id, updatedContent, 'exams')
    const updatedExam = await MongoHelper.getDocumentById(id, this.collectionName)
    return result.nModified === 1 ? MongoHelper.map(updatedExam) : null
  }

  async get (examData: GetExamModel): Promise<ExamModel> {
    const foundExam = await MongoHelper.getDocumentById(examData.id, this.collectionName)
    return MongoHelper.map(foundExam)
  }

  async list (): Promise<ExamModel[]> {
    return MongoHelper.mapList(await MongoHelper.list(this.collectionName))
  }

  async delete (examData: DeleteExamModel): Promise<any|null> {
    return await MongoHelper.delete(examData.id, this.collectionName)
  }
}
