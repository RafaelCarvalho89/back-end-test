import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

const makeFakeOptions = (): any => ([
  {
    key: 'a',
    value: 'viver',
    correct: false
  },
  {
    key: 'b',
    value: 'beber café',
    correct: false
  },
  {
    key: 'c',
    value: 'codar',
    correct: false
  },
  {
    key: 'd',
    value: '42',
    correct: true
  }
])

const makeFakeQuestion = (): any => ({
  examId: '604de08e5f3e114605efbfec',
  statement: 'Qual o sentido da vida, do universo e de tudo mais?',
  options: makeFakeOptions()
})

describe('Question Routes', () => {
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

  test('Should return question on add success', async () => {
    await request(app)
      .post('/api/question/new')
      .send(makeFakeQuestion())
      .expect(200)
  })

  test('Should return questions on list success', async () => {
    await request(app)
      .get('/api/questions')
      .send(makeFakeQuestion())
      .expect(200)
  })
})
