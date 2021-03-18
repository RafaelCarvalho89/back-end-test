import { ExamModel } from '../../../../domain/models/exam/exam-model'
import { GetExamRepository } from '../../../protocols/exam-repository/get-exam-repository'
import { DbGetExam } from './db-get-exam'

const fakeExamId = '6048039ae5a5d3cd29630a1e'

const makeFakeExam = (): ExamModel => ({
  id: fakeExamId,
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeGetExamRepository = (): GetExamRepository => {
  class GetExamRepositoryStub implements GetExamRepository {
    async get (id: string): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new GetExamRepositoryStub()
}

interface SutTypes {
  sut: DbGetExam
  getExamRepositoryStub: GetExamRepository
}

const makeSut = (): SutTypes => {
  const getExamRepositoryStub = makeGetExamRepository()
  const sut = new DbGetExam(getExamRepositoryStub)
  return { sut, getExamRepositoryStub }
}

describe('DbGetExam Use case', () => {
  test('Should call GetExamRepository with correct values', async () => {
    const { sut, getExamRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(getExamRepositoryStub, 'get')
    await sut.get(fakeExamId)
    expect(getSpy).toHaveBeenCalledWith(fakeExamId)
  })

  test('Should throw if GetExamRepository throws', async () => {
    const { sut, getExamRepositoryStub } = makeSut()
    jest
      .spyOn(getExamRepositoryStub, 'get')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.get(fakeExamId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Exam on success', async () => {
    const { sut } = makeSut()
    const exam = await sut.get(fakeExamId)
    expect(exam).toEqual(makeFakeExam())
  })
})
