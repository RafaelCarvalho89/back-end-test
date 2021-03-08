import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Exam Routes', () => {
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

  test('Should return an exam on success', async () => {
    await request(app)
      .post('/api/exam')
      .send({
        name: 'Blue Exam',
        description: 'Exam without questions',
        type: 'ONLINE'
      })
      .expect(200)
  })
})
