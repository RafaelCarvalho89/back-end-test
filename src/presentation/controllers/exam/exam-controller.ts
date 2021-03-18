import {
  AddExam,
  Controller,
  DeleteExam,
  ExamTypeValidator,
  GetExam,
  ListExams,
  HttpRequest,
  HttpResponse,
  UpdateExam
} from './exam-controller-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http/http-helper'

export class ExamController implements Controller {
  constructor (
    private readonly addExam: AddExam,
    private readonly examTypeValidator: ExamTypeValidator,
    private readonly updateExam: UpdateExam,
    private readonly getExam: GetExam,
    private readonly listExams: ListExams,
    private readonly deleteExam: DeleteExam
  ) {}

  async add (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'description', 'type']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.questions && httpRequest.body.questions !== []) {
        const requiredQuestionFields = ['statement', 'options']
        const requiredOptionFields = ['key', 'value', 'correct']

        for (const question of httpRequest.body.questions) {
          for (const field of requiredQuestionFields) {
            if (!question[field]) return badRequest(new MissingParamError(field))
          }

          for (const option of question.options) {
            for (const field of requiredOptionFields) {
              if (option[field] === null || option[field] === undefined || option[field] === '') {
                return badRequest(new MissingParamError(field))
              }
            }
          }
        }
      }

      const isExamType = this.examTypeValidator.isExamType(
        httpRequest.body.type
      )
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

  async update (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['id', 'name', 'description', 'type']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.questions && httpRequest.body.questions !== []) {
        const requiredQuestionFields = ['statement', 'options']
        const requiredOptionFields = ['key', 'value', 'correct']

        for (const question of httpRequest.body.questions) {
          for (const field of requiredQuestionFields) {
            if (!question[field]) return badRequest(new MissingParamError(field))
          }

          for (const option of question.options) {
            for (const field of requiredOptionFields) {
              if (option[field] === null || option[field] === undefined || option[field] === '') {
                return badRequest(new MissingParamError(field))
              }
            }
          }
        }
      }

      const isExamType = this.examTypeValidator.isExamType(
        httpRequest.body.type
      )
      if (!isExamType) return badRequest(new InvalidParamError('type'))

      const { id, name, description, type, questions } = httpRequest.body
      const exam = await this.updateExam.update({
        id,
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

  async get (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.id) return badRequest(new MissingParamError('id'))
      const exam = await this.getExam.get(httpRequest.params.id)
      return ok(exam)
    } catch (error) {
      return serverError(error)
    }
  }

  async list (): Promise<HttpResponse> {
    try {
      const examList = await this.listExams.list()
      return ok(examList)
    } catch (error) {
      return serverError(error)
    }
  }

  async delete (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.id) return badRequest(new MissingParamError('id'))
      const deleteResponse = await this.deleteExam.delete(httpRequest.body)
      return ok(deleteResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}
