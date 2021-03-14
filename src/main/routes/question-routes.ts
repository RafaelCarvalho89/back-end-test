/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express.route-adapter'
import { makeQuestionController } from '../factories/question-factory'

export default (router: Router): void => {
  router.post('/question/new', AdaptRoute.add(makeQuestionController()))
  router.get('/questions', AdaptRoute.add(makeQuestionController()))
}
