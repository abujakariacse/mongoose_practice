import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.nodemailer_email,
      pass: config.nodemailer_passkey,
    },
  });

  await transporter.sendMail({
    from: '"Mr. Jack 👻" <abujakaria316@gmail.com>', // sender address
    to, // list of receivers
    subject: 'Reset Password', // Subject line
    text: 'Reset your password within 10 mins!', // plain text body
    html, // html body
  });
};
