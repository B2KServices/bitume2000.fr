import { RoleCategoryModel } from 'src/models/role-category-model.ts';

export type RoleModel = {
  id_role: string;
  id_discord: string;
  name: string;
  id_role_category: string;
  role_category: RoleCategoryModel;
};

export type RoleRequestModel = {
  name: string;
  id_requester: string;
  id_role_category: string;
};

export type RoleRequestDTOModel = {
  name: string;
  id_role_category: string;
};
