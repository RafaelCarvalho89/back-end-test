import { AddExam } from '../../domain/usecases/add-exam'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class ExamController implements Controller {
  private readonly addExam: AddExam

  constructor (addExam: AddExam) {
    this.addExam = addExam
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'description', 'type']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, description, type, questions } = httpRequest.body

      const exam = await this.addExam.add({
        name: name,
        description: description,
        type: type,
        questions: questions
      })

      return ok(exam)
    } catch (error) {
      return serverError(error)
    }
  }
}
