import { User, UserList } from '@/domain/User'
import { userFactory } from '@/factories/userFactory'
import { InjectionKey } from 'vue'

export const UserRepositoryKey: InjectionKey<UserRepository> = Symbol('UserRepository')

export type fetchUserListType = {
  userList: UserList
  totalCount: number
}

export class UserRepository {
  public async fetchUserList(): Promise<fetchUserListType> {
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

    const totalCount = users.length
    return {
      userList,
      totalCount,
    }
  }
}
