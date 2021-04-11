import {
  AddQuestion,
  Controller,
  DeleteQuestion,
  GetQuestion,
  HttpRequest,
  HttpResponse,
  ListQuestions,
  UpdateQuestion
} from './question-controller-protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

export class QuestionController implements Controller {
  constructor (
    private readonly addQuestion: AddQuestion,
    private readonly getQuestion: GetQuestion,
    private readonly updateQuestion: UpdateQuestion,
    private readonly listQuestions: ListQuestions,
    private readonly deleteQuestion: DeleteQuestion
  ) {}

  async add (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const examId = httpRequest.params.id
      const question = httpRequest.body

      if (!examId) return badRequest(new MissingParamError('examId'))
      const requiredFields = ['statement', 'options']
      for (const field of requiredFields) {
        if (!question[field]) return badRequest(new MissingParamError(field))
      }

      const requiredOptionFields = ['key', 'value', 'correct']
      for (const option of question.options) {
        for (const field of requiredOptionFields) {
          if (option[field] === null || option[field] === undefined || option[field] === '') {
            return badRequest(new MissingParamError(field))
          }
        }
      }

      if (question.questions && question.questions !== []) {
        const requiredOptionsFields = ['key', 'value', 'correct']
        for (const option of question.options) {
          for (const field of requiredOptionsFields) {
            if (!option[field]) return badRequest(new MissingParamError(field))
          }
        }
      }

      const addedQuestion = await this.addQuestion.add(examId, question)
      return ok(addedQuestion)
    } catch (error) {
      return serverError(error)
    }
  }

  async update (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      const question = httpRequest.body

      if (!id) return badRequest(new MissingParamError('id'))
      const requiredFields = ['statement', 'options']
      for (const field of requiredFields) {
        if (!question[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const updatedQuestion = await this.updateQuestion.update(id, question)
      return ok(updatedQuestion)
    } catch (error) {
      return serverError(error)
    }
  }

  async get (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const question = await this.getQuestion.get(httpRequest.params.id)
      return ok(question)
    } catch (error) {
      return serverError(error)
    }
  }

  async list (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const questionList = await this.listQuestions.list(httpRequest.params.id)
      return ok(questionList)
    } catch (error) {
      return serverError(error)
    }
  }

  async delete (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const deleteResponse = await this.deleteQuestion.delete(httpRequest.params.id)
      return ok(deleteResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}
