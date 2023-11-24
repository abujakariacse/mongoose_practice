import { Schema, model } from 'mongoose';
import { Gurdian, LocalGurdian, Student, UserName } from './student.interface';
import validator from 'validator';

// Step - 2 => Creating a schema based on the interface
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, "First name can't be more than 20 charecter"],
    validate: {
      validator: function (value: string) {
        const capitalizeFormat = value.charAt(0).toUpperCase() + value.slice(1);
        return value === capitalizeFormat;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid last name',
    },
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
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Gender should be male or female',
    },
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email address',
    },
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid blood group',
    },
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  gurdian: {
    type: gurdianSchema,
    required: [true, 'Gurdian is required'],
  },
  localGurdian: {
    type: localGurdianSchema,
    required: [true, 'Local guardian is required'],
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    required: true,
    default: 'active',
  },
});

// Step - 3 => Creating a model
// It takes interface a generics and take a argument as a name and finally it takes the schema
export const StudentModel = model<Student>('Student', studentSchema);
