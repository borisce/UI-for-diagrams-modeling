import { User } from './user';
import { CoreVersion } from './core-version';

export interface Core {
  uuid: string;
  name: string;
  author: User;
  category: string;
  price: number;
  latest_version: CoreVersion;
}
