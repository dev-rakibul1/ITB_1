import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/config';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/acadamicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import generateStudentId, { generateFacultyId } from './user.utlis';

const createStudentService = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  const id = await generateFacultyId();
  user.id = id;

  // Default password set
  if (!user.password) {
    user.password = config.student_password as string;
  }

  // Set role
  user.role = 'student';

  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean();

  // -----------------START SESSION TRANSITION------------------
  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    //array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //set student -->  _id into user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

export const userServices = {
  createStudentService,
};
