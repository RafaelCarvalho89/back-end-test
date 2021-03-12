import { QuestionController } from './question-controller'
import { MissingParamError, ServerError } from '../../errors'
import {
  AddQuestion,
  AddQuestionModel,
  QuestionModel,
  HttpRequest
} from './question-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

const makeAddQuestion = (): AddQuestion => {
  class AddQuestionStub implements AddQuestion {
    async add (question: AddQuestionModel): Promise<QuestionModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new AddQuestionStub()
}

interface SutTypes {
  sut: QuestionController
  addQuestionStub: AddQuestion
}

const makeSut = (): SutTypes => {
  const addQuestionStub = makeAddQuestion()
  const sut = new QuestionController(addQuestionStub)
  return {
    sut,
    addQuestionStub
  }
}

const makeFakeQuestion = (): any => ({
  examId: '607b9974-4914-44df-81e8-d56ec6a589bf',
  id: '607b9974-4914-44df-81e8-d56ec6a58912',
  statement: 'Qual o sentido da vida, do universo e de tudo mais?',
  options: [
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58951',
      key: 'a',
      value: 'viver',
      correct: false
    },
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58952',
      key: 'b',
      value: 'beber café',
      correct: false
    },
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58953',
      key: 'c',
      value: 'codar',
      correct: false
    },
    {
      id: '607b9974-4914-44df-81e8-d56ec6a58954',
      key: 'd',
      value: '42',
      correct: true
    }
  ]
})

const makeFakeRequest = (body: any): HttpRequest => ({
  body
})

// ------------------------------ADD METHOD TESTS------------------------------

describe('Question Controller add method', () => {
  test('Should return 400 if no examId is provided when add question', async () => {
    const { sut } = makeSut()
    const { id, examId, ...fakeQuestionWithoutExamId } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutExamId)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('examId')))
  })

  test('Should return 400 if no statement is provided when add question', async () => {
    const { sut } = makeSut()
    const { id, statement, ...fakeQuestionWithoutDescription } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutDescription)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('statement'))
    )
  })

  test('Should return 400 if no options is provided when add question', async () => {
    const { sut } = makeSut()
    const { id, options, ...fakeQuestionWithoutType } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutType)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('options')))
  })

  test('Should return 500 if AddQuestion throws', async () => {
    const { sut, addQuestionStub } = makeSut()
    jest.spyOn(addQuestionStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const { id, ...fakeQuestion } = makeFakeQuestion()
    const httpResponse = await sut.add(makeFakeRequest(fakeQuestion))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddQuestion with correct values', async () => {
    const { sut, addQuestionStub } = makeSut()
    const addSpy = jest.spyOn(addQuestionStub, 'add')
    const fakeQuestion = makeFakeQuestion()
    const { id, ...fakeQuestionData } = fakeQuestion
    const httpRequest = makeFakeRequest(fakeQuestionData)
    await sut.add(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(fakeQuestionData)
  })

  test('Should return 200 if valid data is provided when add question', async () => {
    const { sut } = makeSut()
    const { id, ...fakeQuestion } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestion)
    const httpResponse = await sut.add(fakeRequest)
    const fakeResponseBody = makeFakeQuestion()
    expect(httpResponse).toEqual(ok(fakeResponseBody))
  })
})
