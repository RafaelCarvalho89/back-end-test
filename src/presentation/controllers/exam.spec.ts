import { ExamModel } from '../../domain/models/exam'
import { AddExam, AddExamModel } from '../../domain/usecases/add-exam'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok } from '../helpers/http-helper'
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

  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()
    const { description, ...fakeExamWithoutDescription } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutDescription)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
  })

  test('Should return 400 if no type is provided', async () => {
    const { sut } = makeSut()
    const { type, ...fakeExamWithoutType } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutType)
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const fakeExam = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExam)
    const httpResponse = await sut.handle(fakeRequest)    
    expect(httpResponse).toEqual(ok(fakeExam))
  })
})    
