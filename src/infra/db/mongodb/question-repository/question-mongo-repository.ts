import { QuestionRepository } from '../../../../data/protocols/question-repository/question-repository'
import {
  AddOptionModel,
  AddQuestionModel,
  DeleteQuestionModel,
  GetQuestionModel,
  GetQuestionResponseModel,
  ListQuestionsModel,
  UpdateQuestionModel
} from '../../../../domain/usecases/question'
import { QuestionModel } from '../../../../domain/models/question/question-model'
import { MongoHelper } from '../helpers/mongo-helper'
import { ExamMongoRepository } from '../exam-repository/exam-mongo-repository'
import { ObjectId } from 'mongodb'

export class QuestionMongoRepository implements QuestionRepository {
  private readonly collectionName = 'exams'

  private newQuestion (statement: string, options: AddOptionModel[]): QuestionModel {
    return MongoHelper.addObjectId({
      statement,
      options: MongoHelper.addObjectIdInObjectList(options)
    })
  }

  async add (questionData: AddQuestionModel): Promise<QuestionModel> {
    const { examId, statement, options } = questionData
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.get({ id: examId })
    if (!exam) return null
    const newQuestion = this.newQuestion(statement, options)
    const newExam = MongoHelper.insertObjectInDocumentField(newQuestion, 'questions', exam)
    const updatedExam = await examMongoRepository.update(newExam)
    const lastPosition = updatedExam.questions.length - 1
    return updatedExam.questions[lastPosition]
  }

  async update (questionData: UpdateQuestionModel): Promise<any> {
    return { id: '42' }
  }

  async get (questionData: GetQuestionModel): Promise<GetQuestionResponseModel> {
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.findOneByFilter(
      { questions: { $elemMatch: { id: new ObjectId(questionData.id) } } },
      { projection: { _id: 1, name: 1, questions: 1 } }
    )
    if (!exam) return null
    return Object.assign({}, exam.questions[0], { examId: exam.id, examName: exam.name })
  }

  async list (questionData: ListQuestionsModel): Promise<QuestionModel[]> {
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.get({ id: questionData.examId })
    return exam ? exam.questions : null
  }

  async delete (questionData: DeleteQuestionModel): Promise<any> {
    return { ok: 'ok' }
  }
}
