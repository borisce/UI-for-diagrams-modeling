import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Nor, Nand, Xnor, Xor, Not } from './logicGate';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicGates {

    public createNorGate(gate: Nor) {
        if (gate.id !== null && gate.position !== null) {
            return new joint.shapes.logic.Nor({
                id: gate.id,
                name: gate.name,
                position: gate.position,
                size: { width: 90, height: 50 },
                elType: 'Nor',
                bandwidth: gate.bandwidth,
                attrs: {
                    path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                    text: {
                        text: 'NOR\n' + gate.name
                    }
                }
            });
        }
        return new joint.shapes.logic.Nor({
            position: { x: 75, y: 30 },
            size: { width: 90, height: 50 },
            name: gate.name,
            elType: 'Nor',
            bandwidth: gate.bandwidth,
            attrs: {
                path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                text: {
                    text: 'NOR\n' + gate.name
                }
            }
        });
    }

    public createNandGate(gate: Nand) {
        if (gate.id !== null && gate.position !== null) {
          return new joint.shapes.logic.Nand({
              id: gate.id,
              name: gate.name,
              position: gate.position,
              size: { width: 90, height: 50 },
              elType: 'Nand',
              bandwidth: gate.bandwidth,
              attrs: {
                path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                text: {
                    text: 'NAND\n' + gate.name
                }
            }
          });
      }
      return new joint.shapes.logic.Nand({
          position: { x: 75, y: 30 },
          size: { width: 90, height: 50 },
          name: gate.name,
          elType: 'Nand',
          bandwidth: gate.bandwidth,
          attrs: {
            path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
            text: {
                text: 'NAND\n' + gate.name
            }
        }
      });
  }

  public createXorGate(gate: Xor) {
    if (gate.id !== null && gate.position !== null) {
        return new joint.shapes.logic.Xor({
            id: gate.id,
            name: gate.name,
            position: gate.position,
            size: { width: 90, height: 50 },
            elType: 'Xor',
            bandwidth: gate.bandwidth,
            attrs: {
                path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                text: {
                    text: 'XOR\n' + gate.name
                }
            }
        });
    }
    return new joint.shapes.logic.Xor({
        position: { x: 75, y: 30 },
        size: { width: 90, height: 50 },
        name: gate.name,
        elType: 'Xor',
        bandwidth: gate.bandwidth,
        attrs: {
            path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
            text: {
                text: 'XOR\n' + gate.name
            }
        }
    });
}

public createXnorGate(gate: Xnor) {
  if (gate.id !== null && gate.position !== null) {
      return new joint.shapes.logic.Xnor({
          id: gate.id,
          name: gate.name,
          position: gate.position,
          size: { width: 90, height: 50 },
          elType: 'Xnor',
          bandwidth: gate.bandwidth,
          attrs: {
            path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
            text: {
                text: 'XNOR\n' + gate.name
            }
        }
      });
  }
  return new joint.shapes.logic.Xnor({
      position: { x: 75, y: 30 },
      size: { width: 90, height: 50 },
      name: gate.name,
      elType: 'Xnor',
      bandwidth: gate.bandwidth,
      attrs: {
        path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
        text: {
            text: 'XNOR\n' + gate.name
        }
    }
  });
}

public createNotGate(gate: Not) {
  if (gate.id !== null && gate.position !== null) {
      return new joint.shapes.logic.Not({
          id: gate.id,
          name: gate.name,
          position: gate.position,
          size: { width: 90, height: 50 },
          elType: 'Not',
          bandwidth: gate.bandwidth,
          attrs: {
            path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
            text: {
                text: 'NOT\n' + gate.name
            }
        }
      });
  }
  return new joint.shapes.logic.Not({
      position: { x: 75, y: 30 },
      size: { width: 90, height: 50 },
      name: gate.name,
      elType: 'Not',
      bandwidth: gate.bandwidth,
      attrs: {
        path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
        text: {
            text: 'NOT\n' + gate.name
        }
    }
  });
}
    
}