import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  add: (httpRequest: HttpRequest) => Promise<HttpResponse>
  update: (httpRequest: HttpRequest) => Promise<HttpResponse>
  get: (httpRequest: HttpRequest) => Promise<HttpResponse>
  list: (httpRequest: HttpRequest) => Promise<HttpResponse>
  delete: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
