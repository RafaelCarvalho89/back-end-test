import { DbAddExam } from '../../data/usecases/add-exam/db-add-exam'
import { DbGetExam } from '../../data/usecases/get-exam/db-get-exam'
import { DbUpdateExam } from '../../data/usecases/update-exam/db-update-exam'
import { ExamMongoRepository } from '../../infra/db/mongodb/exam-repository/exam-mongo-repository'
import { ExamController } from '../../presentation/controllers/exam/exam-controller'
import { ExamTypeValidatorAdapter } from '../../utils/exam-type-validator/exam-type-validator'

export const makeExamController = (): ExamController => {
  const examTypeValidatorAdapter = new ExamTypeValidatorAdapter()
  const examMongoRepository = new ExamMongoRepository()
  const dbAddExam = new DbAddExam(examMongoRepository)
  const dbUpdateExam = new DbUpdateExam(examMongoRepository)
  const dbGetExam = new DbGetExam(examMongoRepository)
  return new ExamController(dbAddExam, examTypeValidatorAdapter, dbUpdateExam, dbGetExam)
}
