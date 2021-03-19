import { QuestionModel } from '../../../../domain/models/question-model'
import { UpdateQuestionModel } from '../../../../domain/usecases/question/update-question'
import { UpdateQuestionRepository } from '../../../protocols/question-repository/update-question-repository'
import { DbUpdateQuestion } from './db-update-question'

const makeFakeQuestion = (): any => ({
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

const makeUpdateQuestionRepository = (): UpdateQuestionRepository => {
  class UpdateQuestionRepositoryStub implements UpdateQuestionRepository {
    async update (questionData: UpdateQuestionModel): Promise<QuestionModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new UpdateQuestionRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateQuestion
  updateQuestionRepositoryStub: UpdateQuestionRepository
}

const makeSut = (): SutTypes => {
  const updateQuestionRepositoryStub = makeUpdateQuestionRepository()
  const sut = new DbUpdateQuestion(updateQuestionRepositoryStub)
  return { sut, updateQuestionRepositoryStub }
}

describe('DbUpdateQuestion Use case', () => {
  test('Should call UpdateQuestionRepository with correct values', async () => {
    const { sut, updateQuestionRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateQuestionRepositoryStub, 'update')
    await sut.update(makeFakeQuestion())
    expect(updateSpy).toHaveBeenCalledWith(makeFakeQuestion())
  })

  test('Should throw if UpdateQuestionRepository throws', async () => {
    const { sut, updateQuestionRepositoryStub } = makeSut()
    jest
      .spyOn(updateQuestionRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.update(makeFakeQuestion())
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Question on success', async () => {
    const { sut } = makeSut()
    const question = await sut.update(makeFakeQuestion())
    expect(question).toEqual(makeFakeQuestion())
  })
})
