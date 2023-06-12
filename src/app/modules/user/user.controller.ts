import { RequestHandler } from 'express';
import { userServices } from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await userServices.createUserService(user);
    res.status(200).json({
      success: true,
      message: 'User create successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
};
