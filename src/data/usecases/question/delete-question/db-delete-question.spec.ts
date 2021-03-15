import { QuestionModel } from '../../../../domain/models/question/question-model'
import { DeleteQuestionModel } from '../../../../domain/usecases/question/delete-question'
import { DeleteQuestionRepository } from '../../../protocols/question-repository/delete-question-repository'
import { DbDeleteQuestion } from './db-delete-question'

const fakeQuestionId = '607b9974-4914-44df-81e8-d56ec6a58912'

const makeFakeQuestion = (): QuestionModel => ({
  id: fakeQuestionId,
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

const makeDeleteQuestionRepository = (): DeleteQuestionRepository => {
  class DeleteQuestionRepositoryStub implements DeleteQuestionRepository {
    async delete (QuestionData: DeleteQuestionModel): Promise<any> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new DeleteQuestionRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteQuestion
  deleteQuestionRepositoryStub: DeleteQuestionRepository
}

const makeSut = (): SutTypes => {
  const deleteQuestionRepositoryStub = makeDeleteQuestionRepository()
  const sut = new DbDeleteQuestion(deleteQuestionRepositoryStub)
  return { sut, deleteQuestionRepositoryStub }
}

describe('DbDeleteQuestion Use case', () => {
  test('Should call DeleteQuestionRepository with correct values', async () => {
    const { sut, deleteQuestionRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteQuestionRepositoryStub, 'delete')
    await sut.delete({ id: fakeQuestionId })
    expect(deleteSpy).toHaveBeenCalledWith({ id: fakeQuestionId })
  })

  test('Should throw if DeleteQuestionRepository throws', async () => {
    const { sut, deleteQuestionRepositoryStub } = makeSut()
    jest
      .spyOn(deleteQuestionRepositoryStub, 'delete')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.delete({ id: fakeQuestionId })
    await expect(promise).rejects.toThrow()
  })

  test('Should return an Response on success', async () => {
    const { sut } = makeSut()
    const deleteResponse = await sut.delete({ id: fakeQuestionId })
    expect(deleteResponse).toBeTruthy()
  })
})
