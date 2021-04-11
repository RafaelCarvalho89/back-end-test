/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express.route-adapter'
import { makeQuestionController } from '../factories/question-factory'

export default (router: Router): void => {
  router.post('/exam/:id/question', AdaptRoute.add(makeQuestionController()))
  router.get('/exam/question/:id', AdaptRoute.get(makeQuestionController()))
  router.get('/exam/:id/questions', AdaptRoute.list(makeQuestionController()))
  router.put('/question/update', AdaptRoute.update(makeQuestionController()))
  router.delete('/exam/question/:id', AdaptRoute.delete(makeQuestionController()))
}
