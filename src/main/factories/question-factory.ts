import { DbAddQuestion } from '../../data/usecases/question/add-question/db-add-question'
import { DbDeleteQuestion } from '../../data/usecases/question/delete-question/db-delete-questions'
import { DbGetQuestion } from '../../data/usecases/question/get-question/db-get-question'
import { DbListQuestions } from '../../data/usecases/question/list-questions/db-list-questions'
import { DbUpdateQuestion } from '../../data/usecases/question/update-question/db-update-question'
import { QuestionMongoRepository } from '../../infra/db/mongodb/question-repository/question-mongo-repository'
import { QuestionController } from '../../presentation/controllers/question/question-controller'

export const makeQuestionController = (): QuestionController => {
  const questionMongoRepository = new QuestionMongoRepository()
  const dbAddQuestion = new DbAddQuestion(questionMongoRepository)
  const dbUpdateQuestion = new DbUpdateQuestion(questionMongoRepository)
  const dbGetQuestion = new DbGetQuestion(questionMongoRepository)
  const dbListQuestions = new DbListQuestions(questionMongoRepository)
  const dbDeleteQuestion = new DbDeleteQuestion(questionMongoRepository)
  return new QuestionController(
    dbAddQuestion,
    dbGetQuestion,
    dbUpdateQuestion,
    dbListQuestions,
    dbDeleteQuestion
  )
}
