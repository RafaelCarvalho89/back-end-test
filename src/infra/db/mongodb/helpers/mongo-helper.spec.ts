import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let examCollection = await sut.getCollection('exams')
    expect(examCollection).toBeTruthy()
    await sut.disconnect()
    examCollection = await sut.getCollection('exams')
    expect(examCollection).toBeTruthy()
  })
})
