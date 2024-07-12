import {OutputAssignments} from './OutputAssignments';
import {SignalAssignments} from './SignalAssignments';

export class CollabState {
  public name: string;
  public uniqueId?: number;
  public initial: boolean;
  public id: string;
  public outputs: OutputAssignments[];
  public signals: SignalAssignments[];
  public position: { x: number, y: number };
}
