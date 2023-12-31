import { array, z } from 'zod';

const preRequisiteSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: array(preRequisiteSchema).optional(),
  }),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().default(false).optional(),
    preRequisiteCourses: z.array(preRequisiteSchema).optional(),
  }),
});

const courseFacultyValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  courseFacultyValidationSchema,
};
