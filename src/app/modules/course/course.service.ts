import { QueryBuilder } from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
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
  const result = await Course.findById(id);
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await Course.findByIdAndUpdate(id, {
    isDeleted: true,
  });
  return null;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCouseFromDB,
  deleteCourseFromDB,
};
