import { ExamType } from '../../domain/models/exam'

export const isExamType = (examType: ExamType): boolean => {
  return examType === 'ONLINE' || examType === 'OFFLINE'
}
