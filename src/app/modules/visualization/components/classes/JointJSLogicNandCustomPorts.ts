import * as _ from 'lodash';
import * as joint from 'jointjs';
import { NandCustomPorts } from './nandCustomPorts';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSLogicNandCustomPorts {

    public createNandCustomPortsGate(nandCustomPorts: NandCustomPorts) {
        var calculatedSize =  20 * nandCustomPorts.inPorts;
        if (nandCustomPorts.id !== null && nandCustomPorts.position !== null && nandCustomPorts.addingFromParsedCode === false) {
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
            
            
            var Nand = new joint.shapes.standard.Path({
                id: nandCustomPorts.id,
                position: nandCustomPorts.position,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomNand',
                name: nandCustomPorts.name,
                bandwidth: nandCustomPorts.bandwidth,
                inPorts: nandCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M120,200 h-80 v-80 h80 q40,40 0,80 M146,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
            for(var i=1; i<=nandCustomPorts.inPorts; i++){
                portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}})
            }*/
        
            //var outPortXOffset = 45
            
            /*if(nandCustomPorts.inPorts>=3){
                var resizeCoeficient = 40
                var numberOfPortsAboveSize = nandCustomPorts.inPorts - 2
                resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
                //outPortXOffset += Math.ceil(numberOfPortsAboveSize/2)*25
                //portsArray.push({group: 'out',attrs: {}, args:{x: outPortXOffset}})
                Nand.resize(resizeCoeficient,resizeCoeficient)
            }
            else{
                //portsArray.push({group: 'out',attrs: {}, args:{x: outPortXOffset}})
                Nand.resize(40,40)
            }*/
        
            //Nand.addPorts(portsArray)
        
            return Nand
            
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

        if(nandCustomPorts.position === null){
            defaultPosition = { x: 75, y: 30 }; 
        }
        else{
            defaultPosition = nandCustomPorts.position;
        }


        if(nandCustomPorts.addingFromParsedCode == true){
            var Nand = new joint.shapes.standard.Path({
                id: nandCustomPorts.id,
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomNand',
                name: nandCustomPorts.name,
                bandwidth: nandCustomPorts.bandwidth,
                inPorts: nandCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M120,200 h-80 v-80 h80 q40,40 0,80 M146,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
            var Nand = new joint.shapes.standard.Path({
                position: defaultPosition,
                size: { width: calculatedSize, height: calculatedSize },
                elType: 'CustomNand',
                name: nandCustomPorts.name,
                bandwidth: nandCustomPorts.bandwidth,
                inPorts: nandCustomPorts.inPorts,
                attrs: {
                    body: {
                        refD: 'M120,200 h-80 v-80 h80 q40,40 0,80 M146,160 m -6,0 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0',
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
            for(var i=1; i<=nandCustomPorts.inPorts; i++){
                portId = nandCustomPorts.name + '_in' + i
                portsArray.push({group: 'in',attrs: {}, args:{x: inPortsXoffset}, id:portId})
            }
        
            //var outPortXOffset = 65
            
            /*if(nandCustomPorts.inPorts>=3){
                var resizeCoeficient = 40
                var numberOfPortsAboveSize = nandCustomPorts.inPorts - 2
                resizeCoeficient = 40 + Math.ceil(numberOfPortsAboveSize)*25
                outPortXOffset += Math.ceil(numberOfPortsAboveSize)*25
                portsArray.push({group: 'out',attributes:{name: nandCustomPorts.name},attrs: {}, args:{x: outPortXOffset}, id:portId = nandCustomPorts.name + '_out1'})
                Nand.resize(resizeCoeficient,resizeCoeficient)
            }
            else{*/
            portsArray.push({group: 'out',attributes:{name: nandCustomPorts.name},args:{x: +(calculatedSize+25)},attrs: {}, id:portId = nandCustomPorts.name + '_out1'})
                //Nand.resize(40,40)
            //}

        Nand.addPorts(portsArray)
    
        return Nand
    }
}
