import { User } from "./user";
import { Repository } from "./repository";
import { SimulationResultFile } from "./simulation-result-file";

export interface SynthesisResult {
    uuid: string;
    top_module_file: string;
    end_time: any;
    user: User;
    repository: Repository;
    files: SimulationResultFile[];
    file_explorer_open: boolean;
    synthesis_folder_open: boolean;
    layout_folder_open: boolean;
    log_folder_open: boolean;
    deleting_status: boolean;
}
