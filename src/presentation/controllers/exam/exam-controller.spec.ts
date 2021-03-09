import { ExamController } from './exam-controller'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { AddExam, AddExamModel, ExamModel, ExamTypeValidator, HttpRequest } from './exam-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

const makeAddExam = (): AddExam => {
  class AddExamStub implements AddExam {
    async add (exam: AddExamModel): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new AddExamStub()
}

const makeExamTypeValidator = (): ExamTypeValidator => {
  class ExamTypeValidatorStub {
    isExamType (type: string): boolean {
      return true
    }
  }
  return new ExamTypeValidatorStub()
}

interface SutTypes {
  sut: ExamController
  addExamStub: AddExam
  examTypeValidatorStub: ExamTypeValidator
}

const makeSut = (): SutTypes => {
  const addExamStub = makeAddExam()
  const examTypeValidatorStub = makeExamTypeValidator()
  const sut = new ExamController(addExamStub, examTypeValidatorStub)
  return { sut, addExamStub, examTypeValidatorStub }
}

const makeFakeExam = (): any => ({
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

  test('Should return 400 if an invalid type is provided', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    jest.spyOn(examTypeValidatorStub, 'isExamType').mockReturnValueOnce(false)
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('type')))
  })

  test('Should call ExamTypeValidator with correct type', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    const isExamTypeSpy = jest.spyOn(examTypeValidatorStub, 'isExamType')
    const fakeRequest = makeFakeRequest(makeFakeExam())
    await sut.handle(fakeRequest)
    expect(isExamTypeSpy).toHaveBeenCalledWith('ONLINE')
  })

  test('Should return 500 if ExamTypeValidator throws', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    jest.spyOn(examTypeValidatorStub, 'isExamType').mockImplementationOnce(() => {
      throw new Error()
    })
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if AddExam throws', async () => {
    const { sut, addExamStub } = makeSut()
    jest.spyOn(addExamStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const { id, ...fakeExam } = makeFakeExam()
    const httpResponse = await sut.handle(makeFakeRequest(fakeExam))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddExam with correct values', async () => {
    const { sut, addExamStub } = makeSut()
    const addSpy = jest.spyOn(addExamStub, 'add')
    const fakeExam = makeFakeExam()
    const { id, ...fakeExamData } = fakeExam
    const httpRequest = makeFakeRequest(fakeExamData)
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(fakeExamData)
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
