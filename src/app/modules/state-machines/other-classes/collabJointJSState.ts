import {Injectable} from '@angular/core';
import * as joint from 'jointjs';
import {CollabState} from './collabState';

@Injectable()
export class CollabJointJSState {
  public insertCollabState(state: CollabState): joint.shapes.standard.Ellipse {
    if (state.initial === false) {
      return new joint.shapes.standard.Ellipse({
        position: state.position,
        size: {width: 100, height: 89},
        uniqueid: state.uniqueId,
        id: state.id,
        name: state.name,
        initial: state.initial,
        outputs: state.outputs,
        signals: state.signals,
        attrs: {
          body: {
            fill: 'white',
            magnet: 'passive'
          },
          label: {
            text: state.name,
            fill: 'black'
          }
        }
      });
    } else {
      return new joint.shapes.standard.Ellipse({
        position: state.position,
        size: {width: 100, height: 89},
        uniqueid: state.uniqueId,
        id: state.id,
        name: state.name,
        initial: state.initial,
        outputs: state.outputs,
        signals: state.signals,
        attrs: {
          body: {
            fill: 'white',
            magnet: 'passive',
            filter: {
              name: 'outline',
              args: {
                color: 'black',
                width: 1.5,
                margin: 1.5
              }
            }
          },
          label: {
            text: state.name,
            fill: 'black'
          }
        }
      });
    }
  }
}
