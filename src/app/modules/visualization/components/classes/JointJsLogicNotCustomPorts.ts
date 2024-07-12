import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Not } from './logicGate';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicNotCustomPorts {

    public createNotCustomPortsGate(notCustomPorts: Not) {
        if (notCustomPorts.id !== null && notCustomPorts.position !== null && notCustomPorts.addingFromParsedCode === false) {
            
            var Not = new joint.shapes.standard.Path({
                id: notCustomPorts.id,
                position: notCustomPorts.position,
                //size: { width: 90, height: 50 },
                elType: 'CustomNot',
                name: notCustomPorts.name,
                bandwidth: notCustomPorts.bandwidth,
                inPorts: 1,
                attrs: {
                    body: {
                        refD: 'M 90 90 L 90 150 L 150 120 Z M156,120 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
                        fill: 'white',
                    },
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'left'
                            },
                            attrs: {
                                portBody: {
                                    magnet: 'passive',
                                    d:'M 30,0 L 10,0 5,5 -5,5 -5,-5 5,-5 10,0', //'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke: '#023047',
                                    strokeWidth: 2,
                                    class: 'input'
                                }
        
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody',
                            }]
                        },
                        out: {
                             position: {
                                name: 'right'
                             },
                             attrs: {
                                portBody: {
                                    magnet: true,
                                    d: 'M-25,0 L -5,0 -5,-5 5,-5 10,0 5,5 -5,5 -5,0 ',//'M -5,-5 L 5,-5 10,0 5,5 -5,5 -5,0 -25,0 M -5,0 -5,-5',
                                    fill: '#FFFFFF',
                                    stroke:'#023047',
                                    strokeWidth: 2,
                                    class: 'output'
                                }
                             },
                             markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]    
                        } 
                    }
                }
            });
            Not.resize(40,40)
            return Not    
        }
        
        var defaultPosition;

        if(notCustomPorts.position === null){
            defaultPosition = { x: 75, y: 30 }; 
        }
        else{
            defaultPosition = notCustomPorts.position;
        }
        

        if(notCustomPorts.addingFromParsedCode == true){
            var Not = new joint.shapes.standard.Path({
                id: notCustomPorts.id,
                position: defaultPosition,
                //size: { width: 90, height: 50 },
                elType: 'CustomNot',
                name: notCustomPorts.name,
                bandwidth: notCustomPorts.bandwidth,
                inPorts: 1,
                attrs: {
                    body: {
                        refD: 'M 90 90 L 90 150 L 150 120 Z M156,120 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
                        fill: 'white',
                    },
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'left',
                                /*args:{
                                    dx: -20
                                }*/
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
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody',
                            }]
                        },
                        out: {
                             position: {
                                name: 'right'
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
                             markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]    
                        } 
                    }
                }
            });
        }
        else{
            var Not = new joint.shapes.standard.Path({
                position: defaultPosition,
                //size: { width: 90, height: 50 },
                elType: 'CustomNot',
                name: notCustomPorts.name,
                bandwidth: notCustomPorts.bandwidth,
                inPorts: 1,
                attrs: {
                    body: {
                        refD: 'M 90 90 L 90 150 L 150 120 Z M156,120 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
                        fill: 'white',
                    },
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'left',
                                /*args:{
                                    dx: -20
                                }*/
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
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody',
                            }]
                        },
                        out: {
                             position: {
                                name: 'right'
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
                             markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]    
                        } 
                    }
                }
            });
        }
    
        
        Not.resize(40,40)
        var portsArray = []
        var inPortXoffset = -28
            portsArray.push({group: 'in',attributes:{name: notCustomPorts.name},attrs: {}, args:{x: inPortXoffset}, id:notCustomPorts.name + '_in1'})

        
        
        var outPortXOffset = 66
        portsArray.push({group: 'out',attributes:{name: notCustomPorts.name},attrs: {}, args:{x: +(outPortXOffset)}, id:notCustomPorts.name + '_out1'})

        Not.addPorts(portsArray)
        return Not
    }
}
