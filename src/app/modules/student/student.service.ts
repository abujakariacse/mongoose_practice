import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// Service function take argument from controller function and create a data using StudentModel.create(argument). Then return the result

// Get all data
const getAllStudents = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// Get a specific user
const findStudent = async (studentId: string) => {
  const result = await Student.findOne({ id: studentId })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// update a student into db
const updateStudentIntoDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const isStudentExist = Student.findOne({
    id: studentId,
    isDeleted: { $ne: true },
  });

  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  // update data without muting non premitive data
  const { name, gurdian, localGurdian, ...remainingStudentData } = payload;

  const modifiedData: Record<string, unknown> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedData[`gurdian.${key}`] = value;
    }
  }

  if (localGurdian && Object.keys(localGurdian).length) {
    for (const [key, value] of Object.entries(localGurdian)) {
      modifiedData[`localGurdian${key}`] = value;
    }
  }

  // student deleted (transaction - 1)
  const updatedStudent = await Student.findOneAndUpdate(
    { id: studentId },
    { $set: modifiedData },
    { new: true, runValidators: true },
  );

  if (!updatedStudent) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Student updated failed');
  }
  return updatedStudent;
};

// Deletd a specific student
const deleteStudentFromDB = async (studentId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isStudentExist = Student.findOne({
      id: studentId,
      isDeleted: { $ne: true },
    });
    if (!isStudentExist) {
      throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist");
    }

    // student deleted (transaction - 1)
    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student deletion failed');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student deletion failed');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Student deletion failed');
  }
};

// We have to return the function to access from controller function into an object
export const StudentServices = {
  getAllStudents,
  findStudent,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
