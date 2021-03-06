import { DbAddExam } from '../../data/usecases/exam/add-exam/db-add-exam'
import { DbDeleteExam } from '../../data/usecases/exam/delete-exam/db-delete-exam'
import { DbGetExam } from '../../data/usecases/exam/get-exam/db-get-exam'
import { DbListExams } from '../../data/usecases/exam/list-exams/db-list-exams'
import { DbUpdateExam } from '../../data/usecases/exam/update-exam/db-update-exam'
import { ExamMongoRepository } from '../../infra/db/mongodb/exam-repository/exam-mongo-repository'
import { ExamController } from '../../presentation/controllers/exam/exam-controller'
import { ExamTypeValidatorAdapter } from '../../utils/exam-type-validator/exam-type-validator'

export const makeExamController = (): ExamController => {
  const examTypeValidatorAdapter = new ExamTypeValidatorAdapter()
  const examMongoRepository = new ExamMongoRepository()
  const dbAddExam = new DbAddExam(examMongoRepository)
  const dbUpdateExam = new DbUpdateExam(examMongoRepository)
  const dbGetExam = new DbGetExam(examMongoRepository)
  const dbListExams = new DbListExams(examMongoRepository)
  const dbDeleteExam = new DbDeleteExam(examMongoRepository)
  return new ExamController(
    dbAddExam,
    examTypeValidatorAdapter,
    dbUpdateExam,
    dbGetExam,
    dbListExams,
    dbDeleteExam
  )
}
