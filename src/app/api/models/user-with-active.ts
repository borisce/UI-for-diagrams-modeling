import { NewUser } from './new-user';

export interface UserWithActive extends NewUser {
  active: boolean;
}
