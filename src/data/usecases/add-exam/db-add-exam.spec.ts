import { ExamModel } from '../../../domain/models/exam'
import { AddExamModel } from '../../../domain/usecases/add-exam'
import { AddExamRepository } from '../../protocols/add-exam-repository'
import { DbAddExam } from './db-add-exam'

const makeFakeExam = (): ExamModel => ({
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
})
