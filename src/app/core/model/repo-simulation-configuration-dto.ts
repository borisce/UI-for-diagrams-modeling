export interface RepoSimulationConfigurationDto {
  simulator: string;
  use_all_design_files: boolean;
  top_module_file: string;
  testbench_file: string;
  output_folder: string;
  output_filename: string;
  dump_waveform: boolean;
  dump_waveform_filename: string;
  selected_files_action: string;
  dump_level: string;
  dump_modules: string;
}
