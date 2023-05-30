import config from '../../../config/config'
import { IUser } from './user.interface'
import User from './user.model'
import generateStudentId from './user.utlis'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto password generate
  const id = await generateStudentId()
  user.id = id

  const newUser = await User.create(user)
  // Default password set
  if (!user.password) {
    user.password = config.student_password as string
  }

  if (!newUser) {
    throw new Error('Fail to create user.')
  }
  return newUser
}

export default {
  createUser,
}
