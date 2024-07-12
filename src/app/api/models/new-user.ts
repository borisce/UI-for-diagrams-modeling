/* Additional user model with extended information */
import {UUID} from "antlr4ts/misc/UUID";

export interface NewUser {
  uuid: UUID;
  email: string;
  firstName: string;
  lastName: string;
  balance: number;
  password: string;
  username: string;
  created: any;
  lastModified: any;
  lastAccountEdit: any;
  lastLogin: any;
  roles: any;
  active: boolean;
  organizationUUID: string;
}
