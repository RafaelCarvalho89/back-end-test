import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  add: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
