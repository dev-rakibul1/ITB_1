import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

// find student id
const findLastStudentId = async (): Promise<string | null | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  const uniqueId = lastStudent?.id;
  return uniqueId ? uniqueId.substring(uniqueId.length - 4) : null;
};

// generate student id
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  const fullIncrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  let incrementId = `${academicSemester?.year}`;
  incrementId = incrementId.substring(incrementId.length - 2); // last 2 desigit

  const newIncrementId = incrementId + academicSemester?.code + fullIncrementId;
  return newIncrementId;
};

// find faculty id
const findLastFacultyId = async (): Promise<string | null | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : null;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `F-${incrementId}`;
  return incrementId;
};

// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;
  console.log('incrementedId', incrementedId);
  return incrementedId;
};
