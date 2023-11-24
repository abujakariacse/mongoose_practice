import { Model } from 'mongoose';

// Step -1 => Creating interface
export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGurdian = {
  LocalGurdianName: string;
  LocalGurdianContactNo: string;
  LocalGurdianAddress: string;
  LocalGurdianOccupation: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TStudent = {
  id: string;
  name: TUserName;
  gender?: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  password: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};

// custom made static method
export interface StudentModel extends Model<TStudent> {
  isStudentExist(studentId: string): Promise<TStudent | null>;
}

/* // Custom made instance method
export type StudentMethods = {
  isStudentExist(studentId: string): Promise<TStudent | null>;
};

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>; */
