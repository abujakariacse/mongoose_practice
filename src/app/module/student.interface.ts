// Step -1 => Creating interface
export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type LocalGurdian = {
  LocalGurdianName: string;
  LocalGurdianContactNo: string;
  LocalGurdianAddress: string;
  LocalGurdianOccupation: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender?: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  localGurdian: LocalGurdian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};
