import { MongoHelper } from '../helpers/mongo-helper'
import { ExamMongoRepository } from './exam-mongo-repository'

describe('Exam Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const examCollection = MongoHelper.getCollection('exams')
    await examCollection.deleteMany({})
  })

  const makeSut = (): ExamMongoRepository => {
    return new ExamMongoRepository()
  }

  test('Should return an exam on success when add Exam', async () => {
    const sut = makeSut()
    const exam = await sut.add({
      name: 'name',
      description: 'description',
      type: 'ONLINE',
      questions: []
    })
    expect(exam).toBeTruthy()
    expect(exam.id).toBeTruthy()
    expect(exam.name).toBe('name')
    expect(exam.description).toBe('description')
    expect(exam.type).toBe('ONLINE')
  })

  test('Should return an exam id on success when update Exam', async () => {
    const sut = makeSut()
    const updatedExam = await sut.update({
      id: '6048039ae5a5d3cd29630a1e',
      name: 'Updated Name',
      description: 'Updated description',
      type: 'ONLINE',
      questions: []
    })
    expect(updatedExam).toBeTruthy()
    expect(updatedExam.id).toBe('6048039ae5a5d3cd29630a1e')
  })

  test('Should return an exam on success when get Exam', async () => {
    const sut = makeSut()
    const addedExam = await sut.add({
      name: 'name',
      description: 'description',
      type: 'ONLINE',
      questions: []
    })
    const examFound = await sut.get({ id: addedExam.id })
    expect(examFound).toBeTruthy()
    expect(examFound.id).toEqual(addedExam.id)
    expect(examFound.name).toBe('name')
    expect(examFound.description).toBe('description')
    expect(examFound.type).toBe('ONLINE')
  })

  test('Should return an Exam List on success when list exams', async () => {
    const sut = makeSut()
    const addedExam = await sut.add({
      name: 'name',
      description: 'description',
      type: 'ONLINE',
      questions: []
    })
    const examList = await sut.list()
    expect(examList).toBeTruthy()
    expect(examList[0]).toEqual(addedExam)
  })

  test('Should return an Response on success when delete Exam', async () => {
    const sut = makeSut()
    const addedExam = await sut.add({
      name: 'name',
      description: 'description',
      type: 'ONLINE',
      questions: []
    })
    const deleteResponse = await sut.delete({ id: addedExam.id })
    expect(deleteResponse).toBeTruthy()
    expect(deleteResponse).toEqual({ ok: 1 })
  })
})
