import { RuleCollectionInterface } from '@/lib/validator/Rule'
import { ValidationResult, Validator } from '@/lib/validator/Validator'
import { reactive, unref } from 'vue'

export const useValidator = () => {
  const state = reactive<{
    errors: Record<string, string[]>
  }>({
    errors: {},
  })
  const validator = new Validator()
  let result: ValidationResult = new ValidationResult()

  const setInitialData = (initialData: Record<string, any>) => {
    validator.setInitialData(initialData)
  }

  const updateErrors = (newErrors: Record<string, string[]>) => {
    state.errors = {}
    for (const field in newErrors) {
      if (state.errors[field] === undefined) {
        state.errors[field] = []
      }
      for (const i in newErrors[field]) {
        state.errors[field].push(newErrors[field][i])
      }
    }
  }

  const validate = async (
    input: Record<string, any>,
    ruleCollection: RuleCollectionInterface,
    force: boolean = false,
    context?: Record<string, any>
  ) => {
    result = await validator.validate(input, ruleCollection, force, context)
    updateErrors(result.getAll())
  }

  const isError = (): boolean => {
    return result.isError()
  }

  const hasError = (field: string): boolean => {
    return result.hasError(field)
  }

  const getErrors = (): Record<string, string[]> => {
    return state.errors
  }

  const getMessages = (field: string): string[] => {
    return result.getMessages(field)
  }

  const getMessage = (field: string): string => {
    const messages = result.getMessages(field)
    return messages.length > 0 ? messages[0] : ''
  }

  return {
    state,
    setInitialData,
    validate,
    isError,
    hasError,
    getMessages,
    getErrors,
  }
}
