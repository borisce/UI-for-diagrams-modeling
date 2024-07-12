import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Adder } from '../classes/adder';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSAdder {

    public createAdder(adder: Adder) {
        if (adder.id !== null && adder.position !== null) {
            var AdderObject =  new joint.shapes.standard.Path({
                position: adder.position,
                size: { width: 50, height: 100 },
                id: adder.id,
                elType: 'adder',
                bandwidth: adder.dataBandwidth,
                name: adder.name,
                half: adder.half,
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 3 10 7 0 10 0 6 3 5 0 4 z',
                        fill: 'white',
                    },
                    label: {
                        text: '  +' + '\n\n\n\n' + adder.name ,
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

            if(adder.addingFromParsedCode == true){
                var portsArray = []
                var portId;
                
                for(var i=1; i<=2; i++){
                    portId = adder.name + '_in' + i
                    portsArray.push({group: 'in',name: adder.name,bandwidth:adder.dataBandwidth, id:portId})
                }

                let outBandwidth = adder.dataBandwidth 
                outBandwidth ++

                portsArray.push({group: 'out', bandwidth:outBandwidth, name: adder.name,id:adder.name + '_out1'})
                AdderObject.addPorts(portsArray)
            }
            
            return AdderObject
        }
        else{
            var AdderObject =  new joint.shapes.standard.Path({
                position: { x: 75, y: 30 },
                size: { width: 50, height: 100 },
                elType: 'adder',
                bandwidth: adder.dataBandwidth,
                name: adder.name,
                half: adder.half,
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 3 10 7 0 10 0 6 3 5 0 4 z',
                        fill: 'white',
                    },
                    label: {
                        text: '  +' + '\n\n\n\n' + adder.name ,
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
                portId = adder.name + '_in' + i
                portsArray.push({group: 'in',bandwidth:adder.dataBandwidth, name: adder.name, id:portId})
            }

            let outBandwidth = adder.dataBandwidth 
            outBandwidth ++

            portsArray.push({group: 'out', bandwidth:outBandwidth, name: adder.name,id:adder.name + '_out1'})
            AdderObject.addPorts(portsArray)


            return AdderObject
        }
        

        /*return new joint.shapes.basic.Path({
            position: { x: 75, y: 30 },
            size: { width: 50, height: 100 },
            elType: 'adder',
            bandwidth: adder.dataBandwidth,
            name: adder.name,
            half: adder.half,
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
                    text: adder.name
                }
            }
        });*/

        
    }
}
