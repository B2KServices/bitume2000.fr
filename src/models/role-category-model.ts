import { RoleModel } from 'src/models/role-model.ts';

export interface RoleCategoryModel {
  id_role_category: string;
  name: string;
  color: string;
  roles: RoleModel[];
}
