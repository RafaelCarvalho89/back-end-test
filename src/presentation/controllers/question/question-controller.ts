import {
  AddQuestion,
  Controller,
  HttpRequest,
  HttpResponse
} from './question-controller-protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

export class QuestionController implements Controller {
  constructor (
    private readonly addQuestion: AddQuestion
  ) {}

  async add (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['examId', 'statement', 'options']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { examId, statement, options } = httpRequest.body
      const question = await this.addQuestion.add({ examId, statement, options })
      return ok(question)
    } catch (error) {
      return serverError(error)
    }
  }

  async update (httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok({ ok: 'ok' })
  }

  async get (httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok({ ok: 'ok' })
  }

  async list (httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok({ ok: 'ok' })
  }

  async delete (httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok({ ok: 'ok' })
  }
}
