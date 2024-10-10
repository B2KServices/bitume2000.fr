import { useAxios } from 'boot/axios.ts';
import { UserModel } from 'src/models/user-model.ts';


export function useUsersApi() {
  const axios = useAxios();

  async function getMe(): Promise<UserModel> {
    return axios.$get<UserModel>('users/me');
  }

  async function updateMe(data: UserModel) {
    return axios.$patch<UserModel>('users/me', data);
  }

  return {
    getMe,
    updateMe,
  };
}
