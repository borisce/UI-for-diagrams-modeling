import {CoreVersionPublic} from './core-version-public';

export interface CoreVersionOwned extends CoreVersionPublic {
  owned: boolean;
  active: boolean;
}
