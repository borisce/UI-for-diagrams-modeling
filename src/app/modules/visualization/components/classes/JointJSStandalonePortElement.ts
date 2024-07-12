import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Port } from '../classes/port';
import { Injectable } from '@angular/core';

// state save OG 28,-5 38,-5 43,0 38,5 28,5... 20,-5 27,-10 40,0 27,10 20,5

@Injectable()
export class JointJSStandalonePortElement {

    public createStandalonePort(port: Port) {
        //let points = '';
        //let path = '';
        //var refXValue = <number>0;
        let bandwidth = 1;
        let struct = null;
        if (!port.bit) { bandwidth = port.bandwidth; }
        if (port.struct !== null && port.struct !== 'undefined' && port.struct !== undefined) {
            bandwidth = null;
            struct = port.struct;
        }
        var nameOffset:number = 0

        if(port.name.length >9){
            nameOffset = (port.name.length - 9) *4
        }

        /*if(port.direction === 'out') {
            points = "1 -9 37 -9 53 0 37 9 1 9";
            path = "M 0 0 L 10 0 15 5 10 10 0 10 z";
        } else {
            points = "1 0 17 -9 54 -9 54 9 17 9";
            path = "M 5 0 L 15 0 15 10 5 10 0 5 z";
        }*/

        if (port.parentElementId !== null && port.parentElementPosition !== null) {
            if(port.direction === 'out') {
                return new joint.shapes.basic.Path({
                    position: port.parentElementPosition,
                    size: { width: 55, height: 20 },
                    id: port.parentElementId,
                    elType: 'standalonePort',
                    bandwidth,
                    struct,
                    portMarkup: `<polygon points="1 -9 37 -9 53 0 37 9 1 9" class = "port-body"/>`,
                    ports: {
                        groups: {
                            in: {
                                attrs: {
                                    '.port-body': {
                                        magnet: 'passive'
                                    }
                                },
                                label: {
                                    position: {
                                        name: 'center'
                                    },
                                }
                            },
                            out: {
                                attrs: {
                                    '.port-body': {
                                        magnet: true
                                    }
                                }
                            }
                        }
                    },
                    attrs: {        
                        path: { d: "M 0 0 L 10 0 15 5 10 10 0 10 z" },
                        text: {
                            text: port.name,
                            'ref-y': -25,
                            'ref-x':  -30,
                            'x': -nameOffset
                        }
                    }
                });
            }
            else{
                return new joint.shapes.basic.Path({
                    position: port.parentElementPosition,
                    size: { width: 55, height: 20 },
                    id: port.parentElementId,
                    elType: 'standalonePort',
                    bandwidth,
                    struct,
                    portMarkup: `<polygon points="1 0 17 -9 54 -9 54 9 17 9" class = "port-body"/>`,
                    ports: {
                        groups: {
                            in: {
                                attrs: {
                                    '.port-body': {
                                        magnet: 'passive'
                                    }
                                },
                                label: {
                                    position: {
                                        name: 'center'
                                    },
                                }
                            },
                            out: {
                                attrs: {
                                    '.port-body': {
                                        magnet: true
                                    }
                                }
                            }
                        }
                    },
                    attrs: {        
                        path: { d: "M 5 0 L 15 0 15 10 5 10 0 5 z" },
                        text: {
                            text: port.name,
                            'ref-y': -25,
                            'ref-x': 90,
                            'x': nameOffset
                        }
                    }
                });
            }
            
            
            
            
            /*return new joint.shapes.basic.Path({
                position: port.parentElementPosition,
                size: { width: 55, height: 20 },
                id: port.parentElementId,
                elType: 'standalonePort',
                bandwidth,
                struct,
                portMarkup: `<polygon points="${points}" class = "port-body"/>`,
                ports: {
                    groups: {
                        in: {
                            attrs: {
                                '.port-body': {
                                    magnet: 'passive'
                                }
                            },
                            label: {
                                position: {
                                    name: 'center'
                                },
                            }
                        },
                        out: {
                            attrs: {
                                '.port-body': {
                                    magnet: true
                                }
                            }
                        }
                    }
                },
                attrs: {        
                    path: { d: path },
                    text: {
                        text: port.name,
                        'ref-y': -25
                    }
                }
            });*/
        }
        else{
            if(port.direction === 'out') {
                return new joint.shapes.basic.Path({
                    position: { x: 75, y: 30 },
                    size: { width: 55, height: 20 },
                    elType: 'standalonePort',
                    bandwidth,
                    struct,
                    portMarkup: `<polygon points="1 -9 37 -9 53 0 37 9 1 9" class = "port-body"/>`,
                    ports: {
                        groups: {
                            in: {
                                attrs: {
                                    '.port-body': {
                                        magnet: 'passive'
                                    }
                                },
                                label: {
                                    position: {
                                        name: 'center'
                                    },
                                }
                            },
                            out: {
                                attrs: {
                                    '.port-body': {
                                        magnet: true
                                    }
                                }
                            }
                        }
                    },
                    attrs: {        
                        path: { d: "M 0 0 L 10 0 15 5 10 10 0 10 z" },
                        text: {
                            text: port.name,
                            'ref-y': -25,
                            'ref-x':  -30,
                            'x': -nameOffset
                        }
                    }
                });
            }
            else{
                return new joint.shapes.basic.Path({
                    position: { x: 75, y: 30 },
                    size: { width: 55, height: 20 },
                    elType: 'standalonePort',
                    bandwidth,
                    struct,
                    portMarkup: `<polygon points="1 0 17 -9 54 -9 54 9 17 9" class = "port-body"/>`,
                    ports: {
                        groups: {
                            in: {
                                attrs: {
                                    '.port-body': {
                                        magnet: 'passive'
                                    }
                                },
                                label: {
                                    position: {
                                        name: 'center'
                                    },
                                }
                            },
                            out: {
                                attrs: {
                                    '.port-body': {
                                        magnet: true
                                    }
                                }
                            }
                        }
                    },
                    attrs: {        
                        path: { d: "M 5 0 L 15 0 15 10 5 10 0 5 z" },
                        text: {
                            text: port.name,
                            'ref-y': -25,
                            'ref-x': 90,
                            'x': nameOffset
                        }
                    }
                });
            }
        }
        /*return new joint.shapes.basic.Path({
            position: { x: 75, y: 30 },
            size: { width: 55, height: 20 },
            elType: 'standalonePort',
            bandwidth,
            struct,
            portMarkup: `<polygon points="${points}" class = "port-body"/>`,
            ports: {
                groups: {
                    in: {
                        attrs: {
                            '.port-body': {
                                magnet: 'passive'
                            }
                        },
                        label: {
                            position: {
                                name: 'center'
                            },
                        }
                    },
                    out: {
                        attrs: {
                            '.port-body': {
                                magnet: true
                            }
                        }
                    }
                }
            },
            attrs: {
                path: { d: path },
                text: {
                    text: port.name,
                    'ref-y': -25,
                    'ref-x': refXValue, 
                }
            }
        });*/
    }
}
