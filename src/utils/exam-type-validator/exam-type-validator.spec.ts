import { ExamTypeValidatorAdapter, isExamType } from './exam-type-validator'

const makeIsExamType = (examType: string): any => {
  return isExamType(examType)
}

const makeSut = (): ExamTypeValidatorAdapter => {
  return new ExamTypeValidatorAdapter()
}

describe('isExamType', () => {
  test('Should return true if value is ONLINE', () => {
    const isExamType = makeIsExamType('ONLINE')
    expect(true).toBe(isExamType)
  })

  test('Should return true if value is OFFLINE', () => {
    const isExamType = makeIsExamType('OFFLINE')
    expect(true).toBe(isExamType)
  })
})

describe('ExamTypeValidatorAdapter', () => {
  test('Should return true if validator return true', () => {
    const sut = makeSut()
    const isExamType = sut.isExamType('OFFLINE')
    expect(isExamType).toBe(true)
  })

  test('Should return false if validator return false', () => {
    const sut = makeSut()
    const isExamType = sut.isExamType('INVALID')
    expect(isExamType).toBe(false)
  })
})
