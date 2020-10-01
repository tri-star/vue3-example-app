import { useApi, UseApiResult } from '@/hooks/useApi'
import { UserRepository, UserRepositoryKey } from '@/repositories/UserRepository'
import { inject, InjectionKey, reactive } from 'vue'

type UserFormStoreState = {
  form: {
    name: string
    loginId: string
  }
  showTips: boolean
}

export class UserFormStore {
  public state: UserFormStoreState
  private userRepository: UserRepository
  public userRegisterHandler: UseApiResult<void>

  public constructor() {
    this.state = reactive<UserFormStoreState>({
      form: {
        name: '',
        loginId: '',
      },
      showTips: false,
    })

    this.userRepository = inject<UserRepository>(UserRepositoryKey)!

    this.userRegisterHandler = useApi<void>(async () => {
      return await this.userRepository.register(this.state.form)
    })
  }

  public async validate(): Promise<boolean> {
    return true
  }

  public async register(): Promise<void> {
    await this.userRegisterHandler.execute()

    this.state.showTips = true
    window.setTimeout(() => {
      this.state.showTips = false
    }, 1000)
  }
}

export const UserFormStoreKey: InjectionKey<UserFormStore> = Symbol('UserFormStore')
