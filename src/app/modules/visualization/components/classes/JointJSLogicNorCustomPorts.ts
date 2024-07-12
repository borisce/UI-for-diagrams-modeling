import * as _ from 'lodash';
import * as joint from 'jointjs';
import { NorCustomPorts } from './norCustomPorts';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicNorCustomPorts {

    public createNorCustomPortsGate(norCustomPorts: NorCustomPorts) {
        var calculatedSize =  20 * norCustomPorts.inPorts;
        if (norCustomPorts.id !== null && norCustomPorts.position !== null && norCustomPorts.addingFromParsedCode === false) {
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
            
            
            var Nor = new joint.shapes.standard.Path({
                id: norCustomPorts.id,
                position: norCustomPorts.position,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomNor',
                name: norCustomPorts.name,
                bandwidth: norCustomPorts.bandwidth,
                inPorts: norCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 h50 q80,40 0,80 M246,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
        
            /*if(norCustomPorts.inPorts>2){
                var resizeCoeficient = 40
                var numberOfPortsAboveSize = norCustomPorts.inPorts - 2
                resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
                //outPortXOffset += Math.ceil(numberOfPortsAboveSize/2)*25
                //portsArray.push({group: 'out',attrs: {}, args:{x: outPortXOffset}})
                Nor.resize(resizeCoeficient,resizeCoeficient)
            }
            else{
                //portsArray.push({group: 'out',attrs: {}, args:{x: outPortXOffset}})
                Nor.resize(40,40)
            }
            //And.addPorts(portsArray)*/
        
            return Nor
            
            
            /*return new joint.shapes.logic.Nor({
                id: norCustomPorts.id,
                position: norCustomPorts.position,
                //size: { width: 90, height: 50 },
                elType: 'Nor',
                name: norCustomPorts.name,
                bandwidth: norCustomPorts.bandwidth,
                attrs: {
                    path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                    text: {
                        text: 'NOR\n' + and.name
                    }
                }
            });*/
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
                    class: 'input'
                }
            },
            markup: [{
                tagName: 'path',
                selector: 'portBody'
            }]
        };
        
        var defaultPosition;

        if(norCustomPorts.position === null){
            defaultPosition = { x: 75, y: 30 }; 
        }
        else{
            defaultPosition = norCustomPorts.position;
        }


        if(norCustomPorts.addingFromParsedCode == true){
            var Nor = new joint.shapes.standard.Path({
                id: norCustomPorts.id,
                position: norCustomPorts.position,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomNor',
                name: norCustomPorts.name,
                bandwidth: norCustomPorts.bandwidth,
                inPorts: norCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 h50 q80,40 0,80 M246,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
            var Nor = new joint.shapes.standard.Path({
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomNor',
                name: norCustomPorts.name,
                bandwidth: norCustomPorts.bandwidth,
                inPorts: norCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 h50 q80,40 0,80 M246,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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

        
    
        var inPortsXoffset = -28
        var portsArray = []
        var portsPositionChanges = []
        var portId;
        if(norCustomPorts.inPorts < 3){
            for(var i=1; i<=norCustomPorts.inPorts; i++){
                portId = norCustomPorts.name + '_in' + i    
                portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}, id: portId})
                
            }    
        }
        
        else if(norCustomPorts.inPorts > 2 && norCustomPorts.inPorts % 2 == 1){
            for(var i=1; i<=norCustomPorts.inPorts; i++){
                portId = norCustomPorts.name + '_in' + i
                if(norCustomPorts.inPorts >= 3){
                    inPortsXoffset = -8
                    if(i<=Math.floor(norCustomPorts.inPorts/2) + 1){
                        
                        if(i<=Math.floor(norCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(norCustomPorts.inPorts/3) && i<Math.floor(norCustomPorts.inPorts/2) + 1){
                            inPortsXoffset = inPortsXoffset + (((Math.floor(norCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(norCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                        if(i == (Math.floor(norCustomPorts.inPorts/2) + 1)){
                            inPortsXoffset = portsPositionChanges[portsPositionChanges.length - 1]        
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(norCustomPorts.inPorts/2)-1)]
                    }

                        portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}, id: portId})
                    
                }
                
                if(norCustomPorts.inPorts == 2){
                    portsArray.push({group: 'in',attrs: {}, args:{x: -28}, id: portId})
                }
                
                
            }
        }
        
        else if (norCustomPorts.inPorts > 2 && norCustomPorts.inPorts % 2 == 0){
            for(var i=1; i<=norCustomPorts.inPorts; i++){
                portId = norCustomPorts.name + '_in' + i
                if(norCustomPorts.inPorts >= 3){
                    var inPortsXoffset = -8
                    if(i<=Math.floor(norCustomPorts.inPorts/2)){
                        
                        if(i<=Math.floor(norCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(norCustomPorts.inPorts/3) && i<Math.floor(norCustomPorts.inPorts/2) + 1){
                            inPortsXoffset = inPortsXoffset + (((Math.floor(norCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(norCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(norCustomPorts.inPorts/2))]
                    }

                        portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}, id: portId})
                    
                }
                
                if(norCustomPorts.inPorts == 2){
                    portsArray.push({group: 'in',attrs: {}, args:{x: -28}, id: portId})
                }
                
                
            }
        }
        
        /*var outPortXOffset = 46
        if(norCustomPorts.inPorts>=3){
            var resizeCoeficient = 40
            var numberOfPortsAboveSize = norCustomPorts.inPorts - 2
            resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
            outPortXOffset =outPortXOffset*(resizeCoeficient/40)
            outPortXOffset = outPortXOffset-(3+(4*(Math.ceil(numberOfPortsAboveSize)-1)))
            Nor.resize(resizeCoeficient,resizeCoeficient)
        }
        else{
            Nor.resize(40,40)
        }*/
        portsArray.push({group: 'out',attributes:{name: norCustomPorts.name},args:{x: +(calculatedSize+25)}, attrs: {}, id: norCustomPorts.name + '_out1'})        
        Nor.addPorts(portsArray)
    
        return Nor
    }
}
