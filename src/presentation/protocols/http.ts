export interface UrlParams {
  id?: string
}

export interface HttpRequest {
  params?: UrlParams
  body?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
