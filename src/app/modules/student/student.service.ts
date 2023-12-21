import { Student } from './student.model';

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
  // const result = await Student.findOne({ id: studentId });

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
  getAllStudents,
  findStudent,
  deleteStudentFromDB,
};
