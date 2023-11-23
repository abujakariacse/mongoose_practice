import { Schema, model } from 'mongoose';
import { Gurdian, LocalGurdian, Student, UserName } from './student.interface';

// Step - 2 => Creating a schema based on the interface
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const gurdianSchema = new Schema<Gurdian>({
  fatherContactNo: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
});
const localGurdianSchema = new Schema<LocalGurdian>({
  LocalGurdianName: {
    type: String,
    required: true,
  },
  LocalGurdianOccupation: {
    type: String,
    required: true,
  },
  LocalGurdianContactNo: {
    type: String,
    required: true,
  },
  LocalGurdianAddress: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: String,
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  gurdian: gurdianSchema,
  localGurdian: localGurdianSchema,
  profileImage: {
    type: String,
  },
  isActive: ['active', 'blocked'],
});

// Step - 3 => Creating a model
// It takes interface a generics and take a argument as a name and finally it takes the schema
export const StudentModel = model<Student>('Student', studentSchema);
