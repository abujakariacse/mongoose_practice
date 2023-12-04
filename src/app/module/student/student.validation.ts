import { z } from 'zod';
// Define Zod schemas for subdocuments
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name should be in capitalize format',
      },
    ),
  middleName: z.string(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last name should contain only alphabetic characters',
  }),
});

const gurdianValidationSchema = z.object({
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  fatherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
  motherName: z.string(),
});

const localGurdianValidationSchema = z.object({
  LocalGurdianName: z.string(),
  LocalGurdianOccupation: z.string(),
  LocalGurdianContactNo: z.string(),
  LocalGurdianAddress: z.string(),
});

// Define Zod schema for the main Student model
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
      contactNo: z.string(),
      emergencyContact: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      gurdian: gurdianValidationSchema,
      localGurdian: localGurdianValidationSchema,
      profileImage: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
