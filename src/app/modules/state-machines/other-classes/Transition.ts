import {OutputAssignments} from './OutputAssignments';
import {SignalAssignments} from './SignalAssignments';

export class Transition {
  public source: string;
  public target: string;
  public condition: string;
  public id?: string;
  public outputs: OutputAssignments[];
  public signals: SignalAssignments[];
  public vertices?: { x: number, y: number }[];
}
