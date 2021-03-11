import { ExamController } from './exam-controller'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import {
  AddExam,
  AddExamModel,
  DeleteExam,
  DeleteExamModel,
  ExamModel,
  ExamTypeValidator,
  GetExam,
  GetExamModel,
  HttpRequest,
  UpdateExam,
  UpdateExamModel
} from './exam-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import { ListExams } from '../../../domain/usecases/exam/list-exams'

const makeAddExam = (): AddExam => {
  class AddExamStub implements AddExam {
    async add (exam: AddExamModel): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new AddExamStub()
}

const makeUpdateExam = (): UpdateExam => {
  class UpdateExamStub implements UpdateExam {
    async update (exam: UpdateExamModel): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new UpdateExamStub()
}

const makeGetExam = (): GetExam => {
  class GetExamStub implements GetExam {
    async get (exam: GetExamModel): Promise<ExamModel> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new GetExamStub()
}

const makeListExams = (): ListExams => {
  class ListExamsStub implements ListExams {
    async list (): Promise<ExamModel[]> {
      return await new Promise((resolve) => resolve([makeFakeExam()]))
    }
  }
  return new ListExamsStub()
}

const makeDeleteExam = (): DeleteExam => {
  class DeleteExamStub implements DeleteExam {
    async delete (exam: DeleteExamModel): Promise<any> {
      return await new Promise((resolve) => resolve(makeFakeExam()))
    }
  }
  return new DeleteExamStub()
}

const makeExamTypeValidator = (): ExamTypeValidator => {
  class ExamTypeValidatorStub {
    isExamType (type: string): boolean {
      return true
    }
  }
  return new ExamTypeValidatorStub()
}

interface SutTypes {
  sut: ExamController
  addExamStub: AddExam
  examTypeValidatorStub: ExamTypeValidator
  getExamStub: GetExam
  updateExamStub: UpdateExam
  listExamsStub: ListExams
  deleteExamStub: DeleteExam
}

const makeSut = (): SutTypes => {
  const addExamStub = makeAddExam()
  const updateExamStub = makeUpdateExam()
  const examTypeValidatorStub = makeExamTypeValidator()
  const getExamStub = makeGetExam()
  const listExamsStub = makeListExams()
  const deleteExamStub = makeDeleteExam()
  const sut = new ExamController(
    addExamStub,
    examTypeValidatorStub,
    updateExamStub,
    getExamStub,
    listExamsStub,
    deleteExamStub
  )
  return {
    sut,
    addExamStub,
    examTypeValidatorStub,
    updateExamStub,
    getExamStub,
    listExamsStub,
    deleteExamStub
  }
}

const makeFakeExam = (): any => ({
  id: '42',
  name: 'Exam 42',
  description: 'description',
  type: 'ONLINE',
  questions: []
})

const makeFakeRequest = (body: any): HttpRequest => ({
  body
})

// ------------------------------ADD METHOD TESTS------------------------------

describe('Exam Controller add method', () => {
  test('Should return 400 if no name is provided when add exam', async () => {
    const { sut } = makeSut()
    const { id, name, ...fakeExamWithoutName } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutName)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no description is provided when add exam', async () => {
    const { sut } = makeSut()
    const { id, description, ...fakeExamWithoutDescription } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutDescription)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('description'))
    )
  })

  test('Should return 400 if no type is provided when add exam', async () => {
    const { sut } = makeSut()
    const { id, type, ...fakeExamWithoutType } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutType)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('Should return 400 if an invalid type is provided when add exam', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    jest.spyOn(examTypeValidatorStub, 'isExamType').mockReturnValueOnce(false)
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('type')))
  })

  test('Should call ExamTypeValidator with correct type when add exam', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    const isExamTypeSpy = jest.spyOn(examTypeValidatorStub, 'isExamType')
    const fakeRequest = makeFakeRequest(makeFakeExam())
    await sut.add(fakeRequest)
    expect(isExamTypeSpy).toHaveBeenCalledWith('ONLINE')
  })

  test('Should return 500 if ExamTypeValidator throws when add exam', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    jest
      .spyOn(examTypeValidatorStub, 'isExamType')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if AddExam throws', async () => {
    const { sut, addExamStub } = makeSut()
    jest.spyOn(addExamStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const { id, ...fakeExam } = makeFakeExam()
    const httpResponse = await sut.add(makeFakeRequest(fakeExam))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddExam with correct values', async () => {
    const { sut, addExamStub } = makeSut()
    const addSpy = jest.spyOn(addExamStub, 'add')
    const fakeExam = makeFakeExam()
    const { id, ...fakeExamData } = fakeExam
    const httpRequest = makeFakeRequest(fakeExamData)
    await sut.add(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(fakeExamData)
  })

  test('Should return 200 if valid data is provided when add exam', async () => {
    const { sut } = makeSut()
    const { id, ...fakeExam } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExam)
    const httpResponse = await sut.add(fakeRequest)
    const fakeResponseBody = makeFakeExam()
    expect(httpResponse).toEqual(ok(fakeResponseBody))
  })
})

