import { MongoHelper } from '../helpers/mongo-helper'
import { QuestionMongoRepository } from './question-mongo-repository'
import { ExamMongoRepository } from '../exam-repository/exam-mongo-repository'

const fakeExamId = '607b9974-4914-44df-81e8-d56ec6a589bf'
// const fakeQuestionId = '607b9974-4914-44df-81e8-d56ec6a58912'

const makeFakeExam = (): any => ({
  _id: fakeExamId,
  name: 'Test',
  description: 'Exam for question test',
  type: 'ONLINE'
})

const makeFakeOptions = (): any => ([
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
    id: '607b9974-4914-44df-81e8-d56ec6a58953',
    key: 'd',
    value: '42',
    correct: true
  }
])

const makeFakeOptionsWithoutId = (): any => {
  const fakeOptions = makeFakeOptions()
  const fakeOptionsWithoutId = []
  for (const option of fakeOptions) {
    const { id, ...optionWithoutId } = option
    fakeOptionsWithoutId.push(optionWithoutId)
  }
  return fakeOptionsWithoutId
}

const makeFakeQuestionWithoutId = (): any => ({
  examId: fakeExamId,
  statement: 'Qual o sentido da vida, do universo e de tudo mais?',
  options: makeFakeOptionsWithoutId()
})

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

  test('Should return question on success when add Question', async () => {
    const { sut, examRepositoryStub } = makeSut()
    await examRepositoryStub.add(makeFakeExam())
    const fakeQuestion = makeFakeQuestionWithoutId()
    const question = await sut.add(fakeQuestion)
    expect(question.id).toBeTruthy()
    expect(question.statement).toBe(fakeQuestion.statement)
    expect(question.options).toBeTruthy()
  })
})
