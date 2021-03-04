import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { ExamController } from './exam'

interface SutTypes {
  sut: ExamController
}

const makeSut = (): SutTypes => {
  const sut = new ExamController()
  return { sut }
}

describe('Exam Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        description: 'description',
        type: 'ONLINE',
        questions: []
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
