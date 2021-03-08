import { Router } from 'express'

export default (router: Router): void => {
  router.post('/exam', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
