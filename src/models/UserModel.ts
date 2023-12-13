import { SquadModel } from 'src/models/SquadModel';

export interface UserModel {
  id: string;
  name: string;
  avatar: string | null;
  points: number;
  coins: number;
  title: string;
  memesvotes: number;
  bestmeme: number;
  waifutime: number;
  password: string | null;
  squad: SquadModel;
}

