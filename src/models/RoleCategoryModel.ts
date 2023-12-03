export interface RoleCategoryModel {
  id: string;
  name: string;
  color: string;
  children: RoleModel[];
}

export interface RoleModel {
  id: string;
  name: string;
  // category: RoleCategoryModel;
}
