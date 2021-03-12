import { MongoHelper } from '../helpers/mongo-helper'
import { QuestionMongoRepository } from './question-mongo-repository'
import { ExamMongoRepository } from '../exam-repository/exam-mongo-repository'

const fakeExamId = '607b9974-4914-44df-81e8-d56ec6a589bf'
const fakeQuestionId = '607b9974-4914-44df-81e8-d56ec6a58912'

const makeFakeExam = (): any => ({
  _id: fakeExamId,
  name: 'Test',
  description: 'Exam for question test',
  type: 'ONLINE'
})

const makeFakeQuestion = (): any => ({
  examId: fakeExamId,
  id: fakeQuestionId,
  statement: 'Qual o sentido da vida, do universo e de tudo mais?',
  options: [
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58951',
      key: 'a',
      value: 'viver',
      correct: false
    },
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58952',
      key: 'b',
      value: 'beber café',
      correct: false
    },
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58953',
      key: 'c',
      value: 'codar',
      correct: false
    },
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58954',
      key: 'd',
      value: '42',
      correct: true
    }
  ]
})

const makeFakeQuestionData = (): any => {
  const { id, ...fakeQuestionData } = makeFakeQuestion()
  return fakeQuestionData
}

describe('Question Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const questionCollection = await MongoHelper.getCollection('questions')
    await questionCollection.deleteMany({})
  })

  interface SutTypes {
    sut: QuestionMongoRepository
    examRepositoryStub: ExamMongoRepository
  }

  const makeSut = (): SutTypes => {
    const sut = new QuestionMongoRepository()
    const examRepositoryStub = new ExamMongoRepository()
    return { sut, examRepositoryStub }
  }

  test('Should return ok on success when add Question', async () => {
    const { sut, examRepositoryStub } = makeSut()
    await examRepositoryStub.add(makeFakeExam())
    const { ok } = await sut.add(makeFakeQuestionData())
    expect(ok).toBeTruthy()
    expect({ ok }).toEqual({ ok: 1 })
  })
})
