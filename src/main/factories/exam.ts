import { DbAddExam } from '../../data/usecases/add-exam/db-add-exam'
import { ExamMongoRepository } from '../../infra/db/mongodb/exam-repository/exam'
import { ExamController } from '../../presentation/controllers/exam/exam'
import { ExamTypeValidatorAdapter } from '../../utils/exam-type-validator/exam-type-validator'

export const makeExamController = (): ExamController => {
  const examTypeValidatorAdapter = new ExamTypeValidatorAdapter()
  const examMongoRepository = new ExamMongoRepository()
  const dbAddExam = new DbAddExam(examMongoRepository)
  return new ExamController(dbAddExam, examTypeValidatorAdapter)
}
