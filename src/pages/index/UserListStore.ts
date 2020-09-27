import { User, UserList } from '@/domain/User'
import { useApi, UseApiResult } from '@/hooks/useApi'
import { UserRepository, UserRepositoryKey } from '@/repositories/UserRepository'
import { inject, InjectionKey, reactive, ref } from 'vue'

type UserListStoreState = {
  searchForm: {
    userName: string
    loginId: string
  }
  userList: UserList
}

export class UserListStore {
  public state: UserListStoreState
  public userListLoader: UseApiResult<UserList>

  private userRepository: UserRepository

  public constructor() {
    this.state = reactive<UserListStoreState>({
      searchForm: {
        userName: '',
        loginId: '',
      },
      userList: new Array<User>(),
    })
    this.userRepository = inject<UserRepository>(UserRepositoryKey)!
    this.userListLoader = useApi(async () => {
      return await this.userRepository.fetchUserList()
    })
  }

  public async loadUserList(): Promise<void> {
    const users = await this.userListLoader.execute()
    this.state.userList = []
    if (this.userListLoader.isError()) {
      return
    }
    users!.forEach((u) => {
      this.state.userList.push(u)
    })
  }
}

export const UserListStoreKey: InjectionKey<UserListStore> = Symbol('UserListStore')
