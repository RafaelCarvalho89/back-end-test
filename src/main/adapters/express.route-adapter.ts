import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const AdaptRoute = {
  add (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body
      }
      const httpResponse = await controller.add(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  },

  update (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body
      }
      const httpResponse = await controller.update(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  },

  get (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body
      }
      const httpResponse = await controller.get(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
