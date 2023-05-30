import config from '../../../config/config'
import { IUser } from './user.interface'
import User from './user.model'
import generateStudentId from './user.utlis'

export const createUserService = async (user: IUser): Promise<IUser | null> => {
  // auto password generate
  const id = await generateStudentId()
  user.id = id

  // Default password set
  if (!user.password) {
    user.password = config.student_password as string
  }
  const newUser = await User.create(user)

  if (!newUser) {
    throw new Error('Fail to create user.')
  }
  return newUser
}

// export default {
//   createUserService,
// }
