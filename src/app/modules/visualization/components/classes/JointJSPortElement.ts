import * as _ from 'lodash';
import { Port } from '../classes/port';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSPortElement {

  public createNewPort(port: Port) {
    let portEl, bandwidth, portLabel, struct, position;

    if (port.bit) {
      bandwidth = 1;
    } else if (port.struct !== null && port.struct != undefined && port.struct !== 'undefined') {
      struct = port.struct;
      bandwidth = null;
    } else {
      bandwidth = port.bandwidth;
    }
    if (port.direction === 'in') { portLabel = '   '; position = 'right' } else { portLabel = '   '; position = 'right' }

    if (port.standalone) {
      portEl = {
        id: port.id,
        name: port.name,
        bandwidth,
        struct,
        standalone: port.standalone,
        group: port.direction,
        args: {},
        label: {
          position: {
            name: position,         
          }
        },
        attrs: { text: { text: portLabel } },
      };
    } else {
      portEl = {
        id: port.id,
        name: port.name,
        bandwidth,
        struct,
        standalone: port.standalone,
        group: port.direction,
        args: {},
        attrs: { text: { text: port.name, x: 0, y: 0}  }
      };
    }
    return portEl;
  }
}
