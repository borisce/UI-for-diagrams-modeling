import * as _ from 'lodash';
import * as joint from 'jointjs';
import { And } from './and';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicAnd {

    public createAndGate(and: And) {
        if (and.id !== null && and.position !== null) {
            //console.log("existuje")
            return new joint.shapes.logic.And({
                id: and.id,
                position: and.position,
                size: { width: 90, height: 50 },
                elType: 'And',
                name: and.name,
                bandwidth: and.bandwidth,
                attrs: {
                    path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                    text: {
                        text: 'AND\n' + and.name
                    }
                }
            });
        }
        //console.log("novy")
        return new joint.shapes.logic.And({
            position: { x: 75, y: 30 },
            size: { width: 90, height: 50 },
            elType: 'And',
            name: and.name,
            bandwidth: and.bandwidth,
            attrs: {
                path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                text: {
                    text: 'AND\n' + and.name
                }
            }
        });
    }
}
