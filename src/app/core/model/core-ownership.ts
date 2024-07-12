import {UUID} from "antlr4ts/misc/UUID";
import {CoreOrganization} from "./core-organization";
import {CoreVersionPublic} from "./core-version-public";
import {User} from "../../api/models/user";
import {Repository} from "../../api/models/repository";
import {CorePublic} from "./core-public";

export interface CoreOwnership {
  uuid: UUID;
  type: string;
  up_to_major_version: number;
  user: User;
  core: CorePublic;
  organization?: CoreOrganization;
  repository: Repository;
  active_core_version: CoreVersionPublic;
  active: boolean;
}
