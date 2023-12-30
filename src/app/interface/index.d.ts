/* eslint-disable @typescript-eslint/consistent-type-definitions */

// Defining global namespace for adding custom properties on Request
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
