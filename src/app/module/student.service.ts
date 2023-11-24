import { TStudent } from './student.interface';
import { Student } from './student.model';

// Service function take argument from controller function and create a data using StudentModel.create(argument). Then return the result
const createUserToDB = async (studentData: TStudent) => {
  // Custom static method
  if (await Student.isStudentExist(studentData.id)) {
    throw new Error('Student Already Exist');
  }
  // Built in static method
  const result = Student.create(studentData);

  /*   // Built in instance method
  const student = new Student(studentData);

  // custom made instance method
  if (await student.isStudentExist(studentData.id)) {
    throw new Error('Student already exist');
  }
  const result = student.save(); */

  return result;
};

// Get all data
const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

// Get a specific user
const findStudent = async (studentId: string) => {
  // const result = await Student.findOne({ id: studentId });

  const result = await Student.aggregate([{ $match: { id: studentId } }]);
  return result;
};
// Deletd a specific student
const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne(
    { id: studentId },
    { isDeleted: true },
  );
  return result;
};

// Delete a specific user

// We have to return the function to access from controller function into an object
export const StudentServices = {
  createUserToDB,
  getAllStudents,
  findStudent,
  deleteStudentFromDB,
};
