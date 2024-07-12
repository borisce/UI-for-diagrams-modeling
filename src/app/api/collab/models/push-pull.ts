/* tslint:disable */
import {Branch} from './branch';
import {GitCredentials} from './git-credentials';

export interface PushPull extends GitCredentials, Branch {
}
