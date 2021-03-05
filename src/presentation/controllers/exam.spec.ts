import { ExamModel } from '../../domain/models/exam'
import { AddExam, AddExamModel } from '../../domain/usecases/add-exam'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { HttpRequest } from '../protocols/http'
import { ExamController } from './exam'

const makeAddExam = (): AddExam => {
  class AddExamStub implements AddExam {
    async add (exam: AddExamModel): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new AddExamStub()
}

interface SutTypes {
  sut: ExamController
  addExamStub: AddExam
}

const makeSut = (): SutTypes => {
  const addExamStub = makeAddExam()
  const sut = new ExamController(addExamStub)
  return { sut, addExamStub }
}

const makeFakeExam = (): ExamModel => ({
  id: 'id',
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
    const { id, name, ...fakeExamWithoutName } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutName)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const { id, description, ...fakeExamWithoutDescription } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutDescription)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('description'))
    )
  })

  test('Should return 400 if no type is provided', async () => {
    const { sut } = makeSut()
    const { id, type, ...fakeExamWithoutType } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutType)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('Should return 500 if AddExam throws', async () => {
    const { sut, addExamStub } = makeSut()
    jest.spyOn(addExamStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const { id, ...fakeExam } = makeFakeExam()
    const httpResponse = await sut.handle(makeFakeRequest(fakeExam))
    expect(httpResponse).toEqual(serverError(new Error('Internal Server Error')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const { id, ...fakeExam } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExam)
    const httpResponse = await sut.handle(fakeRequest)
    const fakeResponseBody = makeFakeExam()
    expect(httpResponse).toEqual(ok(fakeResponseBody))
  })
})
