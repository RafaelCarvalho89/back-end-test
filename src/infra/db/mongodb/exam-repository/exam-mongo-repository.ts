import { ExamRepository } from '../../../../data/protocols/exam-repository/exam-repository'
import {
  AddExamModel,
  AddExamQuestionModel,
  UpdateExamModel
} from '../../../../domain/usecases/exam'
import { ExamModel } from '../../../../domain/models/exam-model'
import { MongoHelper } from '../helpers/mongo-helper'
import { QuestionModel } from '../../../../domain/models/question-model'
import { ObjectId } from 'mongodb'

export class ExamMongoRepository implements ExamRepository {
  private readonly collectionName = 'exams'

  private makeNewQuestion (question: AddExamQuestionModel): QuestionModel {
    const { statement, options } = question
    return MongoHelper.addObjectId({
      statement,
      options: MongoHelper.addObjectIdInObjectList(options)
    })
  }

  private makeUpdateQuestion (question: QuestionModel): any {
    const { id, statement, options } = question
    return ({
      id: new ObjectId(id),
      statement,
      options: MongoHelper.addObjectIdInObjectList(options)
    })
  }

  private makeNewExam (exam: AddExamModel): AddExamModel {
    let questions: QuestionModel[] = []
    if (exam.questions && exam.questions !== []) {
      questions = exam.questions.map((question: QuestionModel) => this.makeNewQuestion(question))
    }
    return {
      name: exam.name,
      description: exam.description,
      type: exam.type,
      questions
    }
  }

  private makeUpdateExam (exam: UpdateExamModel): UpdateExamModel {
    let questions: QuestionModel[] = []
    if (exam.questions && exam.questions !== []) {
      questions = exam.questions.map((question: QuestionModel) => this.makeUpdateQuestion(question))
    }
    return {
      name: exam.name,
      description: exam.description,
      type: exam.type,
      questions
    }
  }

  async add (examData: AddExamModel): Promise<ExamModel> {
    const newExam = this.makeNewExam(examData)
    return await MongoHelper.insertOne(newExam, this.collectionName)
  }

  async update (id: string, examData: UpdateExamModel): Promise<ExamModel> {
    const updateExam = this.makeUpdateExam(examData)
    const result = await MongoHelper.updateOne(id, updateExam, this.collectionName)
    const updatedExam = await MongoHelper.getDocumentById(id, this.collectionName)
    return result.nModified === 1 ? MongoHelper.map(updatedExam) : null
  }

  async get (id: string): Promise<ExamModel> {
    const foundExam = await MongoHelper.getDocumentById(id, this.collectionName)
    return foundExam ? MongoHelper.map(foundExam) : null
  }

  async list (): Promise<ExamModel[]> {
    return MongoHelper.mapList(await MongoHelper.list(this.collectionName))
  }

  async delete (id: string): Promise<any|null> {
    return await MongoHelper.delete(id, this.collectionName)
  }

  async findOneByFilter (filter: any, projection?: any): Promise<any> {
    const foundExam = await MongoHelper.findOneByFilter(filter, this.collectionName, projection)
    return foundExam ? MongoHelper.map(foundExam) : null
  }
}
