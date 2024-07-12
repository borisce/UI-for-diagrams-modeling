import * as _ from 'lodash';
import * as joint from 'jointjs';
import { XnorCustomPorts } from './xnorCustomPorts';
import { Injectable } from '@angular/core';
import { Port } from './port';

@Injectable()
export class JointJSLogicXnorCustomPorts {

    public createXnorCustomPortsGate(xnorCustomPorts: XnorCustomPorts) {
        var calculatedSize =  20 * xnorCustomPorts.inPorts;
        if (xnorCustomPorts.id !== null && xnorCustomPorts.position !== null && xnorCustomPorts.addingFromParsedCode === false) {
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
            
            
            var Xnor = new joint.shapes.standard.Path({
                id: xnorCustomPorts.id,
                position: xnorCustomPorts.position,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomXnor',
                name: xnorCustomPorts.name,
                bandwidth: xnorCustomPorts.bandwidth,
                inPorts: xnorCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 m-10,0 q20,40 0,80 m10,-80 h50 q80,40 0,80 M246,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
            var portsPositionChanges = []
            if(xnorCustomPorts.inPorts <= 3){
                for(var i=1; i<=xnorCustomPorts.inPorts; i++){
                        
                    portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}})
                    
                }    
            }
            
            else if(xnorCustomPorts.inPorts > 3 && xnorCustomPorts.inPorts % 2 == 1){
                for(var i=1; i<=xnorCustomPorts.inPorts; i++){

                    if(xnorCustomPorts.inPorts >= 4){
                        inPortsXoffset = -8
                        if(i<=Math.floor(xnorCustomPorts.inPorts/2) + 1){
                            
                            if(i<=Math.floor(xnorCustomPorts.inPorts/3)){
                                inPortsXoffset = inPortsXoffset + ((i-1)*3)
                                portsPositionChanges.push(inPortsXoffset)
                            }

                            if(i>Math.floor(xnorCustomPorts.inPorts/3) && i<Math.floor(xnorCustomPorts.inPorts/2) + 1){
                                inPortsXoffset = inPortsXoffset + (((Math.floor(xnorCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(xnorCustomPorts.inPorts/3)))*1)
                                portsPositionChanges.push(inPortsXoffset)
                            }
                            
                            if(i == (Math.floor(xnorCustomPorts.inPorts/2) + 1)){
                                inPortsXoffset = portsPositionChanges[portsPositionChanges.length - 1]        
                            }
                            
                        }
                        else{
                            inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(xnorCustomPorts.inPorts/2)-1)]
                        }

                            portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}})
                        
                    }
                    
                    if(xnorCustomPorts.inPorts == 2 || xnorCustomPorts.inPorts == 3){
                        portsArray.push({group: 'in',attrs: {}, args:{x: -8}})
                    }
                    
                    
                }
            }
            
            else if (xnorCustomPorts.inPorts > 3 && xnorCustomPorts.inPorts % 2 == 0){
                for(var i=1; i<=xnorCustomPorts.inPorts; i++){

                    if(xnorCustomPorts.inPorts >= 4){
                        var inPortsXoffset = -8
                        if(i<=Math.floor(xnorCustomPorts.inPorts/2)){
                            
                            if(i<=Math.floor(xnorCustomPorts.inPorts/3)){
                                inPortsXoffset = inPortsXoffset + ((i-1)*3)
                                portsPositionChanges.push(inPortsXoffset)
                            }

                            if(i>Math.floor(xnorCustomPorts.inPorts/3) && i<Math.floor(xnorCustomPorts.inPorts/2) + 1){
                                inPortsXoffset = inPortsXoffset + (((Math.floor(xnorCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(xnorCustomPorts.inPorts/3)))*1)
                                portsPositionChanges.push(inPortsXoffset)
                            }
                            
                        }
                        else{
                            inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(xnorCustomPorts.inPorts/2))]
                        }

                            portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}})
                        
                    }
                    
                    if(xnorCustomPorts.inPorts == 2 || xnorCustomPorts.inPorts == 3){
                        portsArray.push({group: 'in',attrs: {}, args:{x: -8}})
                    }
                    
                    
                }
            }*/
            
            //var outPortXOffset = 46
            /*if(xnorCustomPorts.inPorts>=3){
                var resizeCoeficient = 40
                var numberOfPortsAboveSize = xnorCustomPorts.inPorts - 2
                resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
                //outPortXOffset =outPortXOffset*(resizeCoeficient/40)
                //outPortXOffset = outPortXOffset-(3+(4*(Math.ceil(numberOfPortsAboveSize/2)-1)))
                Xnor.resize(resizeCoeficient,resizeCoeficient)
            }
            else{
                Xnor.resize(40,40)
            }*/
            //portsArray.push({group: 'out',attrs: {}, args:{x: +(outPortXOffset)}})
            //Xnor.addPorts(portsArray)
        
            return Xnor
            
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

        if(xnorCustomPorts.position === null){
            defaultPosition = { x: 75, y: 30 }; 
        }
        else{
            defaultPosition = xnorCustomPorts.position;
        }


        if(xnorCustomPorts.addingFromParsedCode == true){
            var Xnor = new joint.shapes.standard.Path({
                id: xnorCustomPorts.id,
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomXnor',
                name: xnorCustomPorts.name,
                bandwidth: xnorCustomPorts.bandwidth,
                inPorts: xnorCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 m-10,0 q20,40 0,80 m10,-80 h50 q80,40 0,80 M246,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
            var Xnor = new joint.shapes.standard.Path({
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomXnor',
                name: xnorCustomPorts.name,
                bandwidth: xnorCustomPorts.bandwidth,
                inPorts: xnorCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M200,200 h-50 q20,-40 0,-80 m-10,0 q20,40 0,80 m10,-80 h50 q80,40 0,80 M246,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
        if(xnorCustomPorts.inPorts <= 2){
            for(var i=1; i<=xnorCustomPorts.inPorts; i++){
                portId = xnorCustomPorts.name + '_in' + i    
                portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}, id:portId})
                
            }    
        }
        
        else if(xnorCustomPorts.inPorts > 2 && xnorCustomPorts.inPorts % 2 == 1){
            for(var i=1; i<=xnorCustomPorts.inPorts; i++){
                portId = xnorCustomPorts.name + '_in' + i
                if(xnorCustomPorts.inPorts >= 3){
                    inPortsXoffset = -8
                    if(i<=Math.floor(xnorCustomPorts.inPorts/2) + 1){
                        
                        if(i<=Math.floor(xnorCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(xnorCustomPorts.inPorts/3) && i<Math.floor(xnorCustomPorts.inPorts/2) + 1){
                            inPortsXoffset = inPortsXoffset + (((Math.floor(xnorCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(xnorCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                        if(i == (Math.floor(xnorCustomPorts.inPorts/2) + 1)){
                            inPortsXoffset = portsPositionChanges[portsPositionChanges.length - 1]        
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(xnorCustomPorts.inPorts/2)-1)]
                    }

                        portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}, id:portId})
                    
                }
                
                if(xnorCustomPorts.inPorts == 2){
                    portsArray.push({group: 'in',attrs: {}, args:{x: -28}, id:portId})
                }
                
                
            }
        }
        
        else if (xnorCustomPorts.inPorts > 2 && xnorCustomPorts.inPorts % 2 == 0){
            for(var i=1; i<=xnorCustomPorts.inPorts; i++){
                portId = xnorCustomPorts.name + '_in' + i
                if(xnorCustomPorts.inPorts >= 3){
                    var inPortsXoffset = -8
                    if(i<=Math.floor(xnorCustomPorts.inPorts/2)){
                        
                        if(i<=Math.floor(xnorCustomPorts.inPorts/3)){
                            inPortsXoffset = inPortsXoffset + ((i-1)*3)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }

                        if(i>Math.floor(xnorCustomPorts.inPorts/3) && i<Math.floor(xnorCustomPorts.inPorts/2) + 1){
                            inPortsXoffset = inPortsXoffset + (((Math.floor(xnorCustomPorts.inPorts/3))-1)*3) + ((i-(Math.floor(xnorCustomPorts.inPorts/3)))*1)
                            inPortsXoffset = inPortsXoffset -20 + i*2
                            portsPositionChanges.push(inPortsXoffset)
                        }
                        
                    }
                    else{
                        inPortsXoffset = portsPositionChanges[portsPositionChanges.length -(i-Math.floor(xnorCustomPorts.inPorts/2))]
                    }

                        portsArray.push({group: 'in',attrs: {}, args:{x: +inPortsXoffset}, id:portId})
                    
                }
                
                if(xnorCustomPorts.inPorts == 2){
                    portsArray.push({group: 'in',attrs: {}, args:{x: -28}, id:portId})
                }
                
                
            }
        }
        
        /*var outPortXOffset = 46
        if(xnorCustomPorts.inPorts>=3){
            var resizeCoeficient = 40
            var numberOfPortsAboveSize = xnorCustomPorts.inPorts - 2
            resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
            outPortXOffset =outPortXOffset*(resizeCoeficient/40)
            outPortXOffset = outPortXOffset-(3+(4*(Math.ceil(numberOfPortsAboveSize)-1)))
            Xnor.resize(resizeCoeficient,resizeCoeficient)
        }
        else{
            Xnor.resize(40,40)
        }*/
        portsArray.push({group: 'out',attributes:{name: xnorCustomPorts.name},args:{x: +(calculatedSize+25)},attrs: {}, id:portId = xnorCustomPorts.name + '_out1'})
        Xnor.addPorts(portsArray)
    
        return Xnor
    }
}
