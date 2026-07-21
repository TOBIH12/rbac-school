import { UserInfo } from './utils/userInterface';

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo;
      params?: {
        userId?: string;
        page?: string;
        role?: string;
      };
      query?: {
        page?: string;
        limit?: string;
      };
    }
  }
}

export {};