import { TSchedule } from './offeredCourse.interface';

export const hasTimeCoflict = (
  assignedSchedules: TSchedule[],
  newSchedules: TSchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`2002-02-24T${schedule.startTime}:00`);
    const existingEndTime = new Date(`2002-02-24T${schedule.endTime}:00`);

    const newStartTime = new Date(`2002-02-24T${newSchedules.startTime}:00`);
    const newEndTime = new Date(`2002-02-24T${newSchedules.endTime}:00`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
