import {CoreOrganization} from "./core-organization";
import {CoreAuthor} from "./core-author";
import {CoreVersionPublic} from "./core-version-public";

export interface CoreUsage {
  user: CoreAuthor;
  organization: CoreOrganization;
  active_version: CoreVersionPublic;
  up_to_major_version: number;
}
