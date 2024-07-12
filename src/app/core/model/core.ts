import {CoreDetailPublic} from "./core-detail-public";
import {Repository} from "../../api/models/repository";
import {CoreVersion} from "../../api/models/core-version";

export interface Core extends CoreDetailPublic {
  active: boolean;
  latest_active_version: CoreVersion;
  usage_count: number;
  repository: Repository;
}
