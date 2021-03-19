import { ExamModel } from '../../../../domain/models/exam-model'
import { DeleteExamRepository } from '../../../protocols/exam-repository/delete-exam-repository'
import { DbDeleteExam } from './db-delete-exam'

const fakeExamId = '6048039ae5a5d3cd29630a1e'

const makeFakeExam = (): ExamModel => ({
  id: fakeExamId,
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeDeleteExamRepository = (): DeleteExamRepository => {
  class DeleteExamRepositoryStub implements DeleteExamRepository {
    async delete (id: string): Promise<any> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new DeleteExamRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteExam
  deleteExamRepositoryStub: DeleteExamRepository
}

const makeSut = (): SutTypes => {
  const deleteExamRepositoryStub = makeDeleteExamRepository()
  const sut = new DbDeleteExam(deleteExamRepositoryStub)
  return { sut, deleteExamRepositoryStub }
}

describe('DbDeleteExam Use case', () => {
  test('Should call DeleteExamRepository with correct values', async () => {
    const { sut, deleteExamRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteExamRepositoryStub, 'delete')
    await sut.delete(fakeExamId)
    expect(deleteSpy).toHaveBeenCalledWith(fakeExamId)
  })

  test('Should throw if DeleteExamRepository throws', async () => {
    const { sut, deleteExamRepositoryStub } = makeSut()
    jest
      .spyOn(deleteExamRepositoryStub, 'delete')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.delete(fakeExamId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an Response on success', async () => {
    const { sut } = makeSut()
    const exam = await sut.delete(fakeExamId)
    expect(exam).toEqual(makeFakeExam())
  })
})
