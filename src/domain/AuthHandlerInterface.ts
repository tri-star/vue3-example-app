import { InjectionKey } from 'vue'
import { User } from './User'

export interface AuthHandlerInterface {
  getUser: () => Promise<User | null>

  login: (loginId: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

export const AuthHandlerInterfaceKey: InjectionKey<AuthHandlerInterface> = Symbol('AuthHandlerInterface')
