import { MongoHelper } from '../helpers/mongo-helper'
import { ExamMongoRepository } from './exam-mongo-repository'

const makeFakeExam = (): any => ({
  name: 'name',
  description: 'description',
  type: 'ONLINE'
})

describe('Exam Mongo Repository', () => {
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

  const makeSut = (): ExamMongoRepository => {
    return new ExamMongoRepository()
  }

  test('Should return an exam on success when add Exam', async () => {
    const sut = makeSut()
    const fakeExam = (makeFakeExam())
    const exam = await sut.add(fakeExam)
    expect(exam).toBeTruthy()
    expect(exam.id).toBeTruthy()
    expect(exam.name).toBe(fakeExam.name)
    expect(exam.description).toBe(fakeExam.description)
    expect(exam.type).toBe(fakeExam.type)
  })

  test('Should return an updated exam on success when update Exam', async () => {
    const sut = makeSut()
    const fakeExam = (makeFakeExam())
    const addedExam = await sut.add(fakeExam)
    const updatedExam = await sut.update(addedExam.id, {
      name: 'UPDATED Name',
      description: 'UPDATED description',
      type: 'OFFLINE',
      questions: []
    })
    expect(updatedExam).toBeTruthy()
    expect(updatedExam.id).toBeTruthy()
    expect(updatedExam.name).toBe('UPDATED Name')
    expect(updatedExam.description).toBe('UPDATED description')
    expect(updatedExam.type).toBe('OFFLINE')
    expect(updatedExam.questions).toEqual([])
  })

  test('Should return an exam on success when get Exam', async () => {
    const sut = makeSut()
    const fakeExam = (makeFakeExam())
    const addedExam = await sut.add(fakeExam)
    const examFound = await sut.get(addedExam.id)
    expect(examFound).toBeTruthy()
    expect(examFound.id).toEqual(addedExam.id)
    expect(examFound.name).toBe('name')
    expect(examFound.description).toBe('description')
    expect(examFound.type).toBe('ONLINE')
  })

  test('Should return an Exam List on success when list exams', async () => {
    const sut = makeSut()
    const fakeExam = (makeFakeExam())
    const addedExam = await sut.add(fakeExam)
    const examList = await sut.list()
    expect(examList).toBeTruthy()
    expect(examList[0]).toEqual(addedExam)
  })

  test('Should return an Response on success when delete Exam', async () => {
    const sut = makeSut()
    const fakeExam = (makeFakeExam())
    const addedExam = await sut.add(fakeExam)
    const deleteResponse = await sut.delete(addedExam.id)
    expect(deleteResponse).toBeTruthy()
    expect(deleteResponse).toEqual({ delete: 'ok' })
  })
})
