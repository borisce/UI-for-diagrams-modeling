import * as joint from 'jointjs';
import {CollabTransition} from './collabTransition';
import {Injectable} from '@angular/core';

@Injectable()
export class CollabJointJSTransition {
  public insertCollabTransition(transition: CollabTransition): joint.shapes.standard.Link {
    const newTransition: joint.shapes.standard.Link = new joint.shapes.standard.Link({
      source: transition.source,
      target: transition.target,
      id: transition.id,
      equation: transition.condition,
      outputs: transition.outputs,
      signals: transition.signals,
    });
    newTransition.removeLabel(0);
    newTransition.appendLabel({
      attrs: {
        text: {
          text: transition.condition
        }
      }
    });
    newTransition.vertices(transition.vertices);
    return newTransition;
  }
}
