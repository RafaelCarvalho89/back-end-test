import {
  AddExam,
  Controller,
  ExamTypeValidator,
  HttpRequest,
  HttpResponse
} from './exam-protocols'
import { InvalidParamError, MissingParamError } from '../../errors/errors-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class ExamController implements Controller {
  private readonly addExam: AddExam
  private readonly examTypeValidator: ExamTypeValidator

  constructor (addExam: AddExam, examTypeValidator: ExamTypeValidator) {
    this.addExam = addExam
    this.examTypeValidator = examTypeValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'description', 'type']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isExamType = this.examTypeValidator.isExamType(httpRequest.body.type)
      if (!isExamType) return badRequest(new InvalidParamError('type'))

      const { name, description, type, questions } = httpRequest.body
      const exam = await this.addExam.add({
        name,
        description,
        type,
        questions
      })

      return ok(exam)
    } catch (error) {
      return serverError(error)
    }
  }
}
