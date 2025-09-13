import type { User } from './user';

export type Session = {
  user: User;
  accessToken: string;
  refreshToken: string;
};