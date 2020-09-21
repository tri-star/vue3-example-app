import { User } from '@/domain/User'
import { Factory } from 'fishery'

export const userFactory = Factory.define<User>(({ sequence }) => {
  return new User({
    id: sequence,
    name: `ユーザー${sequence}`,
    loginId: `user_${sequence}`,
  })
})
