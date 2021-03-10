import { ExamModel } from '../../../domain/models/exam/exam-model'
import { UpdateExamModel } from '../../../domain/usecases/exam/update-exam'
import { UpdateExamRepository } from '../../protocols/exam-repository/update-exam-repository'
import { DbUpdateExam } from './db-update-exam'

const makeFakeExam = (): ExamModel => ({
  id: '1234',
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeUpdateExamRepository = (): UpdateExamRepository => {
  class UpdateExamRepositoryStub implements UpdateExamRepository {
    async update (ExamData: UpdateExamModel): Promise<ExamModel> {
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
    await sut.update(makeFakeExam())
    expect(updateSpy).toHaveBeenCalledWith(makeFakeExam())
  })

  test('Should throw if UpdateExamRepository throws', async () => {
    const { sut, updateExamRepositoryStub } = makeSut()
    jest
      .spyOn(updateExamRepositoryStub, 'update')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.update(makeFakeExam())
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Exam on success', async () => {
    const { sut } = makeSut()
    const exam = await sut.update(makeFakeExam())
    expect(exam).toEqual(makeFakeExam())
  })
})
