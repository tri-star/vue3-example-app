import { InjectionKey } from 'vue'
import { User } from './User'

export interface AuthHandlerInterface {
  getUser: () => User | null
}

export const AuthHandlerInterfaceKey: InjectionKey<AuthHandlerInterface> = Symbol('AuthHandlerInterface')
