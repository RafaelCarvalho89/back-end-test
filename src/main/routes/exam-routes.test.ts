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

  test('Should return an exam on add exam success', async () => {
    await request(app)
      .post('/api/exam')
      .send({
        name: 'Blue Exam',
        description: 'Blue Exam without questions',
        type: 'ONLINE'
      })
      .expect(200)
  })

  test('Should return an exam id on update exam success', async () => {
    await request(app)
      .put('/api/exam')
      .send({
        id: '6048039ae5a5d3cd29630a1e',
        name: 'Blue Exam 2',
        description: 'Blue Exam without questions 2',
        type: 'ONLINE'
      })
      .expect(200)
  })
})
