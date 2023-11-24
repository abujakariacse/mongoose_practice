import Joi from 'joi';
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/),
  middleName: Joi.string().required(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/),
});

const gurdianValidationSchema = Joi.object({
  fatherContactNo: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
});

const localGurdianValidationSchema = Joi.object({
  LocalGurdianName: Joi.string().required(),
  LocalGurdianOccupation: Joi.string().required(),
  LocalGurdianContactNo: Joi.string().required(),
  LocalGurdianAddress: Joi.string().required(),
});

// Define Joi schema for the main Student model
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female'),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  gurdian: gurdianValidationSchema.required(),
  localGurdian: localGurdianValidationSchema.required(),
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').required(),
});

export default studentValidationSchema;
