import { Module } from '../classes/module';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import * as joint from 'jointjs';
import { BoundElementProperty } from '@angular/compiler';

export interface SerializedDiagrams {
    elements: [{
        position: { x: number, y: number },
        size: { width: number, height: number },
        elType: string,
        instance: string,
        name: string,
        portMarkup: string,
        ports: {
            groups: {
                in: {
                    attrs: {
                        '.port-body': {
                            magnet: string
                        }
                    },
                    label: {
                        position: {
                            name: string,
                            args: {
                                y: -1,
                                x: 25
                             }
                        }
                    }
                },
                out: {
                    attrs: {
                        '.port-body': {
                            fill: 'white',
                            magnet: true
                        }
                    },
                    label: {
                        position: {
                            name: 'left',
                            args: {
                                y: -1,
                                x: -15
                             }
                        }
                    }
                }
            }
        },
        attrs: {
            '.label': { text: string, 'ref-x': number, 'ref-y': number, fontWeight: 'bold', },
            rect: { fill: 'white' }
        }}];

}
