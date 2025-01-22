import { RoleCategoryModel } from 'src/models/role-category-model.ts';
import { UserModel } from 'src/models/user-model.ts';

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
  id_request_role: string;
  requester: UserModel;
  approved_users: UserModel[];
};

export type RoleRequestDTOModel = {
  name: string;
  id_role_category: string;
};
