export interface SimulationConfiguration {
  simulator: string;
  use_all_design_files: boolean;
  top_module_file: string;
  testbench_file: string;
  output_folder: string;
  output_filename: string;
  dump_waveform: string;
  dump_waveform_filename: string;
  dump_level: number;
  dump_modules: string;
  simulationTestNumber: string;
  test_output: string;
}
