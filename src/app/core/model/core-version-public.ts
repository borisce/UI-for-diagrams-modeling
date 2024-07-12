import { UUID } from 'antlr4ts/misc/UUID';

export interface CoreVersionPublic {
  uuid: UUID;
  version_number: string;
  change_log: string;
  created: string;
  last_modified: string;
}
