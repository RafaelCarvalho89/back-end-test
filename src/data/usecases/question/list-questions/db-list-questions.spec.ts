import { QuestionModel } from '../../../../domain/models/question-model'
import { ListQuestionsRepository } from '../../../protocols/question-repository/list-questions-repository'
import { DbListQuestions } from './db-list-questions'

const fakeExamId = '607b9974-4914-44df-81e8-d56ec6a589bf'

const makeFakeQuestion = (): any => ({
  examId: fakeExamId,
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

const makeListQuestionsRepository = (): ListQuestionsRepository => {
  class ListQuestionsRepositoryStub implements ListQuestionsRepository {
    async list (examId: string): Promise<QuestionModel[]> {
      return await new Promise((resolve) => resolve([makeFakeQuestion()]))
    }
  }
  return new ListQuestionsRepositoryStub()
}

interface SutTypes {
  sut: DbListQuestions
  listQuestionsRepositoryStub: ListQuestionsRepository
}

const makeSut = (): SutTypes => {
  const listQuestionsRepositoryStub = makeListQuestionsRepository()
  const sut = new DbListQuestions(listQuestionsRepositoryStub)
  return { sut, listQuestionsRepositoryStub }
}

describe('DbListQuestions Use case', () => {
  test('Should throw if ListQuestionsRepository throws', async () => {
    const { sut, listQuestionsRepositoryStub } = makeSut()
    jest
      .spyOn(listQuestionsRepositoryStub, 'list')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.list(fakeExamId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Question List on success', async () => {
    const { sut } = makeSut()
    const question = await sut.list(fakeExamId)
    expect(question).toEqual([makeFakeQuestion()])
  })
})
