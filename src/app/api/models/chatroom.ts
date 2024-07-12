import { NewUser } from "./new-user";
import { Organization } from "./organization";
import { Repository } from "./repository";

export interface Chatroom {
  "@id": string;
  uuid: string;
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  members: any[];
  name: string;
  organization: Organization;
  owner: NewUser;
  repo: Repository;
  team: any;
}

export interface Message {
  uuid: string;
  author: string;
  epochTimestamp: number;
  message: string;
}
