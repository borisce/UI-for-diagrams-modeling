import { NewUser } from './new-user';
import { Organization } from './organization';
import { Role } from './role';
import { TokenResponse } from './token-response';

export interface LoginResponse extends TokenResponse {
  user: NewUser;
  organization?: Organization;
}
