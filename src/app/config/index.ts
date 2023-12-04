import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
};

/* 
// command for render

build : npm install;npm ci;npm run build
start : dist/server.js


*/
