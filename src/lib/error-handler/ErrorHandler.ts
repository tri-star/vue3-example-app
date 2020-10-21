import { ComponentPublicInstance } from 'vue'

export class ErrorHandler {
  static fromVueError(err: unknown, instance: ComponentPublicInstance | null, info: string) {
    const errorDetail = {
      err,
      instance,
      info,
    }
    ErrorHandler.handle(err, errorDetail)
  }

  static fromGeneralError(error: unknown) {
    ErrorHandler.handle(error)
  }

  static fromPromiseError(error: any) {
    ErrorHandler.handle(error.reason)
  }

  static handle(error: any, errorDetail = {}) {
    // if (error instanceof AuthError) {
    //   return error.handle()
    // }

    // ハンドルされていない例外
    console.error('UnhandledError: ', error, errorDetail)
  }
}
