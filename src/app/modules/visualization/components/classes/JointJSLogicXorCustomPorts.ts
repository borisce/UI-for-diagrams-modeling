import * as _ from 'lodash';
import * as joint from 'jointjs';
import { XorCustomPorts } from './xorCustomPorts';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicXorCustomPorts {

    public createXorCustomPortsGate(xorCustomPorts: XorCustomPorts) {
        var calculatedSize =  20 * xorCustomPorts.inPorts;
        
        if (xorCustomPorts.id !== null && xorCustomPorts.position !== null && xorCustomPorts.addingFromParsedCode === false) {
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
            
            
            var Xor = new joint.shapes.standard.Path({
                id: xorCustomPorts.id,
                position: xorCustomPorts.position,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomXor',
                name: xorCustomPorts.name,
                bandwidth: xorCustomPorts.bandwidth,
                inPorts: xorCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 m-10,0 q20,40 0,80 m10,-80 h50 q80,40 0,80',
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
        
            /*if(xorCustomPorts.inPorts>=3){
                var resizeCoeficient = 40
                var numberOfPortsAboveSize = xorCustomPorts.inPorts - 2
                resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
                //outPortXOffset =outPortXOffset*(resizeCoeficient/40)
                //outPortXOffset = outPortXOffset-(3+(4*(Math.ceil(numberOfPortsAboveSize/2)-1)))
                Xor.resize(resizeCoeficient,resizeCoeficient)
            }
            else{
                Xor.resize(40,40)
            }*/
            return Xor
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

        if(xorCustomPorts.position === null){
            defaultPosition = { x: 75, y: 30 }; 
        }
        else{
            defaultPosition = xorCustomPorts.position;
        }
        

        if(xorCustomPorts.addingFromParsedCode == true){
            var Xor = new joint.shapes.standard.Path({
                id: xorCustomPorts.id,
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomXor',
                name: xorCustomPorts.name,
                bandwidth: xorCustomPorts.bandwidth,
                inPorts: xorCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 m-10,0 q20,40 0,80 m10,-80 h50 q80,40 0,80',
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
            var Xor = new joint.shapes.standard.Path({
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomXor',
                name: xorCustomPorts.name,
                bandwidth: xorCustomPorts.bandwidth,
                inPorts: xorCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 m-10,0 q20,40 0,80 m10,-80 h50 q80,40 0,80',
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
        if(xorCustomPorts.inPorts <= 2){
            for(var i=1; i<=xorCustomPorts.inPorts; i++){
                portId = xorCustomPorts.name + '_in' + i    
                portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}, id:portId})
                
            }    
        }
        
        else if(xorCustomPorts.inPorts > 2 && xorCustomPorts.inPorts % 2 == 1){
            for(var i=1; i<=xorCustomPorts.inPorts; i++){
                portId = xorCustomPorts.name + '_in' + i
                if(xorCustomPorts.inPorts >= 3){
                    inPortsXoffset = -8
                    if(i<=Math.floor(xorCustomPorts.inPorts/2) + 1){
                        
                        if(i<=Math.floor(xorCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(xorCustomPorts.inPorts/3) && i<Math.floor(xorCustomPorts.inPorts/2) + 1){
                            //if(xorCustomPorts.inPorts > 15){
                                //inPortsXoffset = (((Math.floor(xorCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(xorCustomPorts.inPorts/3)))*2)        
                            //}
                            //else{
                            inPortsXoffset = inPortsXoffset + (((Math.floor(xorCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(xorCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            //}
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                        if(i == (Math.floor(xorCustomPorts.inPorts/2) + 1)){
                            inPortsXoffset = portsPositionChanges[portsPositionChanges.length - 1]        
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(xorCustomPorts.inPorts/2)-1)]
                    }

                        portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}, id:portId})
                    
                }
                
                if(xorCustomPorts.inPorts == 2){
                    portsArray.push({group: 'in',attrs: {}, args:{x: -28}, id:portId})
                }
                
                
            }
        }
        
        else if (xorCustomPorts.inPorts > 2 && xorCustomPorts.inPorts % 2 == 0){
            for(var i=1; i<=xorCustomPorts.inPorts; i++){
                portId = xorCustomPorts.name + '_in' + i
                if(xorCustomPorts.inPorts >= 3){
                    var inPortsXoffset = -8
                    if(i<=Math.floor(xorCustomPorts.inPorts/2)){
                        
                        if(i<=Math.floor(xorCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(xorCustomPorts.inPorts/3) && i<Math.floor(xorCustomPorts.inPorts/2) + 1){
                            inPortsXoffset = inPortsXoffset + (((Math.floor(xorCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(xorCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(xorCustomPorts.inPorts/2))]
                    }

                        portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}, id:portId})
                    
                }
                
                if(xorCustomPorts.inPorts == 2){
                    portsArray.push({group: 'in',attrs: {}, args:{x: -28}, id:portId})
                }
                
                
            }
        }
        
        /*var outPortXOffset = 46
        if(xorCustomPorts.inPorts>=2){
            var resizeCoeficient = 40
            var numberOfPortsAboveSize = xorCustomPorts.inPorts - 2
            resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
            outPortXOffset =outPortXOffset*(resizeCoeficient/40)
            outPortXOffset = outPortXOffset-(3+(4*(Math.ceil(numberOfPortsAboveSize)-1)))
            Xor.resize(resizeCoeficient,resizeCoeficient)
        }
        else{
            Xor.resize(40,40)
        }*/
        portsArray.push({group: 'out',attributes:{name: xorCustomPorts.name},args:{x: +(calculatedSize+25)},attrs: {}, id:xorCustomPorts.name + '_out1'})

    Xor.addPorts(portsArray)

    return Xor
}
}
