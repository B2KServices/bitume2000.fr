export type UserModel = {
  id_user: string;
  username: string;
  id_discord: string;
  avatar_url: string;
  permission_level: number;
};

export type UserDTOModel = UserModel & {
  password: string;
};
