/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AdaptRoute } from '../adapters/express.route-adapter'
import { makeExamController } from '../factories/exam-factory'

export default (router: Router): void => {
  router.post('/exam/new', AdaptRoute.add(makeExamController()))
  router.put('/exam/update', AdaptRoute.update(makeExamController()))
  router.get('/exam/:id', AdaptRoute.get(makeExamController()))
  router.get('/exams', AdaptRoute.list(makeExamController()))
  router.delete('/exam/delete/:id', AdaptRoute.delete(makeExamController()))
}
