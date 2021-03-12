import { QuestionModel } from '../../../../domain/models/question/question-model'
import { GetQuestionModel } from '../../../../domain/usecases/question/get-question'
import { GetQuestionRepository } from '../../../protocols/question-repository/get-question-repository'
import { DbGetQuestion } from './db-get-question'

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

const makeFakeGetQuestion = (): GetQuestionModel => ({
  id: '607b9974-4914-44df-81e8-d56ec6a58912'
})

const makeGetQuestionRepository = (): GetQuestionRepository => {
  class GetQuestionRepositoryStub implements GetQuestionRepository {
    async get (questionData: GetQuestionModel): Promise<QuestionModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new GetQuestionRepositoryStub()
}

interface SutTypes {
  sut: DbGetQuestion
  getQuestionRepositoryStub: GetQuestionRepository
}

const makeSut = (): SutTypes => {
  const getQuestionRepositoryStub = makeGetQuestionRepository()
  const sut = new DbGetQuestion(getQuestionRepositoryStub)
  return { sut, getQuestionRepositoryStub }
}

describe('DbGetQuestion Use case', () => {
  test('Should call GetQuestionRepository with correct values', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getQuestionRepositoryStub, 'get')
    await sut.get(makeFakeGetQuestion())
    expect(getSpy).toHaveBeenCalledWith(makeFakeGetQuestion())
  })

  test('Should throw if GetQuestionRepository throws', async () => {
    const { sut, getQuestionRepositoryStub } = makeSut()
    jest
      .spyOn(getQuestionRepositoryStub, 'get')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.get(makeFakeGetQuestion())
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Question on success', async () => {
    const { sut } = makeSut()
    const question = await sut.get(makeFakeGetQuestion())
    expect(question).toEqual(makeFakeQuestion())
  })
})
