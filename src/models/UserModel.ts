export interface UserModel {
  id: string;
  name: string;
  points: number;
  coins: number;
  title: string;
  memesvotes: number;
  bestmeme: number;
  waifutime: number;
  password: string | null;
  squad: SquadModel;
}

export interface SquadModel {
  id: string;
  name: string;
  PointsTotal: number;
  PointsGiven: number;
  color: string;
}
