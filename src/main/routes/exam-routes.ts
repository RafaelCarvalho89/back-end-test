/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express.route-adapter'
import { makeExamController } from '../factories/exam-factory'

export default (router: Router): void => {
  router.post('/exam', adaptRoute(makeExamController()))
  router.put('/exam', adaptRoute(makeExamController()))
}
