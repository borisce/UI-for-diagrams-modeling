import * as _ from 'lodash';
import * as joint from 'jointjs';
import { AndCustomPorts } from './andCustomPorts';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicAndCustomPorts {

    public createAndCustomPortsGate(andCustomPorts: AndCustomPorts){
        var calculatedSize =  20 * andCustomPorts.inPorts;
        if (andCustomPorts.id !== null && andCustomPorts.position !== null && andCustomPorts.addingFromParsedCode === false){
            var portsIn = {
                position: {
                    name: 'line',
                    args: {
                        start: {x: -30, y: 0},
                        end: {x: -30, y: calculatedSize}
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
                markup: [{
                    tagName: 'path',
                    selector: 'portBody'
                }]
            };
        
            var portsOut = {
                position: {
                    name: 'line',
                    args: {
                        start: {x: calculatedSize+25, y: 0},
                        end: {x: calculatedSize+25, y: calculatedSize}
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
                markup: [{
                    tagName: 'path',
                    selector: 'portBody'
                }]
            };
            
            
            var And = new joint.shapes.standard.Path({
                id: andCustomPorts.id,
                position: andCustomPorts.position,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomAnd',
                name: andCustomPorts.name,
                bandwidth: andCustomPorts.bandwidth,
                inPorts: andCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M120,200 h-80 v-80 h80 q40,40 0,80',
                        fill: 'white',
                    },
                    
                },
                
                ports: {
                    groups: {
                        'in': portsIn,
                        'out': portsOut
                    }
                }
            });
        
            /*var inPortsXoffset = -8
            var portsArray = []
            for(var i=1; i<=andCustomPorts.inPorts; i++){
                portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}})
            }
        
            var outPortXOffset = 45*/
            
            /*if(andCustomPorts.inPorts>2){
                var resizeCoeficient = 40
                var numberOfPortsAboveSize = andCustomPorts.inPorts - 2
                resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
                //outPortXOffset += Math.ceil(numberOfPortsAboveSize/2)*25
                //portsArray.push({group: 'out',attrs: {}, args:{x: outPortXOffset}})
                And.resize(resizeCoeficient,resizeCoeficient)
            }
            else{
                //portsArray.push({group: 'out',attrs: {}, args:{x: outPortXOffset}})
                And.resize(40,40)
            }
            //And.addPorts(portsArray)*/
        
            return And
            
        }


        var portsIn = {
            position: {
                name: 'line',
                args: {
                    start: {x: -30, y: 0},
                    end: {x: -30, y: calculatedSize}
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
            markup: [{
                tagName: 'path',
                selector: 'portBody'
            }]
        };
    
        var portsOut = {
            position: {
                name: 'line',
                args: {
                    start: {x: calculatedSize+25, y: 0},
                    end: {x: calculatedSize+25, y: calculatedSize}
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
            markup: [{
                tagName: 'path',
                selector: 'portBody'
            }]
        };
        var defaultPosition;

        if(andCustomPorts.position === null){
            defaultPosition = { x: 75, y: 30 }; 
        }
        else{
            defaultPosition = andCustomPorts.position;
        }


        if(andCustomPorts.addingFromParsedCode == true){
            And = new joint.shapes.standard.Path({
                id: andCustomPorts.id,
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomAnd',
                name: andCustomPorts.name,
                bandwidth: andCustomPorts.bandwidth,
                inPorts: andCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M120,200 h-80 v-80 h80 q40,40 0,80',
                        fill: 'white',
                    },
                    
                },
                
                ports: {
                    groups: {
                        'in': portsIn,
                        'out': portsOut
                    }
                }
            });
        }
        else{
            var And = new joint.shapes.standard.Path({
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomAnd',
                name: andCustomPorts.name,
                bandwidth: andCustomPorts.bandwidth,
                inPorts: andCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M120,200 h-80 v-80 h80 q40,40 0,80',
                        fill: 'white',
                    },
                    
                },
                
                ports: {
                    groups: {
                        'in': portsIn,
                        'out': portsOut
                    }
                }
            });
        }
        
    
        var inPortsXoffset = -29
        var portsArray = []
        var portId;
        for(var i=1; i<=andCustomPorts.inPorts; i++){
            portId = andCustomPorts.name + '_in' + i
            portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}, id:portId})
        }
    
        //var outPortXOffset = 45
        
        /*if(andCustomPorts.inPorts>2){
            var resizeCoeficient = 40
            var numberOfPortsAboveSize = andCustomPorts.inPorts - 2
            resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
            outPortXOffset += Math.ceil(numberOfPortsAboveSize)*25
            portsArray.push({group: 'out',attributes:{name: andCustomPorts.name},attrs: {}, id:andCustomPorts.name + '_out1'})
            //And.resize(resizeCoeficient,resizeCoeficient)
        }
        else{*/
        portsArray.push({group: 'out',attributes:{name: andCustomPorts.name},args:{x: +(calculatedSize+25)}, attrs: {}, id:andCustomPorts.name + '_out1'})
            
        And.addPorts(portsArray)
    
        return And
    }
}
