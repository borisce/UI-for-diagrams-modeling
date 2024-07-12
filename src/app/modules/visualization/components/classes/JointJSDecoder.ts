
import * as joint from 'jointjs';
import { Decoder } from './decoder';
import { Injectable } from "@angular/core";

// state save OG 28,-5 38,-5 43,0 38,5 28,5... 20,-5 27,-10 40,0 27,10 20,5

@Injectable()
export class JointJSDecoder {

    public createDecoder(decoder: Decoder) {
        if (decoder.id !== null && decoder.position !== null) {
            var Decoder = new joint.shapes.standard.Path({
                position: decoder.position,
                size: { width: 50, height: 100 },
                id: decoder.id,
                elType: 'decoder',
                //bandwidth: (2 ** decoder.dataBandwidth).toString(),
                bandwidth: decoder.dataBandwidth.toString(),
                name: decoder.name,
                enable: decoder.enable,
                outSingle: decoder.outSingle,
                //portMarkup: '<polygon points="-10,-9 -10,-11 20,-11 30,-11 30,-9  20,-9" class = "port-body" style="fill: white; stroke: black"/>',
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 z',
                        fill: 'white',
                        
                    },
                    label: {
                        text: 'DECODER\n' + decoder.name ,
                        fill: 'black',
                        "ref-y":'80%',   
                    },
                    
                },
                
                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 20},
                                    end: {x: -30, y: 20}
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
                        },
                        enable: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 70},
                                    end: {x: -30, y: 70},
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
                            /*label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 20,
                                        x: 60
                                    }
                                }
                            },*/
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
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
                },
                /*attrs: {
                    path: { d: 'M 0 0 L 10 0 10 10 0 10 z' },
                    text: {
                        text: 'DECODER\n' + decoder.name
                    }
                }*/
            });

            return Decoder
        }
        else{
            var Decoder = new joint.shapes.standard.Path({
                position: { x: 75, y: 30 },
                size: { width: 50, height: 100 },
                elType: 'decoder',
                //bandwidth: (2 ** decoder.dataBandwidth).toString(),
                bandwidth: decoder.dataBandwidth.toString(),
                name: decoder.name,
                enable: decoder.enable,
                outSingle: decoder.outSingle,
                //portMarkup: '<polygon points="-10,-9 -10,-11 20,-11 30,-11 30,-9  20,-9" class = "port-body" style="fill: white; stroke: black"/>',
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 z',
                        fill: 'white',
                        
                    },
                    label: {
                        text: 'DECODER\n' + decoder.name ,
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
                                    start: {x: -30, y: 20},
                                    end: {x: -30, y: 20}
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
                        },
                        enable: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: 70},
                                    end: {x: -30, y: 70},
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
                            /*label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 20,
                                        x: 60
                                    }
                                }
                            },*/
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
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
                },
            });

            return Decoder
        }

        /*return new joint.shapes.basic.Path({
            position: { x: 75, y: 30 },
            size: { width: 50, height: 100 },
            elType: 'decoder',
            //bandwidth: (2 ** decoder.dataBandwidth).toString(),
            bandwidth: decoder.dataBandwidth.toString(),
            outSingle: decoder.outSingle,
            name: decoder.name,
            enable: decoder.enable,
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
                    enable: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: -30, y: -30},
                                end: {x: 60, y: -30},
                                angle: 90
                            }
                        },
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
                        position: {
                            name: 'line',
                            args: {
                                start: {x: 60, y: 15},
                                end: {x: 60, y: 105}
                            }
                        },
                        attrs: {
                            text: {
                                text: decoder.name + '_out'
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
                    text: 'DECODER\n' + decoder.name
                }
            }
        });*/
    }
}
