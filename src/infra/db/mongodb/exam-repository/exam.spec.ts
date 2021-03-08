import { MongoHelper } from '../helpers/mongo-helper'
import { ExamMongoRepository } from './exam'

describe('Exam Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an exam on success', async () => {
    const sut = new ExamMongoRepository()
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
})
