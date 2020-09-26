import { reactive, Ref, toRefs } from 'vue'
import { ApiError } from '@/domain/ApiError'
import { AxiosError } from 'axios'

type useApiState = {
  isPending: boolean
  isError: boolean
  error: ApiError | null
}

export type UseApiResult<T> = {
  isPending: () => boolean
  isError: () => boolean
  isDone: () => boolean
  execute: () => Promise<T | null>
}

type useApi = { <T>(asyncFunction: () => Promise<T>): UseApiResult<T> }

export const useApi: useApi = (asyncFunction) => {
  const state = reactive<useApiState>({
    isPending: false,
    isError: false,
    error: null,
  })

  const execute = async () => {
    state.isPending = true
    return await asyncFunction()
      .then((response) => {
        state.error = null
        state.isError = false
        return response
      })
      .catch((error: AxiosError) => {
        state.error = new ApiError(error.message, error.code)
        state.isError = true
        return null
      })
      .catch((error: Error) => {
        state.error = new ApiError(error.message)
        state.isError = true
        return null
      })
      .finally(() => {
        state.isPending = false
      })
  }

  const isPending = () => {
    return state.isPending
  }
  const isDone = () => {
    return !state.isPending && !state.isError
  }
  const isError = () => {
    return !state.isPending && state.isError
  }

  return {
    isPending,
    isDone,
    isError,
    execute,
  }
}
