export type UserInfo = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
};

export type ParamInfo = {
        userId?: string;
        page: string;
        role?: string;
}