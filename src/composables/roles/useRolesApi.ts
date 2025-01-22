import { useAxios } from 'boot/axios.ts';
import { RoleCategoryModel } from 'src/models/role-category-model.ts';
import {
  RoleModel,
  RoleRequestDTOModel,
  RoleRequestModel,
} from 'src/models/role-model.ts';

export function useRolesApi() {
  const axios = useAxios();

  async function getCategories(): Promise<RoleCategoryModel[]> {
    return axios.$get<RoleCategoryModel[]>('roles/categories');
  }

  async function requestRole(data: RoleRequestDTOModel) {
    return axios.$post('roles/requests', data);
  }

  async function getRequestRole(): Promise<RoleRequestModel[]> {
    return axios.$get('roles/requests');
  }

  async function approve(id_request: string): Promise<RoleModel> {
    return axios.$post('roles/approve', { id_request: id_request });
  }

  return {
    getCategories,
    requestRole,
    getRequestRole,
    approve,
  };
}
