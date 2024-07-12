import { Injectable } from '@angular/core';
import { State } from './state';
import * as joint from 'jointjs';


@Injectable()
export class JointJsState {
    public insertState(state: State): joint.shapes.standard.Ellipse {
        if (state.initial === false) {
            return new joint.shapes.standard.Ellipse({
              position: {x: 75, y: 30},
              size: {width: 100, height: 89},
              uniqueid: state.id,
              name: state.name,
              initial: state.initial,
              outputs: [],
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
            return new joint.shapes.standard.Ellipse ({
              position: {x: 75, y: 30},
              size: {width: 100, height: 89},
              uniqueid: state.id,
              name: state.name,
              initial: state.initial,
              outputs: [],
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
