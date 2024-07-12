import {User} from "./user";
import {Repository} from "./repository";
import {SimulationResultFile} from "./simulation-result-file";

export interface SimulationResult {
  uuid: string;
  simulator: string;
  testbench_file: string;
  start_time: any;
  end_time: any;
  user: User;
  repository: Repository;
  files: SimulationResultFile[];
}
