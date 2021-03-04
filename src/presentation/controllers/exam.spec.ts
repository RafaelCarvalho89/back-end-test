import { Exam } from '../../domain/models/exam'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest } from '../protocols/http'
import { ExamController } from './exam'

interface SutTypes {
  sut: ExamController
}

const makeSut = (): SutTypes => {
  const sut = new ExamController()
  return { sut }
}

const makeFakeExam = (): Exam => ({
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeFakeRequest = (body: any): HttpRequest => ({
  body
})

describe('Exam Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const { name, ...fakeExamWithoutName } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutName)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
