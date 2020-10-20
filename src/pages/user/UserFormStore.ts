import { UserRegisterRuleCollection } from '@/domain/User'
import { useApi, UseApiResult } from '@/hooks/useApi'
import { useValidator } from '@/hooks/useValidator'
import { RuleCollectionInterface } from '@/lib/validator/Rule'
import { UserRepository, UserRepositoryKey } from '@/repositories/UserRepository'
import { inject, InjectionKey, reactive } from 'vue'

type UserFormStoreState = {
  form: {
    name: string
    loginId: string
  }
  showTips: boolean
  errors: Record<string, string[]>
}

export class UserFormStore {
  public state: UserFormStoreState
  private userRepository: UserRepository
  public userRegisterHandler: UseApiResult<void>
  private validator

  private ruleCollection: RuleCollectionInterface

  public constructor() {
    this.state = reactive<UserFormStoreState>({
      form: {
        name: '',
        loginId: '',
      },
      showTips: false,
      errors: {},
    })

    this.userRepository = inject<UserRepository>(UserRepositoryKey)!
    this.validator = useValidator()

    this.userRegisterHandler = useApi<void>(async () => {
      return await this.userRepository.register(this.state.form)
    })
    this.ruleCollection = new UserRegisterRuleCollection(this.userRepository)
  }

  public initialize = () => {
    this.validator.setInitialData(this.state.form)
  }

  public async validate(force: boolean = false): Promise<boolean> {
    await this.validator.validate(this.state.form, this.ruleCollection, force)
    this.state.errors = this.validator.getErrors()
    return !this.validator.isError()
  }

  public async register(): Promise<void> {
    const isOk = await this.validate(true)
    if (!isOk) {
      return
    }
    await this.userRegisterHandler.execute()

    this.state.showTips = true
    window.setTimeout(() => {
      this.state.showTips = false
    }, 1000)
  }
}

export const UserFormStoreKey: InjectionKey<UserFormStore> = Symbol('UserFormStore')
