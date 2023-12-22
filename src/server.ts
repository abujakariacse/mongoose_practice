import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`The server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();

// Handle Unhandled Rejection for async code
process.on('unhandledRejection', () => {
  console.log(' Unhandled Rejection is detected');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
// Handle Uncaughtexpression
process.on('uncaughtException', () => {
  console.log(' Uncaught Exception is detected');
  process.exit(1);
});
