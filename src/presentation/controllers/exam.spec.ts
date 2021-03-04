import { ExamController } from './exam'

describe('Exam Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new ExamController()
    const httpRequest = {
      body: {
        description: 'description',
        type: 'ONLINE',
        questions: []
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
