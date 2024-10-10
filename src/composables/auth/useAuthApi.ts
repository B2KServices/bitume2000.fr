import { useAxios } from 'boot/axios.ts';
import { UserModel } from 'src/models/user-model.ts';

export function useAuthApi() {
  const axios = useAxios();

  async function login(username: string, password: string) {
    return axios.$post<UserModel>('auth/login', {
      username: username,
      password: password,
    });
  }

  async function login_discord(username: string) {
    return axios.$post<UserModel>('auth/login/discord', {
      username: username
    });
  }

  return { login, login_discord };
}
