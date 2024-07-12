import {Organization} from "./organization";

export interface TokenResponse {
  token: string;
  tokenType: string;
  expiration: Date;
  organization?: Organization;
}
