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
