import { RoleModel } from 'src/models/RoleModel';

export interface RoleCategoryModel {
  id: string;
  name: string;
  color: string;
  children: RoleModel[];
}
