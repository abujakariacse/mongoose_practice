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

const gurdianZodValidationSchema = z.object({
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  fatherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
  motherName: z.string(),
});

const localGurdianZodValidationSchema = z.object({
  LocalGurdianName: z.string(),
  LocalGurdianOccupation: z.string(),
  LocalGurdianContactNo: z.string(),
  LocalGurdianAddress: z.string(),
});

// Define Zod schema for the main Student model
const studentValidationSchemaZOD = z.object({
  id: z.string(),
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
  gurdian: gurdianZodValidationSchema,
  localGurdian: localGurdianZodValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchemaZOD;
