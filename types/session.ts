import { User } from './user';

export type Session = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type SessionUser = User & {
  accessToken: string;
  refreshToken: string;
};