import { MissingParamError } from '../errors/missing-param-error'

export class ExamController {
  async handle (httpRequest: any): Promise<any> {
    return {
      statusCode: 400,
      body: new MissingParamError('name')
    }
  }
}
