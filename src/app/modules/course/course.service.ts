/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = (await Course.create(payload)).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find()
      .populate('preRequisiteCourses.course')
      .populate({
        path: 'preRequisiteCourses.course',
        populate: {
          path: 'preRequisiteCourses.course',
          populate: {
            path: 'preRequisiteCourses.course',
          },
        },
      }),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .pagination()
    .limit()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCouseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await Course.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseBasicInfo } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await Course.findByIdAndUpdate(id, courseBasicInfo, {
      new: true,
      runValidators: true,
      session,
    });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Course updation failed result',
      );
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((ele) => ele?.course && ele?.isDeleted)
        .map((ele) => ele?.course);

      const newPreRequisites = preRequisiteCourses.filter(
        (ele) => ele?.course && !ele?.isDeleted,
      );

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: {
                $in: deletedPreRequisites,
              },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Course updation failed deletedPreRequisiteCourses',
        );
      }
      const updatedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: newPreRequisites,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!updatedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Course updation failed updatedPreRequisiteCourses',
        );
      }
    }
    await session.commitTransaction();
    await session.endSession();

    const updatedCourse = await Course.findById(id)
      .populate('preRequisiteCourses.course')
      .populate({
        path: 'preRequisiteCourses.course',
        populate: {
          path: 'preRequisiteCourses.course',
          populate: {
            path: 'preRequisiteCourses.course',
            populate: {
              path: 'preRequisiteCourses.course',
              populate: {
                path: 'preRequisiteCourses.course',
              },
            },
          },
        },
      });
    if (!updatedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Course updation failed updatedCourse',
      );
    }

    return updatedCourse;
  } catch (err: unknown) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Course updation failed updatedCourse',
    );
  }
};

const courseFacultyAssignIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: {
          $each: payload,
        },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
const courseFacultyRemoveFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: {
        faculties: {
          $in: payload,
        },
      },
    },
    {
      new: true,
    },
  );
  return result;
};
export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCouseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  courseFacultyAssignIntoDB,
  courseFacultyRemoveFromDB,
};
