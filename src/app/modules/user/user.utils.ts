import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastestUser = async () => {
  const latestUser = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
    {
      sort: {
        createdAt: -1,
      },
    },
  ).lean();
  return latestUser?.id ? latestUser.id.substring(6) : undefined;
};

// Year semester 4 digit code
export const generateStudentId = async (
  payload: Partial<TAcademicSemester>,
) => {
  const currentId = (await findLastestUser()) || 0;
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  return (incrementId = `${payload.year}${payload.code}${incrementId}`);
};
