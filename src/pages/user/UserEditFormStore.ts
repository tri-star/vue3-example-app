import { UserEditRuleCollection } from '@/domain/User'
import { useApi, UseApiResult } from '@/hooks/useApi'
import { useValidator } from '@/hooks/useValidator'
import { RuleCollectionInterface } from '@/lib/validator/Rule'
import { UserRepository, UserRepositoryKey } from '@/repositories/UserRepository'
import { inject, InjectionKey, reactive } from 'vue'

type UserEditFormStoreState = {
  id: number
  form: {
    name: string
    loginId: string
  }
  showTips: boolean
  errors: Record<string, string[]>
}

export class UserEditFormStore {
  public state: UserEditFormStoreState
  private userRepository: UserRepository
  public userEditHandler: UseApiResult<void>
  private validator

  private ruleCollection: RuleCollectionInterface

  public constructor() {
    this.state = reactive<UserEditFormStoreState>({
      id: 0,
      form: {
        name: '',
        loginId: '',
      },
      showTips: false,
      errors: {},
    })

    this.userRepository = inject<UserRepository>(UserRepositoryKey)!
    this.validator = useValidator()

    this.userEditHandler = useApi<void>(async () => {
      return await this.userRepository.edit(this.state.id, this.state.form)
    })
    this.ruleCollection = new UserEditRuleCollection(this.userRepository)
  }

  public initialize = async (id: number) => {
    this.state.id = id
    this.validator.setInitialData(this.state.form)

    const user = (await this.userRepository.fetchUserById(id))!
    this.state.form.name = user.name
    this.state.form.loginId = user.loginId
  }

  public async validate(force: boolean = false): Promise<boolean> {
    await this.validator.validate(this.state.form, this.ruleCollection, force)
    this.state.errors = this.validator.getErrors()
    return !this.validator.isError()
  }

  public async edit(): Promise<void> {
    const isOk = await this.validate(true)
    if (!isOk) {
      return
    }
    await this.userEditHandler.execute()

    this.state.showTips = true
    window.setTimeout(() => {
      this.state.showTips = false
    }, 1000)
  }
}

export const UserEditFormStoreKey: InjectionKey<UserEditFormStore> = Symbol('UserEditFormStore')
