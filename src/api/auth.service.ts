import api from "./axios";

export const login = (
  username: string,
  password: string,
) => {
  return api.post(
    '/admins/auth/login',
    {
      username,
      password,
    }
  );
};