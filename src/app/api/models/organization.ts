import {UUID} from "antlr4ts/misc/UUID";

export interface Organization {
  uuid: string;
  name: string;
  owner: UUID;
  created: any;
  createdBy: string;
  lastModified: any;
  lastModifiedBy: string;
  invites: any;
  teams: any;
}
