
import * as joint from 'jointjs';
import { Encoder } from './encoder';

// state save OG 28,-5 38,-5 43,0 38,5 28,5... 20,-5 27,-10 40,0 27,10 20,5

export class JointJSEncoder {

    public createEncoder(encoder: Encoder) {
        if (encoder.id !== null && encoder.position !== null) {
            var Encoder =  new joint.shapes.standard.Path({
                position: encoder.position,
                size: { width: 50, height: 100 },
                id: encoder.id,
                elType: 'encoder',
                bandwidth: encoder.dataBandwidth,
                name: encoder.name,
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 z',
                        fill: 'white',
                    },
                    label: {
                        text: 'ENCODER\n' + encoder.name ,
                        fill: 'black',
                        "ref-y": '80%',
                        
                    }
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 50},
                                    end: {x: -30, y: 50}
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
            
            return Encoder
        } 

        else{
            var Encoder =  new joint.shapes.standard.Path({
                position: { x: 75, y: 30 },
                size: { width: 50, height: 100 },
                elType: 'encoder',
                bandwidth: encoder.dataBandwidth,
                name: encoder.name,
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 z',
                        fill: 'white',
                    },
                    label: {
                        text: 'ENCODER\n' + encoder.name ,
                        fill: 'black',
                        "ref-y": '80%',
                        
                    }
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 50},
                                    end: {x: -30, y: 50}
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
            
            return Encoder
        }
            
            
            
        /*    new joint.shapes.basic.Path({
                position: encoder.position,
                size: { width: 50, height: 100 },
                id: encoder.id,
                elType: 'encoder',
                bandwidth: encoder.dataBandwidth,
                name: encoder.name,
                portMarkup: '<polygon points="-10,-9 -10,-11 20,-11 30,-11 30,-9  20,-9" class = "port-body" style="fill: white; stroke: black"/>',
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 10},
                                    end: {x: -30, y: 110}
                                }
                            },
                            attrs: {
                                '.port-body': {
                                    magnet: 'passive'
                                }
                            },
                            label: {
                                position: {
                                    name: 'top'
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
                                text: {
                                    text: encoder.name + '_out'
                                },
                                '.port-body': {
                                    magnet: true
                                }
                            },
                            label: {
                                position: {
                                    name: 'top'
                                },
                            }
                        }
                    }
                },
                attrs: {
                    path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                    text: {
                        text: 'ENCODER\n' + encoder.name
                    }
                }
            });
        }
        return new joint.shapes.basic.Path({
            position: { x: 75, y: 30 },
            size: { width: 50, height: 100 },
            elType: 'encoder',
            bandwidth: encoder.dataBandwidth,
            name: encoder.name,
            portMarkup: '<polygon points="-10,-9 -10,-11 20,-11 30,-11 30,-9  20,-9" class = "port-body" style="fill: white; stroke: black"/>',
            ports: {
                groups: {
                    in: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: -30, y: 5},
                                end: {x: -30, y: 115}
                            }
                        },
                        attrs: {
                            '.port-body': {
                                magnet: 'passive'
                            }
                        },
                        label: {
                            position: {
                                name: 'top'
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
                            text: {
                                text: encoder.name + '_out'
                            },
                            '.port-body': {
                                magnet: true
                            }
                        },
                        label: {
                            position: {
                                name: 'top'
                            },
                        }
                    }
                }
            },
            attrs: {
                path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                text: {
                    text: 'ENCODER\n' + encoder.name
                }
            }
        });*/
    }
}