// ------------------------------GET METHOD TESTS------------------------------

describe('Exam Controller get method', () => {
  test('Should return 400 if no id is provided when get exam', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest({})
    const httpResponse = await sut.get(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 500 if GetExam throws', async () => {
    const { sut, getExamStub } = makeSut()
    jest.spyOn(getExamStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.get({ body: { id: '1234' } })
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided when get exam', async () => {
    const { sut } = makeSut()
    const addedExamResponse = await sut.add(makeFakeRequest(makeFakeExam()))
    const getExamResponse = await sut.get({ body: { id: addedExamResponse.body.id } })
    expect(getExamResponse).toEqual(ok(makeFakeExam()))
  })
})

// ------------------------------UPDATE METHOD TESTS------------------------------

describe('Exam Controller update method', () => {
  test('Should return 400 if no id is provided when update exam', async () => {
    const { sut } = makeSut()
    const { id, ...fakeExamWithoutName } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutName)
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 400 if no name is provided when update exam', async () => {
    const { sut } = makeSut()
    const { name, ...fakeExamWithoutName } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutName)
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no description is provided when update exam', async () => {
    const { sut } = makeSut()
    const { description, ...fakeExamWithoutDescription } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutDescription)
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('description'))
    )
  })

  test('Should return 400 if no type is provided when update exam', async () => {
    const { sut } = makeSut()
    const { type, ...fakeExamWithoutType } = makeFakeExam()
    const fakeRequest = makeFakeRequest(fakeExamWithoutType)
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('type')))
  })

  test('Should return 400 if an invalid type is provided when update exam', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    jest.spyOn(examTypeValidatorStub, 'isExamType').mockReturnValueOnce(false)
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('type')))
  })

  test('Should call ExamTypeValidator with correct type when update exam', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    const isExamTypeSpy = jest.spyOn(examTypeValidatorStub, 'isExamType')
    const fakeRequest = makeFakeRequest(makeFakeExam())
    await sut.update(fakeRequest)
    expect(isExamTypeSpy).toHaveBeenCalledWith('ONLINE')
  })

  test('Should return 500 if ExamTypeValidator throws when update exam', async () => {
    const { sut, examTypeValidatorStub } = makeSut()
    jest
      .spyOn(examTypeValidatorStub, 'isExamType')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 500 if UpdateExam throws', async () => {
    const { sut, updateExamStub } = makeSut()
    jest.spyOn(updateExamStub, 'update').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call UpdateExam with correct values', async () => {
    const { sut, updateExamStub } = makeSut()
    const updateSpy = jest.spyOn(updateExamStub, 'update')
    const httpRequest = makeFakeRequest(makeFakeExam())
    await sut.update(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith(makeFakeExam())
  })

  test('Should return 200 if valid data is provided when update exam', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest(makeFakeExam())
    const httpResponse = await sut.update(fakeRequest)
    const fakeResponseBody = makeFakeExam()
    expect(httpResponse).toEqual(ok(fakeResponseBody))
  })
})

// ------------------------------LIST METHOD TESTS------------------------------

describe('Exam Controller list method', () => {
  test('Should return 500 if ListExams throws', async () => {
    const { sut, listExamsStub } = makeSut()
    jest.spyOn(listExamsStub, 'list').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.list()
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided when list exams', async () => {
    const { sut } = makeSut()
    const examList = await sut.list()
    expect(examList).toEqual(ok([makeFakeExam()]))
  })
})

// ------------------------------DELETE METHOD TESTS------------------------------

describe('Exam Controller delete method', () => {
  test('Should return 400 if no id is provided when delete exam', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.delete({ body: {} })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 500 if DeleteExam throws', async () => {
    const { sut, deleteExamStub } = makeSut()
    jest.spyOn(deleteExamStub, 'delete').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.delete({ body: { id: '42' } })
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
