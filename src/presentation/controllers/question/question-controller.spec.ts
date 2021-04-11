import { QuestionController } from './question-controller'
import { MissingParamError, ServerError } from '../../errors'
import {
  AddQuestion,
  AddQuestionModel,
  QuestionModel,
  HttpRequest,
  GetQuestion
} from './question-controller-protocols'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'
import {
  DeleteQuestion,
  GetQuestionResponseModel,
  ListQuestions,
  UpdateQuestion,
  UpdateQuestionModel
} from '../../../domain/usecases/question'

const makeAddQuestion = (): AddQuestion => {
  class AddQuestionStub implements AddQuestion {
    async add (examId: string, addQuestionRequest: AddQuestionModel): Promise<QuestionModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new AddQuestionStub()
}

const makeUpdateQuestion = (): UpdateQuestion => {
  class UpdateQuestionStub implements UpdateQuestion {
    async update (id: string, updateQuestionRequest: UpdateQuestionModel): Promise<QuestionModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new UpdateQuestionStub()
}

const makeGetQuestion = (): GetQuestion => {
  class GetQuestionStub implements GetQuestion {
    async get (id: string): Promise<GetQuestionResponseModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new GetQuestionStub()
}

const makeListQuestions = (): ListQuestions => {
  class ListQuestionsStub implements ListQuestions {
    async list (examId: string): Promise<QuestionModel[]> {
      return await new Promise((resolve) => resolve([makeFakeQuestion()]))
    }
  }
  return new ListQuestionsStub()
}

const makeDeleteQuestion = (): DeleteQuestion => {
  class DeleteQuestionStub implements DeleteQuestion {
    async delete (id: string): Promise<any> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new DeleteQuestionStub()
}

interface SutTypes {
  sut: QuestionController
  addQuestionStub: AddQuestion
  getQuestionStub: GetQuestion
  updateQuestionStub: UpdateQuestion
  listQuestionsStub: ListQuestions
  deleteQuestionStub: DeleteQuestion
}

const makeSut = (): SutTypes => {
  const addQuestionStub = makeAddQuestion()
  const getQuestionStub = makeGetQuestion()
  const updateQuestionStub = makeUpdateQuestion()
  const listQuestionsStub = makeListQuestions()
  const deleteQuestionStub = makeDeleteQuestion()
  const sut = new QuestionController(
    addQuestionStub,
    getQuestionStub,
    updateQuestionStub,
    listQuestionsStub,
    deleteQuestionStub
  )
  return {
    sut,
    addQuestionStub,
    getQuestionStub,
    updateQuestionStub,
    listQuestionsStub,
    deleteQuestionStub
  }
}

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

const makeFakeRequest = (body: any, params?: any): HttpRequest => ({
  body,
  params
})

// ------------------------------ADD METHOD TESTS------------------------------

describe('Question Controller add method', () => {
  test('Should return 400 if no examId is provided when add question', async () => {
    const { sut } = makeSut()
    const { examId, id, ...fakeQuestionWithoutExamId } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutExamId, { id: null })
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('examId')))
  })

  test('Should return 400 if no statement is provided when add question', async () => {
    const { sut } = makeSut()
    const {
      examId,
      id,
      statement,
      ...fakeQuestionWithoutStatement
    } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutStatement, { id: examId })
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('statement')))
  })

  test('Should return 400 if no options is provided when add question', async () => {
    const { sut } = makeSut()
    const { examId, id, options, ...fakeQuestionWithoutOptions } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutOptions, { id: examId })
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('options')))
  })

  test('Should return 500 if AddQuestion throws', async () => {
    const { sut, addQuestionStub } = makeSut()
    jest.spyOn(addQuestionStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const { examId, id, ...fakeQuestion } = makeFakeQuestion()
    const httpResponse = await sut.add(makeFakeRequest(fakeQuestion, { id: examId }))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddQuestion with correct values', async () => {
    const { sut, addQuestionStub } = makeSut()
    const addSpy = jest.spyOn(addQuestionStub, 'add')
    const fakeQuestion = makeFakeQuestion()
    const { examId, id, ...fakeQuestionData } = fakeQuestion
    const httpRequest = makeFakeRequest(fakeQuestionData, { id: examId })
    await sut.add(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(examId, fakeQuestionData)
  })

  test('Should return 200 if valid data is provided when add question', async () => {
    const { sut } = makeSut()
    const { examId, id, ...fakeQuestion } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestion, { id: examId })
    const httpResponse = await sut.add(fakeRequest)
    const fakeResponseBody = makeFakeQuestion()
    expect(httpResponse).toEqual(ok(fakeResponseBody))
  })
})

