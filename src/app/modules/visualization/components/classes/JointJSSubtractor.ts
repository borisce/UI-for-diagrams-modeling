import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Subtractor } from '../classes/subtractor';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSSubtractor {

    public createSubtractor(subtractor: Subtractor) {
        if (subtractor.id !== null && subtractor.position !== null) {
            var SubtractorObject =  new joint.shapes.standard.Path({
                position: subtractor.position,
                size: { width: 50, height: 100 },
                id: subtractor.id,
                elType: 'subtractor',
                bandwidth: subtractor.dataBandwidth,
                name: subtractor.name,
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 3 10 7 0 10 0 6 3 5 0 4 z',
                        fill: 'white',
                    },
                    label: {
                        text: '  -' + '\n\n\n\n' + subtractor.name ,
                        fill: 'black',
                        "ref-y": '30%',
                        
                    }
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 10},
                                    end: {x: -30, y: 90}
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
                        },
                        out: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: 75, y: 50},
                                    end: {x: 75, y: 50}
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
                        } 
                    }
                }
            }); 

            if(subtractor.addingFromParsedCode == true){
                var portsArray = []
                var portId;
                
                for(var i=1; i<=2; i++){
                    portId = subtractor.name + '_in' + i
                    portsArray.push({group: 'in',bandwidth:subtractor.dataBandwidth, name: subtractor.name, id:portId})
                }

                let outBandwidth = subtractor.dataBandwidth 
                outBandwidth ++

                portsArray.push({group: 'out', bandwidth:outBandwidth, name: subtractor.name,id:subtractor.name + '_out1'})
                SubtractorObject.addPorts(portsArray)
            }
            
            return SubtractorObject
        }
        else{
            var SubtractorObject =  new joint.shapes.standard.Path({
                position: { x: 75, y: 30 },
                size: { width: 50, height: 100 },
                elType: 'subtractor',
                bandwidth: subtractor.dataBandwidth,
                name: subtractor.name,
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 3 10 7 0 10 0 6 3 5 0 4 z',
                        fill: 'white',
                    },
                    label: {
                        text: '  -' + '\n\n\n\n' + subtractor.name ,
                        fill: 'black',
                        "ref-y": '30%',   
                    }
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 10},
                                    end: {x: -30, y: 90}
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
                        },
                        out: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: 75, y: 50},
                                    end: {x: 75, y: 50}
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
                        } 
                    }
                }
            });

            var portsArray = []
            var portId;
            
            for(var i=1; i<=2; i++){
                portId = subtractor.name + '_in' + i
                portsArray.push({group: 'in',bandwidth:subtractor.dataBandwidth,name: subtractor.name, id:portId})
            }

            let outBandwidth = subtractor.dataBandwidth 
            outBandwidth ++

            portsArray.push({group: 'out', bandwidth:outBandwidth, name: subtractor.name,id:subtractor.name + '_out1'})
            SubtractorObject.addPorts(portsArray)

            return SubtractorObject
        }
        

        /*return new joint.shapes.basic.Path({
            position: { x: 75, y: 30 },
            size: { width: 50, height: 100 },
            elType: 'subtractor',
            bandwidth: subtractor.dataBandwidth,
            name: subtractor.name,
            half: subtractor.half,
            portMarkup: '<polygon points="-5,-5 5,-5 10,0 30,0 10,0 5,5 -5,5 -5,-5" class = "port-body" style="fill: white; stroke: black"/>',
            ports: {
                groups: {
                    in: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: -30, y: 15},
                                end: {x: -30, y: 105}
                            }
                        },
                        attrs: {
                            '.port-body': {
                                magnet: 'passive',
                            }
                        },
                        label: {
                            position: {
                                name: 'center'
                            },
                        }
                    },
                    out: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: 60, y: 15},
                                end: {x: 60, y: 105}
                            }
                        },
                        attrs: {
                            '.port-body': {
                                magnet: true,
                            }
                        }
                    }
                }
            },
            attrs: {
                path: { d: 'M 0 0 L 10 3 10 7 0 10 z' },
                text: {
                    text: subtractor.name
                }
            }
        });*/

        
    }
}
