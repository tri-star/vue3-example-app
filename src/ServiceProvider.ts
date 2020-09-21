import { App } from 'vue'
import { UserRepository, UserRepositoryKey } from './repositories/UserRepository'

export class ServiceProvider {
  static boot(app: App): void {
    app.provide<UserRepository>(UserRepositoryKey, new UserRepository())
  }
}
