import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

const fakeExamId = '6048039ae5a5d3cd29630a1e'

describe('Exam Routes', () => {
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

  test('Should return an exam on add exam success', async () => {
    await request(app)
      .post('/api/v1/exam')
      .send({
        name: 'Blue Exam',
        description: 'Blue Exam without questions',
        type: 'ONLINE'
      })
      .expect(200)
  })

  test('Should return an exam on get exam success', async () => {
    await request(app).get(`/api/v1/exam/${fakeExamId}`).send().expect(200)
  })

  test('Should return an exam list on list exam success', async () => {
    await request(app).get('/api/v1/exams').send().expect(200)
  })

  test('Should return an exam id on update exam success', async () => {
    await request(app)
      .put(`/api/v1/exam/${fakeExamId}`)
      .send({
        name: 'Blue Exam 2',
        description: 'Blue Exam without questions 2',
        type: 'ONLINE'
      })
      .expect(200)
  })

  test('Should return an response on delete exam success', async () => {
    await request(app)
      .delete(`/api/v1/exam/${fakeExamId}`)
      .send()
      .expect(200)
  })
})
