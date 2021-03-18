export interface HttpRequest {
  params?: string
  body?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
