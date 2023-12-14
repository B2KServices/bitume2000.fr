import { RoleCategoryModel } from 'src/models/RoleCategoryModel';

export interface RoleModel {
  id: string;
  name: string;
  category: RoleCategoryModel | null;
}
