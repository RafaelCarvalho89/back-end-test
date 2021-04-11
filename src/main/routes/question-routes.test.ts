import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

const fakeExamId = '604de08e5f3e114605efbfec'
const fakeQuestionId = '604e5be11a78573cb23a01a8'

const fakeOptions = [
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
]

const fakeUpdateOptions = [
  {
    key: 'a',
    value: 'viver - UPDATED',
    correct: false
  },
  {
    key: 'd',
    value: '42 - UPDATED',
    correct: true
  }
]

const fakeQuestion = {
  statement: 'Qual o sentido da vida, do universo e de tudo mais?',
  options: fakeOptions
}

const fakeUpdateQuestion = {
  id: fakeQuestionId,
  statement: 'Qual o sentido da vida? - UPDATE',
  options: fakeUpdateOptions
}

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
      .post(`/api/v1/exam/${fakeExamId}/question`)
      .send(fakeQuestion)
      .expect(200)
  })

  test('Should return question on get success', async () => {
    await request(app)
      .get(`/api/v1/exam/question/${fakeQuestionId}`)
      .send()
      .expect(200)
  })

  test('Should return questions on list success', async () => {
    await request(app)
      .get(`/api/v1/exam/${fakeExamId}/questions`)
      .send()
      .expect(200)
  })

  test('Should return question on update success', async () => {
    await request(app)
      .put('/api/v1/question/update')
      .send(fakeUpdateQuestion)
      .expect(200)
  })

  test('Should return exam without question on delete question success', async () => {
    await request(app)
      .delete(`/api/v1/exam/question/${fakeQuestionId}`)
      .send()
      .expect(200)
  })
})
