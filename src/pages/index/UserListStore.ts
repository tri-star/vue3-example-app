import { User, UserList } from '@/domain/User'
import { UserRepository, UserRepositoryKey } from '@/repositories/UserRepository'
import { inject, InjectionKey, reactive, ref } from 'vue'

type UserListStoreStateType = {
  userList: UserList
  isPendingFlag: boolean
}

export class UserListStore {
  private state: UserListStoreStateType
  private userRepository: UserRepository

  public constructor() {
    this.state = reactive<UserListStoreStateType>({
      userList: new Array<User>(),
      isPendingFlag: false,
    })
    this.userRepository = inject<UserRepository>(UserRepositoryKey)!
  }

  public getUserList() {
    return this.state.userList
  }

  public async loadUserList(): Promise<void> {
    this.state.isPendingFlag = true
    const users = await this.userRepository.fetchUserList()
    this.state.userList = []
    users.forEach((u) => {
      this.state.userList.push(u)
    })
    this.state.isPendingFlag = false
  }

  public isPending(): boolean {
    return this.state.isPendingFlag
  }
}

export const UserListStoreKey: InjectionKey<UserListStore> = Symbol('UserListStore')
