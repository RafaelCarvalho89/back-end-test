import { ExamModel } from '../../../domain/models/exam/exam-model'
import { AddExamModel } from '../../../domain/usecases/exam/add-exam'
import { AddExamRepository } from '../../protocols/exam-repository/add-exam-repository'
import { DbAddExam } from './db-add-exam'

const makeFakeExam = (): ExamModel => ({
  id: 'id',
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeFakeExamData = (): AddExamModel => ({
  name: 'name',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeAddExamRepository = (): AddExamRepository => {
  class AddExamRepositoryStub implements AddExamRepository {
    async add (ExamData: AddExamModel): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new AddExamRepositoryStub()
}

interface SutTypes {
  sut: DbAddExam
  addExamRepositoryStub: AddExamRepository
}

const makeSut = (): SutTypes => {
  const addExamRepositoryStub = makeAddExamRepository()
  const sut = new DbAddExam(addExamRepositoryStub)
  return { sut, addExamRepositoryStub }
}

describe('DbAddExam Use case', () => {
  test('Should call AddExamRepository with correct values', async () => {
    const { sut, addExamRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addExamRepositoryStub, 'add')
    await sut.add(makeFakeExamData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'name',
      description: 'description',
      type: 'ONLINE',
      questions: []
    })
  })

  test('Should throw if AddExamRepository throws', async () => {
    const { sut, addExamRepositoryStub } = makeSut()
    jest
      .spyOn(addExamRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const promise = sut.add(makeFakeExamData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return and Exam on success', async () => {
    const { sut } = makeSut()
    const exam = await sut.add(makeFakeExamData())
    expect(exam).toEqual(makeFakeExam())
  })
})
