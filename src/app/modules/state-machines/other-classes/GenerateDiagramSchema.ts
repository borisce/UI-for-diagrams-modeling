import {Inputs} from './Inputs';
import {Outputs} from './Outputs';
import {Parameters} from './Parameters';
import {Signals} from './Signals';
import {CollabState} from './collabState';
import {Transition} from './Transition';

export class GenerateDiagramSchema {
  public machineType: string;
  public language: string;
  public inputs: Inputs[];
  public outputs: Outputs[];
  public signals: Signals[];
  public parameters: Parameters[];
  public states: CollabState[];
  public transitions: Transition[];
}
