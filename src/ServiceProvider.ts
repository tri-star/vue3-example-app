import { App } from 'vue'
import { UserRepository, UserRepositoryKey } from './repositories/UserRepository'
import { AuthHandlerInterface, AuthHandlerInterfaceKey } from './domain/AuthHandlerInterface'
import { AuthHandler } from './repositories/AuthHandler'

export class ServiceProvider {
  static boot(app: App): void {
    app.provide<UserRepository>(UserRepositoryKey, new UserRepository())
    app.provide<AuthHandlerInterface>(AuthHandlerInterfaceKey, new AuthHandler(new UserRepository()))
  }
}
