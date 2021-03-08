import request from 'supertest'
import app from '../config/app'

describe('Exam Routes', () => {
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
