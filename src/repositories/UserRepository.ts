import { User, UserList } from '@/domain/User'
import { userFactory } from '@/factories/userFactory'
import { InjectionKey } from 'vue'

export const UserRepositoryKey: InjectionKey<UserRepository> = Symbol('UserRepository')

export class UserRepository {
  public async fetchUserList(): Promise<UserList> {
    const userList: UserList = new Array<User>()

    const users: Array<User> = []
    users.push(userFactory.build())
    users.push(userFactory.build())
    users.push(userFactory.build())
    users.push(userFactory.build())
    users.push(userFactory.build())

    users.forEach((u) => {
      userList.push(u)
    })

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve()
      }, 500)
    )

    return userList
  }
}
