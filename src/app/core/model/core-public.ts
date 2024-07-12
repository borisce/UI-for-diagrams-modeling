import {CoreAuthor} from './core-author';
import {CoreOrganization} from './core-organization';
import {UUID} from 'antlr4ts/misc/UUID';
import {CoreCategory} from './core-category';
import {CoreVersionPublic} from "./core-version-public";

export interface CorePublic {
  uuid: UUID;
  name: string;
  description: string;
  short_description: string;
  author?: CoreAuthor;
  organization?: CoreOrganization;
  category?: CoreCategory;
  price_without_updates: number;
  price_with_updates: number;
  upgrade_price: number;
  latest_version?: CoreVersionPublic;
}
