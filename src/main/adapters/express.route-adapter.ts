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
        params: req.params,
        body: req.body
      }
      const httpResponse = await controller.update(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  },

  get (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        params: req.params,
        body: req.body
      }
      const httpResponse = await controller.get(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  },

  list (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        params: req.params,
        body: req.body
      }
      const httpResponse = await controller.list(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  },

  delete (controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        params: req.params,
        body: req.body
      }
      const httpResponse = await controller.delete(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
