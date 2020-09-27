import { User, UserList } from '@/domain/User'
import { useApi, UseApiResult } from '@/hooks/useApi'
import { usePaginator, UsePaginatorResult } from '@/hooks/usePaginator'
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
  public paginator: UsePaginatorResult
  private pageSize: number

  private userRepository: UserRepository

  public constructor() {
    this.pageSize = 5
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
      return await this.userRepository.fetchUserList(this.paginator.getPage(), this.pageSize)
    })
    this.paginator = usePaginator()
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
    this.paginator.update(this.state.totalCount, 5)
  }
}

export const UserListStoreKey: InjectionKey<UserListStore> = Symbol('UserListStore')
