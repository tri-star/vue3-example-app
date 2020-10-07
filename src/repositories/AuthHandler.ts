import { AuthHandlerInterface } from '@/domain/AuthHandlerInterface'
import { User } from '@/domain/User'

export class AuthHandler implements AuthHandlerInterface {
  public getUser(): User | null {
    return null
  }
}
