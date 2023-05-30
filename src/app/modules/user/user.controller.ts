import { Request, Response } from 'express'
import { createUserService } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await createUserService(user)
    res.status(200).json({
      success: true,
      message: 'User create successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error || 'Fail to create user!',
    })
  }
}

export default {
  createUser,
}
