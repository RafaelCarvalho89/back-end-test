import { ExamModel } from '../../../../domain/models/exam-model'
import { UpdateExamModel } from '../../../../domain/usecases/exam/update-exam'
import { UpdateExamRepository } from '../../../protocols/exam-repository/update-exam-repository'
import { DbUpdateExam } from './db-update-exam'

const fakeExamId = '6048039ae5a5d3cd29630a1e'

const makeFakeExam = (): ExamModel => ({
  id: '6048039ae5a5d3cd29630a1e',
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const { id, ...fakeUpdateExam } = makeFakeExam()

const makeUpdateExamRepository = (): UpdateExamRepository => {
  class UpdateExamRepositoryStub implements UpdateExamRepository {
    async update (id: string, ExamData: UpdateExamModel): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new UpdateExamRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateExam
  updateExamRepositoryStub: UpdateExamRepository
}

const makeSut = (): SutTypes => {
  const updateExamRepositoryStub = makeUpdateExamRepository()
  const sut = new DbUpdateExam(updateExamRepositoryStub)
  return { sut, updateExamRepositoryStub }
}

describe('DbUpdateExam Use case', () => {
  test('Should call UpdateExamRepository with correct values', async () => {
    const { sut, updateExamRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateExamRepositoryStub, 'update')
    await sut.update(fakeExamId, fakeUpdateExam)
    expect(updateSpy).toHaveBeenCalledWith(fakeExamId, fakeUpdateExam)
  })

  test('Should throw if UpdateExamRepository throws', async () => {
    const { sut, updateExamRepositoryStub } = makeSut()
    jest
      .spyOn(updateExamRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.update(fakeExamId, fakeUpdateExam)
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Exam on success', async () => {
    const { sut } = makeSut()
    const exam = await sut.update(fakeExamId, fakeUpdateExam)
    expect(exam).toEqual(makeFakeExam())
  })
})
