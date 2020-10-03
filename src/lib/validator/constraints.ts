import { constraintFunction, RuleResult } from './Rule'

type constraints = {
  required: () => constraintFunction
  length: (min: number, max: number) => constraintFunction
  maxLength: (max: number) => constraintFunction
}

const isString = (value: any): boolean => {
  if (value === undefined || value === null) {
    return false
  } else if (typeof value === 'string' || typeof value === 'number') {
    return true
  }
  return false
}

export const constraints: constraints = {
  required: (): constraintFunction => {
    return (value: any, parameters: Record<string, any>, context: Record<string, any>): RuleResult => {
      const okResponse = {
        ok: true,
      }
      const errorResponse = {
        ok: false,
        message: '必ず入力してください',
      }
      if (!isString(value)) {
        return errorResponse
      }

      if (String(value) === '') {
        return errorResponse
      }
      return okResponse
    }
  },
  length: (min: number, max: number): constraintFunction => {
    return (value: any, parameters: Record<string, any>, context: Record<string, any>): RuleResult => {
      const okResponse = {
        ok: true,
      }
      const errorResponse = {
        ok: false,
        message: `${min}文字以上${max}文字以内で入力してください`,
      }
      if (!isString(value)) {
        return errorResponse
      }

      const len = String(value).length
      if (len < min || len > max) {
        return errorResponse
      }
      return okResponse
    }
  },

  maxLength: (max: number): constraintFunction => {
    return (value: any, parameters: Record<string, any>, context: Record<string, any>): RuleResult => {
      const okResponse = {
        ok: true,
      }
      const errorResponse = {
        ok: false,
        message: `${max}文字以内で入力してください`,
      }
      if (!isString(value)) {
        return errorResponse
      }

      const len = String(value).length
      if (len > max) {
        return errorResponse
      }
      return okResponse
    }
  },
}
