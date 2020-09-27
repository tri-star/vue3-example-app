import { User, UserList } from '@/domain/User'
import { useApi, UseApiResult } from '@/hooks/useApi'
import { fetchUserListType, UserRepository, UserRepositoryKey } from '@/repositories/UserRepository'
import { inject, InjectionKey, reactive, ref } from 'vue'

type UserListStoreState = {
  searchForm: {
    userName: string
    loginId: string
  }
  userList: UserList
  totalCount: number
}

export class UserListStore {
  public state: UserListStoreState
  public userListLoader: UseApiResult<fetchUserListType>

  private userRepository: UserRepository

  public constructor() {
    this.state = reactive<UserListStoreState>({
      searchForm: {
        userName: '',
        loginId: '',
      },
      userList: new Array<User>(),
      totalCount: 0,
    })
    this.userRepository = inject<UserRepository>(UserRepositoryKey)!
    this.userListLoader = useApi(async () => {
      return await this.userRepository.fetchUserList()
    })
  }

  public async loadUserList(): Promise<void> {
    this.state.userList = []
    this.state.totalCount = 0
    const result = await this.userListLoader.execute()
    if (this.userListLoader.isError()) {
      return
    }
    result!.userList.forEach((u) => {
      this.state.userList.push(u)
    })
    this.state.totalCount = result!.totalCount
  }
}

export const UserListStoreKey: InjectionKey<UserListStore> = Symbol('UserListStore')
