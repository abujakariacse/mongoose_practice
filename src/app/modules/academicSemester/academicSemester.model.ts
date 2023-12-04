import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from './academicSemester.constant';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCodes,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: AcademicSemesterMonths,
    },
    endMonth: {
      type: String,
      enum: AcademicSemesterMonths,
    },
  },
  {
    timestamps: true,
  },
);

export const Semester = model<TAcademicSemester>(
  'academicSemster',
  AcademicSemesterSchema,
);
