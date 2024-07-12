import { Module } from '../classes/module';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import * as joint from 'jointjs';
import { BoundElementProperty } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSModuleElement {

    public createModuleElement(moduleInfo: Module, addingFromParsedCode: boolean) {
        if (moduleInfo.id !== null && moduleInfo.position !== null) {
            return new joint.shapes.devs.Model({
                position: moduleInfo.position,
                size: { width: 180, height: 120 },
                id: moduleInfo.id,
                elType: 'module',
                instance: moduleInfo.instance,
                name: moduleInfo.name,
                //portMarkup: '<polygon points="-10,-10 10,-10 20,0 10,10 -10,10" class = "port-body" style="fill: white"/>',
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 0},
                                    end: {x: -30, y: 120}
                                }
                            },
                            attrs: {
                                portBody: {
                                    magnet: 'passive',
                                    d: 'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke: '#023047',
                                    strokeWidth: 2,
                                    class: 'input'
                                }
                            },
                            label: {
                                position: {
                                    name: 'right',
                                    args: {
                                        y: 0,
                                        x: 32
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        },
                        out: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: 205, y: 0},
                                    end: {x: 205, y: 120}
                                }
                            },
                            attrs: {
                                portBody: {
                                    magnet: true,
                                    d: 'M -5,-5 L 5,-5 10,0 5,5 -5,5 -5,0 -25,0 M -5,0 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke:'#023047',
                                    strokeWidth: 2,
                                    class: 'output'

                                }
                            },
                            label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 0,
                                        x: -30
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        }
                    }
                },
                attrs: {
                    '.label': { text: moduleInfo.name + '\n\n' + moduleInfo.instance, 'ref-x': .5, 'ref-y': .2, fontWeight: 'bold', },
                    rect: { fill: 'white' }
                }
            });
        }
        else if(addingFromParsedCode ==true){
            return new joint.shapes.devs.Model({
                position: moduleInfo.position,
                size: { width: 180, height: 120 },
                elType: 'module',
                id: moduleInfo.instance,
                instance: moduleInfo.instance,
                name: moduleInfo.name,
                portMarkup: '<polygon points="-10,-10 10,-10 20,0 10,10 -10,10" class = "port-body" style="fill: white"/>',
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 0},
                                    end: {x: -30, y: 120}
                                }
                            },
                            attrs: {
                                portBody: {
                                    magnet: 'passive',
                                    d: 'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke: '#023047',
                                    strokeWidth: 2,
                                    class: 'input'
                                }
                            },
                            label: {
                                position: {
                                    name: 'right',
                                    args: {
                                        y: 0,
                                        x: 32
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        },
                        out: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: 205, y: 0},
                                    end: {x: 205, y: 120}
                                }
                            },
                            attrs: {
                                portBody: {
                                    magnet: true,
                                    d: 'M -5,-5 L 5,-5 10,0 5,5 -5,5 -5,0 -25,0 M -5,0 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke:'#023047',
                                    strokeWidth: 2,
                                    class: 'output'
                                }
                            },
                            label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 0,
                                        x: -30
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        }
                    }
                },
                attrs: {
                    '.label': { text: moduleInfo.name + '\n\n' + moduleInfo.instance, 'ref-x': .5, 'ref-y': .2, fontWeight: 'bold', },
                    rect: { fill: 'white' }
                }
            });
        }
        else{
            return new joint.shapes.devs.Model({
                position: { x: 50, y: 50 },
                size: { width: 180, height: 120 },
                elType: 'module',
                instance: moduleInfo.instance,
                name: moduleInfo.name,
                portMarkup: '<polygon points="-10,-10 10,-10 20,0 10,10 -10,10" class = "port-body" style="fill: white"/>',
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 0},
                                    end: {x: -30, y: 120}
                                }
                            },
                            attrs: {
                                portBody: {
                                    magnet: 'passive',
                                    d: 'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke: '#023047',
                                    strokeWidth: 2,
                                    class: 'input'
                                }
                            },
                            label: {
                                position: {
                                    name: 'right',
                                    args: {
                                        y: 0,
                                        x: 32
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        },
                        out: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: 205, y: 0},
                                    end: {x: 205, y: 120}
                                }
                            },
                            attrs: {
                                portBody: {
                                    magnet: true,
                                    d: 'M -5,-5 L 5,-5 10,0 5,5 -5,5 -5,0 -25,0 M -5,0 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke:'#023047',
                                    strokeWidth: 2,
                                    class: 'output'
                                }
                            },
                            label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 0,
                                        x: -30
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        }
                    }
                },
                attrs: {
                    '.label': { text: moduleInfo.name + '\n\n' + moduleInfo.instance, 'ref-x': .5, 'ref-y': .2, fontWeight: 'bold', },
                    rect: { fill: 'white' }
                }
            });
        }
        
    }
}
