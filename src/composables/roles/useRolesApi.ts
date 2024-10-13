import { useAxios } from 'boot/axios.ts';
import { RoleCategoryModel } from 'src/models/role-category-model.ts';
import { RoleRequestDTOModel } from 'src/models/role-model.ts';

export function useRolesApi() {
  const axios = useAxios();

  async function getCategories(): Promise<RoleCategoryModel[]> {
    return axios.$get<RoleCategoryModel[]>('roles/categories');
  }

  async function requestRole(data: RoleRequestDTOModel) {
    return axios.$post('roles/request', data);
  }

  return {
    getCategories,
    requestRole,
  };
}
