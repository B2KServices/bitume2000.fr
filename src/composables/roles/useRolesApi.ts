import { useAxios } from 'boot/axios.ts';
import { RoleCategoryModel } from 'src/models/role-category-model.ts';


export function useRolesApi() {
  const axios = useAxios();

  async function getCategories(): Promise<RoleCategoryModel[]> {
    return axios.$get<RoleCategoryModel[]>('roles/categories');
  }

  return {
    getCategories
  };
}
