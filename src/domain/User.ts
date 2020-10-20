import { constraints } from '@/lib/validator/constraints'
import { asyncConstraintFunction, RuleCollection, RuleResult } from '@/lib/validator/Rule'
import { UserRepository } from '@/repositories/UserRepository'

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
  protected userRepository: UserRepository

  public constructor(userRepository: UserRepository) {
    super()
    this.userRepository = userRepository
    this.collection = {
      name: {
        required: constraints.required(),
        length: constraints.maxLength(15),
      },
      loginId: {
        required: constraints.required(),
        length: constraints.maxLength(15),
        uniqueLoginId: {
          asyncRule: this.uniqueLoginId(),
        },
      },
    }
  }

  protected uniqueLoginId(): asyncConstraintFunction {
    return async (value: any, parameters: Record<string, any>, context: Record<string, any>): Promise<RuleResult> => {
      const okResponse = {
        ok: true,
      }
      const errorResponse = {
        ok: false,
        message: '既に使用されているログインIDです。',
      }

      const isExist = await this.userRepository.isLoginIdExist(value)
      if (isExist) {
        return errorResponse
      }

      return okResponse
    }
  }
}

export class UserEditRuleCollection extends UserRegisterRuleCollection {
  public constructor(userRepository: UserRepository) {
    super(userRepository)

    this.collection['loginId']['uniqueLoginId'] = {
      asyncRule: this.uniqueLoginId(),
    }
  }
}
