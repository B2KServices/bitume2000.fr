import { useAxios } from 'boot/axios.ts';
import { UserModel } from 'src/models/user-model.ts';
import { RoleModel } from 'src/models/role-model.ts';

export function useUsersApi() {
  const axios = useAxios();

  async function getMe(): Promise<UserModel> {
    return axios.$get<UserModel>('users/me');
  }

  async function updateMe(data: UserModel) {
    return axios.$patch<UserModel>('users/me', data);
  }

  async function getMyRoles(): Promise<RoleModel[]> {
    return axios.$get<RoleModel[]>('users/me/roles');
  }

  async function updateMyRole(
    idRole: string,
    addingRole: boolean,
  ): Promise<RoleModel[]> {
    return axios.$post<RoleModel[]>('users/me/roles', {
      id_role: idRole,
      adding_role: addingRole,
    });
  }

  return {
    getMe,
    updateMe,
    getMyRoles,
    updateMyRole,
  };
}
