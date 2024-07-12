import { CoreVersion } from './core-version';

export interface AttachedCoreVersions {
  [uuid: string]: CoreVersion[];
}
