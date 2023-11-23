import { Request, Response } from 'express';
import { StudentServices } from './student.service';

// Controller function will call service function and it will pass req data to the service functions. It will call service function and its own function. Example in below. Then It will response the data

const createStudent = async (req: Request, res: Response) => {
  // We are using try catch to prevent unwanted error
  try {
    const student = req.body;

    const result = await StudentServices.createUserToDB(student);

    res.status(201).json({
      status: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (err) {
    res.status(406).json({
      status: false,
      mesage: 'Something went wrong',
      error: err,
    });
  }
};

// We have to export the controller function to access from route into an object
export const StudentController = {
  createStudent,
};
