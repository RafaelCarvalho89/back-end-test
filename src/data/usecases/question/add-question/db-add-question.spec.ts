import { QuestionModel } from '../../../../domain/models/question-model'
import { AddQuestionModel } from '../../../../domain/usecases/question/add-question'
import { AddQuestionRepository } from '../../../protocols/question-repository/add-question-repository'
import { DbAddQuestion } from './db-add-question'

const fakeExamId = '6048039ae5a5d3cd29630a1e'
const fakeQuestionId = '6048039ae5a5d3cd29689f23'

const makeFakeOptions = (): any => ([
  {
    key: 'a',
    value: 'viver',
    correct: false
  },
  {
    key: 'b',
    value: 'beber café',
    correct: false
  },
  {
    key: 'c',
    value: 'codar',
    correct: false
  },
  {
    key: 'd',
    value: '42',
    correct: true
  }
])

const makeFakeQuestion = (): any => ({
  examId: fakeExamId,
  id: fakeQuestionId,
  statement: 'Qual o sentido da vida, do universo e de tudo mais?',
  options: makeFakeOptions()
})

const makeFakeQuestionData = (): AddQuestionModel => {
  const { examId, ...fakeQuestionData } = makeFakeQuestion()
  return fakeQuestionData
}

const makeAddQuestionRepository = (): AddQuestionRepository => {
  class AddQuestionRepositoryStub implements AddQuestionRepository {
    async add (examId: string, questionData: AddQuestionModel): Promise<QuestionModel> {
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
    await sut.add(fakeExamId, makeFakeQuestionData())
    expect(addSpy).toHaveBeenCalledWith(fakeExamId, makeFakeQuestionData())
  })

  test('Should throw if AddQuestionRepository throws', async () => {
    const { sut, addQuestionRepositoryStub } = makeSut()
    jest
      .spyOn(addQuestionRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.add(fakeExamId, makeFakeQuestionData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Question on success', async () => {
    const { sut } = makeSut()
    const question = await sut.add(fakeExamId, makeFakeQuestionData())
    expect(question).toEqual(makeFakeQuestion())
  })
})
