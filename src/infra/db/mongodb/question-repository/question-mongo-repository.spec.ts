import { MongoHelper } from '../helpers/mongo-helper'
import { QuestionMongoRepository } from './question-mongo-repository'
import { ExamMongoRepository } from '../exam-repository/exam-mongo-repository'

const makeFakeExam = (): any => ({
  name: 'Prova AZUL',
  description: 'Prova AZUL 2021',
  type: 'ONLINE'
})

const makeFakeOptions = (): any => ([
  {
    key: 'a',
    value: 'viver',
    correct: false
  },
  {
    key: 'b',
    value: 'codar',
    correct: false
  },
  {
    key: 'c',
    value: '42',
    correct: true
  }
])

const makeFakeUpdatedOptions = (): any => ([
  {
    key: 'a',
    value: 'viver - UPDATED',
    correct: false
  },
  {
    key: 'b',
    value: '42 - UPDATED',
    correct: true
  }
])

const makeFakeQuestionWithoutId = (examId: string): any => ({
  examId,
  statement: 'Qual o sentido da vida, do universo e de tudo mais?',
  options: makeFakeOptions()
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
    expect(foundQuestion.examId).toStrictEqual(fakeExam.id)
    expect(foundQuestion.examName).toStrictEqual(fakeExam.name)
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

  test('Should return question on success when update question', async () => {
    const { sut, examRepositoryStub } = makeSut()
    const fakeExam = await examRepositoryStub.add(makeFakeExam())
    const fakeQuestion = makeFakeQuestionWithoutId(fakeExam.id)
    const addedQuestion = await sut.add(fakeQuestion)
    const updatedOptions = makeFakeUpdatedOptions()
    const updatedStatement = 'STATEMENT UPDATED'
    const updatedQuestion = await sut.update({
      id: addedQuestion.id,
      statement: updatedStatement,
      options: updatedOptions
    })
    expect(updatedQuestion).toBeTruthy()
    expect(updatedQuestion.id).toStrictEqual(addedQuestion.id)
    expect(updatedQuestion.statement).toBe(updatedStatement)
    expect(updatedQuestion.options).toBeTruthy()
  })

  test('Should return an Response on success when delete Question', async () => {
    const { sut, examRepositoryStub } = makeSut()
    const fakeExam = await examRepositoryStub.add(makeFakeExam())
    const fakeQuestion = makeFakeQuestionWithoutId(fakeExam.id)
    await sut.add(fakeQuestion)
    await sut.add(fakeQuestion)
    await sut.add(fakeQuestion)
    await sut.add(fakeQuestion)
    const addedQuestion = await sut.add(fakeQuestion)
    const deleteResponse = await sut.delete({ id: addedQuestion.id })
    expect(deleteResponse).toBeTruthy()
    expect(deleteResponse.questions).toBeTruthy()
    expect(deleteResponse.id).toBeTruthy()
    expect(deleteResponse.name).toBe(fakeExam.name)
    expect(deleteResponse.description).toBe(fakeExam.description)
    expect(deleteResponse.type).toBe(fakeExam.type)
    // expect(deleteResponse.questions).(fakeQuestion)
  })
})
