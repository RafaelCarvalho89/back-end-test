import { ExamModel } from '../../../../domain/models/exam-model'
import { ListExamsRepository } from '../../../protocols/exam-repository/list-exams-repository'
import { DbListExams } from './db-list-exams'

const makeFakeExam = (): ExamModel => ({
  id: '6048039ae5a5d3cd29630a1e',
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeListExamsRepository = (): ListExamsRepository => {
  class ListExamsRepositoryStub implements ListExamsRepository {
    async list (): Promise<ExamModel[]> {
      return await new Promise((resolve) => resolve([makeFakeExam()]))
    }
  }
  return new ListExamsRepositoryStub()
}

interface SutTypes {
  sut: DbListExams
  listExamsRepositoryStub: ListExamsRepository
}

const makeSut = (): SutTypes => {
  const listExamsRepositoryStub = makeListExamsRepository()
  const sut = new DbListExams(listExamsRepositoryStub)
  return { sut, listExamsRepositoryStub }
}

describe('DbListExams Use case', () => {
  test('Should throw if ListExamsRepository throws', async () => {
    const { sut, listExamsRepositoryStub } = makeSut()
    jest
      .spyOn(listExamsRepositoryStub, 'list')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.list()
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Exam List on success', async () => {
    const { sut } = makeSut()
    const exam = await sut.list()
    expect(exam).toEqual([makeFakeExam()])
  })
})
