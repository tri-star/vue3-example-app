import { AuthHandlerInterface } from '@/domain/AuthHandlerInterface'
import { User } from '@/domain/User'
import { inject } from 'vue'
import { UserRepository, UserRepositoryKey } from './UserRepository'

export class AuthHandler implements AuthHandlerInterface {
  private userRepository: UserRepository

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  public async login(loginId: string, password: string): Promise<boolean> {
    if (password.length === 0) {
      return false
    }

    const user = await this.userRepository.fetchUser(loginId)

    if (user === null) {
      return false
    }

    localStorage.setItem('loginId', user.loginId)
    return true
  }

  public async getUser(): Promise<User | null> {
    const loginId = localStorage.getItem('loginId')
    if (loginId === null) {
      return null
    }

    const user = await this.userRepository.fetchUser(loginId)
    return user
  }
}
