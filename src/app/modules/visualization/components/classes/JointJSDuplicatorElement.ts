import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Duplicator } from './duplicator';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSDuplicatorElement {

    public createDuplicatorElement(duplicator: Duplicator) {
        if (duplicator.id !== null) {
            return new joint.shapes.standard.Ellipse({
                position: duplicator.position,
                id: duplicator.id,
                size: { width: 10, height: 10 },
                attrs: {
                    body: {
                    fill: 'black',
                    magnet: true
                    }
                },
                bandwidth: duplicator.bandwidth,
                struct: duplicator.struct,
                duplicatedPort: duplicator.duplicatedPort,
                elType: 'duplicator',
                ogStandalone: duplicator.wasDuplicatedStandalone
            });
        }
        return new joint.shapes.standard.Ellipse({
            position: duplicator.position,
            size: { width: 10, height: 10 },
            attrs: {
                body: {
                fill: 'black',
                magnet: true
                }
            },
            bandwidth: duplicator.bandwidth,
            struct: duplicator.struct,
            duplicatedPort: duplicator.duplicatedPort,
            elType: 'duplicator',
            ogStandalone: duplicator.wasDuplicatedStandalone
        });
    }
}
