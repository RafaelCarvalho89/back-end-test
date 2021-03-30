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
  ListQuestionsModel,
  UpdateQuestion,
  UpdateQuestionModel
} from '../../../domain/usecases/question'

const makeAddQuestion = (): AddQuestion => {
  class AddQuestionStub implements AddQuestion {
    async add (addQuestionRequest: AddQuestionModel): Promise<QuestionModel> {
      return await new Promise((resolve) => resolve(makeFakeQuestion()))
    }
  }
  return new AddQuestionStub()
}

const makeUpdateQuestion = (): UpdateQuestion => {
  class UpdateQuestionStub implements UpdateQuestion {
    async update (
      updateQuestionRequest: UpdateQuestionModel
    ): Promise<QuestionModel> {
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
    async list (ListQuestionsRequest: ListQuestionsModel): Promise<QuestionModel[]> {
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

const makeFakeQuestion = (): any => ({
  examId: '607b9974-4914-44df-81e8-d56ec6a589bf',
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

const makeFakeRequest = (body: any): HttpRequest => ({
  body
})

// ------------------------------ADD METHOD TESTS------------------------------

describe('Question Controller add method', () => {
  test('Should return 400 if no examId is provided when add question', async () => {
    const { sut } = makeSut()
    const { id, examId, ...fakeQuestionWithoutExamId } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutExamId)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('examId')))
  })

  test('Should return 400 if no statement is provided when add question', async () => {
    const { sut } = makeSut()
    const {
      id,
      statement,
      ...fakeQuestionWithoutDescription
    } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutDescription)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('statement')))
  })

  test('Should return 400 if no options is provided when add question', async () => {
    const { sut } = makeSut()
    const { id, options, ...fakeQuestionWithoutType } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutType)
    const httpResponse = await sut.add(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('options')))
  })

  test('Should return 500 if AddQuestion throws', async () => {
    const { sut, addQuestionStub } = makeSut()
    jest.spyOn(addQuestionStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const { id, ...fakeQuestion } = makeFakeQuestion()
    const httpResponse = await sut.add(makeFakeRequest(fakeQuestion))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddQuestion with correct values', async () => {
    const { sut, addQuestionStub } = makeSut()
    const addSpy = jest.spyOn(addQuestionStub, 'add')
    const fakeQuestion = makeFakeQuestion()
    const { id, ...fakeQuestionData } = fakeQuestion
    const httpRequest = makeFakeRequest(fakeQuestionData)
    await sut.add(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(fakeQuestionData)
  })

  test('Should return 200 if valid data is provided when add question', async () => {
    const { sut } = makeSut()
    const { id, ...fakeQuestion } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestion)
    const httpResponse = await sut.add(fakeRequest)
    const fakeResponseBody = makeFakeQuestion()
    expect(httpResponse).toEqual(ok(fakeResponseBody))
  })
})

// ------------------------------UPDATE METHOD TESTS------------------------------

describe('Question Controller update method', () => {
  test('Should return 400 if no id is provided when update question', async () => {
    const { sut } = makeSut()
    const { id, ...fakeQuestionWithoutName } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutName)
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should return 400 if no statement is provided when update question', async () => {
    const { sut } = makeSut()
    const { statement, ...fakeQuestionWithoutName } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutName)
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('statement')))
  })

  test('Should return 400 if no options is provided when update question', async () => {
    const { sut } = makeSut()
    const { options, ...fakeQuestionWithoutDescription } = makeFakeQuestion()
    const fakeRequest = makeFakeRequest(fakeQuestionWithoutDescription)
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
    const fakeRequest = makeFakeRequest(makeFakeQuestion())
    const httpResponse = await sut.update(fakeRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call UpdateQuestion with correct values', async () => {
    const { sut, updateQuestionStub } = makeSut()
    const updateSpy = jest.spyOn(updateQuestionStub, 'update')
    const { examId, ...fakeUpdateRequest } = makeFakeQuestion()
    const httpRequest = makeFakeRequest(fakeUpdateRequest)
    await sut.update(httpRequest)
    expect(updateSpy).toHaveBeenCalledWith(fakeUpdateRequest)
  })

  test('Should return 200 if valid data is provided when update question', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest(makeFakeQuestion())
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
    const addedQuestionResponse = await sut.add(
      makeFakeRequest(makeFakeQuestion())
    )
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
    const questionList = await sut.list(makeFakeQuestion().examId)
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
