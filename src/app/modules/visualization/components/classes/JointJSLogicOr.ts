import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Or } from './or';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicOr {

    public createOrGate(or: Or) {
        if (or.id !== null && or.position !== null) {
            return new joint.shapes.logic.Or({
                id: or.id,
                name: or.name,
                position: or.position,
                size: { width: 90, height: 50 },
                elType: 'Or',
                bandwidth: or.bandwidth,
                attrs: {
                    path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                    text: {
                        text: 'OR\n' + or.name
                    }
                }
            });
        }
        return new joint.shapes.logic.Or({
            position: { x: 75, y: 30 },
            size: { width: 90, height: 50 },
            name: or.name,
            elType: 'Or',
            bandwidth: or.bandwidth,
            attrs: {
                path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                text: {
                    text: 'OR\n' + or.name
                }
            }
        });
    }
}
