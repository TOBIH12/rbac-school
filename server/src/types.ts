import { UserInfo, ParamInfo } from './utils/userInterface.ts';

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