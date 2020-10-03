import { constraints } from '@/lib/validator/constraints'
import { RuleCollection, RuleCollectionInterface, RuleSet } from '@/lib/validator/Rule'
import { resolveTransitionHooks } from 'vue'

export type UserParam = {
  id: number
  loginId: string
  name: string
}

export class User {
  public id: number
  public loginId: string
  public name: string

  public constructor(params?: UserParam) {
    this.id = params?.id ?? 0
    this.loginId = params?.loginId ?? ''
    this.name = params?.name ?? ''
  }
}

export type UserList = Array<User>

export class UserRegisterRequest {
  public id: number
  public loginId: string
  public name: string

  public constructor(params?: Record<string, any>) {
    this.id = params?.id ?? 0
    this.name = params?.name ?? 0
    this.loginId = params?.loginId ?? 0
  }

  public toEntity(): User {
    return new User({
      id: this.id,
      name: this.name,
      loginId: this.loginId,
    })
  }
}

export class UserRegisterRuleCollection extends RuleCollection {
  public constructor() {
    super()
    this.collection = {
      name: {
        required: constraints.required(),
        length: constraints.length(1, 15),
      },
      loginId: {
        required: constraints.required(),
        length: constraints.length(1, 15),
      },
    }
  }
}
