import { UserInfo, ParamInfo } from './utils/userInterface.js';

declare global {
  namespace Express {
    interface Request {
      user?: UserInfo
      query?: {
        page?: string;
        limit?: string;
      };
    }
  }
}

export {};