import { Router } from 'express'
import { adaptRoute } from '../adapters/express.route-adapter'
import { makeExamController } from '../factories/exam'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/exam', adaptRoute(makeExamController()))
}
