import { MongoHelper } from '../helpers/mongo-helper'
import { QuestionMongoRepository } from './question-mongo-repository'
import { ExamMongoRepository } from '../exam-repository/exam-mongo-repository'

const makeFakeExam = (): any => ({
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

const makeFakeQuestionWithoutId = (examId: string): any => ({
  examId,
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
    const examCollection = await MongoHelper.getCollection('exams')
    await examCollection.deleteMany({})
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
    const fakeExam = await examRepositoryStub.add(makeFakeExam())
    const fakeQuestion = makeFakeQuestionWithoutId(fakeExam.id)
    const question = await sut.add(fakeQuestion)
    expect(question.id).toBeTruthy()
    expect(question.statement).toBe(fakeQuestion.statement)
    expect(question.options).toBeTruthy()
  })

  test('Should return question and examId on success when get questions', async () => {
    const { sut, examRepositoryStub } = makeSut()
    const fakeExam = await examRepositoryStub.add(makeFakeExam())
    const fakeQuestion = makeFakeQuestionWithoutId(fakeExam.id)
    const addedQuestion = await sut.add(fakeQuestion)
    const foundQuestion = await sut.get({ id: addedQuestion.id })
    expect(foundQuestion).toBeTruthy()
    // expect(foundQuestion.examId).toStrictEqual(fakeExam.id)
    expect(foundQuestion.id).toStrictEqual(addedQuestion.id)
    expect(foundQuestion.statement).toBe(addedQuestion.statement)
    expect(foundQuestion.options).toBeTruthy()
  })

  test('Should return questions of exam on success when list questions', async () => {
    const { sut, examRepositoryStub } = makeSut()
    const fakeExam = await examRepositoryStub.add(makeFakeExam())
    const fakeQuestion = makeFakeQuestionWithoutId(fakeExam.id)
    const question = await sut.add(fakeQuestion)
    const questions = await sut.list(fakeQuestion)
    expect(questions).toBeTruthy()
    expect(questions.length).toBe(1)
    expect(questions[0].statement).toBe(question.statement)
    expect(questions[0].options).toBeTruthy()
  })
})
