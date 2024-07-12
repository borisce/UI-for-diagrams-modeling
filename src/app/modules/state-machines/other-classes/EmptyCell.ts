import {Inputs} from './Inputs';
import {Outputs} from './Outputs';
import {Signals} from './Signals';
import {Parameters} from './Parameters';

export interface EmptyCell {
  machineType: string;
  drawingMode: boolean;
  codeToBeGenerated: string;
  inputs: Inputs[];
  outputs: Outputs[];
  signals: Signals[];
  parameters: Parameters[];
  id?: string;
}
