import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  secret_access_token: process.env.SECRET_ACCESS_TOKEN,
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  secret_access_expires_in: process.env.SECRET_ACCESS_EXPIRES_IN,
  secret_refresh_expires_in: process.env.SECRET_REFRESH_EXPIRES_IN,
  nodemailer_email: process.env.NODEMAILER_EMAIL,
  nodemailer_passkey: process.env.NODEMAILER_PASSKEY,
  reset_pass_url: process.env.RESET_PASS_URL,
};

/* 
// command for render

build : npm install;npm ci;npm run build
start : dist/server.js


*/
