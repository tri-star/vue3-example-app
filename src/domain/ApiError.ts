export class ApiError {
  public message: string
  public code: string
  public details: Record<string, string>

  constructor(message: string, code?: string, details?: Record<string, string>) {
    this.message = message
    this.code = code ?? ''
    this.details = details ?? {}
  }
}
