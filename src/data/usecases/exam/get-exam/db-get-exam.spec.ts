import { ExamModel } from '../../../../domain/models/exam/exam-model'
import { GetExamModel } from '../../../../domain/usecases/exam/get-exam'
import { GetExamRepository } from '../../../protocols/exam-repository/get-exam-repository'
import { DbGetExam } from './db-get-exam'

const makeFakeGetExam = (): GetExamModel => ({
  id: '6048039ae5a5d3cd29630a1e'
})

const makeFakeExam = (): ExamModel => ({
  id: '6048039ae5a5d3cd29630a1e',
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeGetExamRepository = (): GetExamRepository => {
  class GetExamRepositoryStub implements GetExamRepository {
    async get (ExamData: GetExamModel): Promise<ExamModel> {
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
    await sut.get(makeFakeGetExam())
    expect(getSpy).toHaveBeenCalledWith(makeFakeGetExam())
  })

  test('Should throw if GetExamRepository throws', async () => {
    const { sut, getExamRepositoryStub } = makeSut()
    jest
      .spyOn(getExamRepositoryStub, 'get')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.get(makeFakeGetExam())
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Exam on success', async () => {
    const { sut } = makeSut()
    const exam = await sut.get(makeFakeGetExam())
    expect(exam).toEqual(makeFakeExam())
  })
})
