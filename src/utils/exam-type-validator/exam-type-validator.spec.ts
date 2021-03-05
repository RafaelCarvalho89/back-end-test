import { isExamType } from './exam-type-validator'

const makeIsExamType = (examType: string): any => {
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

  test('Should return false if value is difference of ONLINE or OFFLINE', () => {
    const isExamType = makeIsExamType('INVALID')
    expect(false).toBe(isExamType)
  })
})
