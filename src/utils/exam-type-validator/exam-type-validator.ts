import { ExamTypeValidator } from '../../presentation/protocols/exam-type-validator'

export const isExamType = (examType: string): boolean => {
  return examType === 'ONLINE' || examType === 'OFFLINE'
}

export class ExamTypeValidatorAdapter implements ExamTypeValidator {
  isExamType (type: string): boolean {
    return isExamType(type)
  }
}
