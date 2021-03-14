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

  private newExam (exam: AddExamModel): AddExamModel {
    const { name, description, type, questions } = exam
    return {
      name,
      description,
      type,
      questions: questions ? MongoHelper.addObjectIdInObjectList(questions) : []
    }
  }

  async add (examData: AddExamModel): Promise<ExamModel> {
    const newExam = this.newExam(examData)
    return await MongoHelper.insertOne(newExam, this.collectionName)
  }

  async update (examData: UpdateExamModel): Promise<any|null> {
    const { id, ...updatedContent } = examData
    const result = await MongoHelper.updateOne(id, updatedContent, this.collectionName)
    const updatedExam = await MongoHelper.getDocumentById(id, this.collectionName)
    return result.nModified === 1 ? MongoHelper.map(updatedExam) : null
  }

  async get (examData: GetExamModel): Promise<ExamModel> {
    const foundExam = await MongoHelper.getDocumentById(examData.id, this.collectionName)
    return foundExam ? MongoHelper.map(foundExam) : null
  }

  async list (): Promise<ExamModel[]> {
    return MongoHelper.mapList(await MongoHelper.list(this.collectionName))
  }

  async delete (examData: DeleteExamModel): Promise<any|null> {
    return await MongoHelper.delete(examData.id, this.collectionName)
  }

  async findOneByFilter (filter: any, projection?: any): Promise<any> {
    const foundExam = await MongoHelper.findOneByFilter(filter, this.collectionName, projection)
    return foundExam ? MongoHelper.map(foundExam) : null
  }
}
