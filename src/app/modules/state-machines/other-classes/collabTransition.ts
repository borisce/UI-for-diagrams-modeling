import {OutputAssignments} from './OutputAssignments';
import * as joint from 'jointjs';
import {SignalAssignments} from './SignalAssignments';


export class CollabTransition {
  public source: joint.shapes.standard.Ellipse;
  public target: joint.shapes.standard.Ellipse;
  public condition: string;
  public id?: string;
  public outputs: OutputAssignments[];
  public signals: SignalAssignments[];
  public vertices?: { x: number, y: number }[];
}
