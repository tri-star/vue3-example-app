import { User, UserList } from '@/domain/User'
import { userFactory } from '@/factories/userFactory'
import { InjectionKey } from 'vue'

export const UserRepositoryKey: InjectionKey<UserRepository> = Symbol('UserRepository')

export type fetchUserListType = {
  userList: UserList
  totalCount: number
}

export class UserRepository {
  public async fetchUserList(page: number, pageSize: number): Promise<fetchUserListType> {
    const userList: UserList = new Array<User>()

    const users: Array<User> = this.loadUsers()

    const offset = Math.max((page - 1) * pageSize, 0)
    let count = 0
    users.forEach((u) => {
      if (count++ < offset) {
        return
      }
      if (count > offset + pageSize) {
        return
      }
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

  private loadUsers() {
    const users: UserList = new Array<User>()
    const usersJson: string | null = localStorage.getItem('users')
    if (!usersJson) {
      for (let i = 0; i < 50; i++) {
        users.push(userFactory.build())
      }

      localStorage.setItem('users', JSON.stringify(users))
      return users
    }

    const decodedUsers = JSON.parse(usersJson)
    for (const i in decodedUsers) {
      users.push(
        new User({
          id: decodedUsers[i]['id'] ?? 0,
          name: decodedUsers[i]['name'] ?? '',
          loginId: decodedUsers[i]['loginId'] ?? '',
        })
      )
    }
    return users
  }
}
