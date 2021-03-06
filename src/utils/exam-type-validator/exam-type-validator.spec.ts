import { ExamType } from '../../domain/models/exam'
import { isExamType } from './exam-type-validator'

const makeIsExamType = (examType: ExamType): any => {
  return isExamType(examType)
}

describe('ExamTypeValidator', () => {
  test('Should return true if value is ONLINE', () => {
    const isExamType = makeIsExamType('ONLINE')
    expect(true).toBe(isExamType)
  })

  test('Should return true if value is OFFLINE', () => {
    const isExamType = makeIsExamType('OFFLINE')
    expect(true).toBe(isExamType)
  })
})
