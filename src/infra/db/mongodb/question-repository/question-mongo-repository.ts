import { QuestionRepository } from '../../../../data/protocols/question-repository/question-repository'
import {
  AddQuestionModel,
  GetQuestionResponseModel,
  UpdateQuestionModel,
  UpdateQuestionResponseModel
} from '../../../../domain/usecases/question'
import {
  DataOptionModel,
  OptionModel,
  QuestionModel
} from '../../../../domain/models/question-model'
import { MongoHelper } from '../helpers/mongo-helper'
import { ExamMongoRepository } from '../exam-repository/exam-mongo-repository'
import { ObjectId } from 'mongodb'

export class QuestionMongoRepository implements QuestionRepository {
  private readonly collectionName = 'exams'

  private newQuestion (
    statement: string,
    options: DataOptionModel[]
  ): QuestionModel {
    return MongoHelper.addObjectId({
      statement,
      options: MongoHelper.addObjectIdInObjectList(options)
    })
  }

  private updateQuestion (
    id: string,
    statement: string,
    options: DataOptionModel[]
  ): any {
    return {
      id: new ObjectId(id),
      statement,
      options: MongoHelper.addObjectIdInObjectList(options)
    }
  }

  private makeRandomOptions (options: OptionModel[]): OptionModel[] {
    const optionRange: any[] = options.map((option: OptionModel) => option.key)

    const randomOptions: OptionModel[] = []
    const rangeLength = optionRange.length
    for (let index = 0; index < rangeLength; index++) {
      const randomNumber = Math.floor(Math.random() * optionRange.length)
      options[index].key = optionRange[randomNumber]
      randomOptions.push(options[index])
      optionRange.splice(randomNumber, 1)
    }

    return randomOptions.sort((reference, compare) => {
      return reference.key > compare.key
        ? 1
        : compare.key > reference.key
          ? -1
          : 0
    })
  }

  async add (examId: string, questionData: AddQuestionModel): Promise<QuestionModel> {
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.get(examId)
    if (!exam) return null
    const newQuestion = this.newQuestion(questionData.statement, questionData.options)
    const newExam = MongoHelper.insertObjectInDocumentField(
      newQuestion,
      'questions',
      exam
    )
    const updatedExam = await examMongoRepository.update(exam.id, newExam)
    const lastPosition = updatedExam.questions.length - 1
    return updatedExam.questions[lastPosition]
  }

  async update (
    id: string,
    questionData: UpdateQuestionModel
  ): Promise<UpdateQuestionResponseModel> {
    const updateQuestion = this.updateQuestion(
      id,
      questionData.statement,
      questionData.options
    )
    const result = await MongoHelper.updateOneByFilter(
      { questions: { $elemMatch: { id: new ObjectId(id) } } },
      { 'questions.$': updateQuestion },
      this.collectionName
    )
    if (!result.nModified) return null
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.findOneByFilter(
      { questions: { $elemMatch: { id: new ObjectId(id) } } },
      { projection: { _id: 1, name: 1, questions: 1 } }
    )
    const updatedQuestion = exam.questions.find(
      (question: any) =>
        JSON.stringify(question.id) === JSON.stringify(id)
    )
    return Object.assign({}, updatedQuestion, {
      examId: exam._id,
      examName: exam.name
    })
  }

  async get (id: string): Promise<GetQuestionResponseModel> {
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.findOneByFilter(
      { questions: { $elemMatch: { id: new ObjectId(id) } } },
      { projection: { _id: 1, name: 1, questions: 1 } }
    )
    if (!exam) return null
    const foundQuestion = exam.questions.find(
      (question: any) =>
        JSON.stringify(question.id) === JSON.stringify(id)
    )
    return Object.assign({}, foundQuestion, {
      examId: exam.id,
      examName: exam.name
    })
  }

  async list (examId: string): Promise<QuestionModel[]> {
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.get(examId)

    if (!exam) return null
    const questionsWithRandomOptions: QuestionModel[] = []
    for (const question of exam.questions) {
      question.options = this.makeRandomOptions(question.options)
      questionsWithRandomOptions.push(question)
    }

    return questionsWithRandomOptions
  }

  async delete (idForDelete: string): Promise<any> {
    const examMongoRepository = new ExamMongoRepository()
    const exam = await examMongoRepository.findOneByFilter({
      questions: { $elemMatch: { id: new ObjectId(idForDelete) } }
    })

    if (!exam) return null
    const indexForDelete = exam.questions.findIndex(
      (question: QuestionModel) =>
        JSON.stringify(question.id) === JSON.stringify(idForDelete)
    )

    exam.questions.splice(indexForDelete, 1)
    const { id, ...examDataForUpdate } = exam
    return await examMongoRepository.update(id, examDataForUpdate)
  }
}
