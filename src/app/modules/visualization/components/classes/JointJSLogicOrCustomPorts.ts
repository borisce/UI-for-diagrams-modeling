import * as _ from 'lodash';
import * as joint from 'jointjs';
import { OrCustomPorts } from './orCustomPorts';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicOrCustomPorts {

    public createOrCustomPortsGate(orCustomPorts: OrCustomPorts) {
        var calculatedSize =  20 * orCustomPorts.inPorts;

        if (orCustomPorts.id !== null && orCustomPorts.position !== null && orCustomPorts.addingFromParsedCode === false) {

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
                    selector: 'portBody',
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
            
            
            var Or = new joint.shapes.standard.Path({
                id: orCustomPorts.id,
                position: orCustomPorts.position,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomOr',
                name: orCustomPorts.name,
                bandwidth: orCustomPorts.bandwidth,
                inPorts: orCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M100,200 h-60 q20,-40 0,-80 h60 q80,40 0,80',
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
        
            
            return Or    
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

        if(orCustomPorts.position === null){
            defaultPosition = { x: 75, y: 30 }; 
        }
        else{
            defaultPosition = orCustomPorts.position;
        }


        if(orCustomPorts.addingFromParsedCode == true){
            var Or = new joint.shapes.standard.Path({
                id: orCustomPorts.id,
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomOr',
                name: orCustomPorts.name,
                bandwidth: orCustomPorts.bandwidth,
                inPorts: orCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M100,200 h-60 q20,-40 0,-80 h60 q80,40 0,80',
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
            var Or = new joint.shapes.standard.Path({
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomOr',
                name: orCustomPorts.name,
                bandwidth: orCustomPorts.bandwidth,
                inPorts: orCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M100,200 h-60 q20,-40 0,-80 h60 q80,40 0,80',
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

    
        var inPortsXoffset = -28 //tu -8
        var portsArray = []
        var portsPositionChanges = []
        var portId;
        if(orCustomPorts.inPorts <= 2){
            for(var i=1; i<=orCustomPorts.inPorts; i++){
                portId = orCustomPorts.name + '_in' + i
                Or.addPort({group: 'in',attrs: {}, args:{x: inPortsXoffset}, id:portId})
                
            }    
        }
        
        else if(orCustomPorts.inPorts > 2 && orCustomPorts.inPorts % 2 == 1){
            for(var i=1; i<=orCustomPorts.inPorts; i++){
                portId = orCustomPorts.name + '_in' + i
                if(orCustomPorts.inPorts >= 3){
                    inPortsXoffset = -8
                    if(i<=Math.floor(orCustomPorts.inPorts/2) + 1){
                        
                        if(i<=Math.floor(orCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(orCustomPorts.inPorts/3) && i<Math.floor(orCustomPorts.inPorts/2) + 1){
                            inPortsXoffset = inPortsXoffset + (((Math.floor(orCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(orCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                        if(i == (Math.floor(orCustomPorts.inPorts/2) + 1)){
                            inPortsXoffset = portsPositionChanges[portsPositionChanges.length - 1]        
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(orCustomPorts.inPorts/2)-1)]
                    }

                    Or.addPort({group: 'in',attrs: {}, args:{x: +(inPortsXoffset)}, id:portId})
                    
                }
                
                if(orCustomPorts.inPorts == 2){
                    Or.addPort({group: 'in',attrs: {}, args:{x: -28},id:portId})
                }
                
                
            }
        }
        
        else if (orCustomPorts.inPorts > 2 && orCustomPorts.inPorts % 2 == 0){
            for(var i=1; i<=orCustomPorts.inPorts; i++){
                portId = orCustomPorts.name + '_in' + i
                if(orCustomPorts.inPorts >= 3){
                    var inPortsXoffset = -8
                    if(i<=Math.floor(orCustomPorts.inPorts/2)){
                        
                        if(i<=Math.floor(orCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(orCustomPorts.inPorts/3) && i<Math.floor(orCustomPorts.inPorts/2) + 1){
                            inPortsXoffset = inPortsXoffset + (((Math.floor(orCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(orCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(orCustomPorts.inPorts/2))]
                    }
                    Or.addPort({group: 'in',attrs: {}, args:{x: +(inPortsXoffset)}, id:portId})
                    
                }
                
                if(orCustomPorts.inPorts == 2){
                    Or.addPort({group: 'in',attrs: {}, args:{x: -28}, id:portId})
                }
                
                
            }
        }
        
        /*var outPortXOffset = 46
        if(orCustomPorts.inPorts>2){
            var resizeCoeficient = 40
            var numberOfPortsAboveSize = orCustomPorts.inPorts - 2
            resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
            outPortXOffset =outPortXOffset*(resizeCoeficient/40)
            outPortXOffset = outPortXOffset-(3+(4*(Math.ceil(numberOfPortsAboveSize)-1)))
            //Or.resize(resizeCoeficient,resizeCoeficient)
        }
        else{
            //Or.resize(40,40)
        }*/
        portsArray.push({group: 'out',attributes:{name: orCustomPorts.name},args:{x: +(calculatedSize+25)},attrs: {},id:orCustomPorts.name + '_out1'})

        Or.addPorts(portsArray)
        return Or
    }
}
