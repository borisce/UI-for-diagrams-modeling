import { User } from './user';
import { Repository } from './repository';
import { SimulationResultFile } from './simulation-result-file';
import { Organization } from './organization';
import { CoreVersion } from './core-version';
import { Core} from './core';

export interface CoreOwnership {
  uuid: string;
  type: string;
  core: Core;
  user: User;
  organization: Organization;
  repository: Repository;
  active_core_version: CoreVersion;
  active: boolean;
}
