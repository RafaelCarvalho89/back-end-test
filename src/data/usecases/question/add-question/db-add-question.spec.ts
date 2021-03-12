import { QuestionModel } from '../../../../domain/models/question/question-model'
import { AddQuestionModel } from '../../../../domain/usecases/question/add-question'
import { AddQuestionRepository } from '../../../protocols/question-repository/add-question-repository'
import { DbAddQuestion } from './db-add-question'

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

const makeFakeQuestionData = (): AddQuestionModel => {
  const { examId, ...fakeQuestionData } = makeFakeQuestion()
  return fakeQuestionData
}

const makeAddQuestionRepository = (): AddQuestionRepository => {
  class AddQuestionRepositoryStub implements AddQuestionRepository {
    async add (questionData: AddQuestionModel): Promise<QuestionModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new AddQuestionRepositoryStub()
}

interface SutTypes {
  sut: DbAddQuestion
  addQuestionRepositoryStub: AddQuestionRepository
}

const makeSut = (): SutTypes => {
  const addQuestionRepositoryStub = makeAddQuestionRepository()
  const sut = new DbAddQuestion(addQuestionRepositoryStub)
  return { sut, addQuestionRepositoryStub }
}

describe('DbAddQuestion Use case', () => {
  test('Should call AddQuestionRepository with correct values', async () => {
    const { sut, addQuestionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addQuestionRepositoryStub, 'add')
    await sut.add(makeFakeQuestionData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeQuestionData())
  })

  test('Should throw if AddQuestionRepository throws', async () => {
    const { sut, addQuestionRepositoryStub } = makeSut()
    jest
      .spyOn(addQuestionRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.add(makeFakeQuestionData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Question on success', async () => {
    const { sut } = makeSut()
    const question = await sut.add(makeFakeQuestionData())
    expect(question).toEqual(makeFakeQuestion())
  })
})