// ------------------------------UPDATE METHOD TESTS------------------------------

describe('Question Controller update method', () => {
  test('Should return 400 if no id is provided when update question', async () => {
    const { sut } = makeSut()
    const { id, ...fakeQuestionWithoutId } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutId, { id: null })
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 400 if no statement is provided when update question', async () => {
    const { sut } = makeSut()
    const { id, statement, ...fakeQuestionWithoutStatement } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutStatement, { id })
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('statement')))
  })

  test('Should return 400 if no options is provided when update question', async () => {
    const { sut } = makeSut()
    const { id, options, ...fakeQuestionWithoutOptions } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutOptions, { id })
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('options'))
    )
  })

  test('Should return 500 if UpdateQuestion throws', async () => {
    const { sut, updateQuestionStub } = makeSut()
    jest.spyOn(updateQuestionStub, 'update').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const { id, ...fakeQuestionWithoutId } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutId, { id })
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call UpdateQuestion with correct values', async () => {
    const { sut, updateQuestionStub } = makeSut()
    const updateSpy = jest.spyOn(updateQuestionStub, 'update')
    const { id, examId, ...fakeUpdateRequest } = makeFakeQuestion()
    const httpRequest = makeFakeRequest(fakeUpdateRequest, { id })
    await sut.update(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith(id, fakeUpdateRequest)
  })

  test('Should return 200 if valid data is provided when update question', async () => {
    const { sut } = makeSut()

    const { id, ...fakeQuestionWithoutId } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutId, { id })
    const httpResponse = await sut.update(fakeRequest)
    const fakeResponseBody = makeFakeQuestion()
    expect(httpResponse).toEqual(ok(fakeResponseBody))
  })
})

// ------------------------------GET METHOD TESTS------------------------------

describe('Question Controller get method', () => {
  test('Should return 400 if no id is provided when get question', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.get({ params: { id: null } })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 500 if GetQuestion throws', async () => {
    const { sut, getQuestionStub } = makeSut()
    jest.spyOn(getQuestionStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.get({ body: { id: '1234' } })
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided when get question', async () => {
    const { sut } = makeSut()
    const { examId, ...fakeQuestionWithoutExamId } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutExamId, { id: examId })
    const addedQuestionResponse = await sut.add(fakeRequest)
    const getQuestionResponse = await sut.get({
      params: { id: addedQuestionResponse.body.id }
    })
    expect(getQuestionResponse).toEqual(ok(makeFakeQuestion()))
  })
})

// ------------------------------LIST METHOD TESTS------------------------------

describe('Question Controller list method', () => {
  test('Should return 500 if ListQuestions throws', async () => {
    const { sut, listQuestionsStub } = makeSut()
    jest.spyOn(listQuestionsStub, 'list').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.list({})
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided when list questions', async () => {
    const { sut } = makeSut()
    const questionList = await sut.list({ params: { id: fakeExamId } })
    expect(questionList).toEqual(ok([makeFakeQuestion()]))
  })
})

// ------------------------------DELETE METHOD TESTS------------------------------

describe('Question Controller delete method', () => {
  test('Should return 400 if no id is provided when delete question', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.delete({ params: { id: null } })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 500 if DeleteQuestion throws', async () => {
    const { sut, deleteQuestionStub } = makeSut()
    jest.spyOn(deleteQuestionStub, 'delete').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.delete({ params: { id: '42' } })
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
