import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Multiplexor } from '../classes/multiplexor';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

// state save OG 28,-5 38,-5 43,0 38,5 28,5... 20,-5 27,-10 40,0 27,10 20,5

@Injectable()
export class JointJSMultiplexor {

    public createMultiplexor(multiplexor: Multiplexor) {
        var muxHeight
        var muxWidth
        var yStartIn
        var yEndIn
        if(multiplexor.selBandwidth == 1){
            muxHeight = 100
            muxWidth = 50
            yStartIn =10
            yEndIn =90
        }
        else{
            if(multiplexor.selBandwidth == 2){
                muxHeight = 160
                muxWidth = 80
                yStartIn =0
                yEndIn =160
            }
            else{
                muxHeight = 320
                muxWidth = 160
                yStartIn =0
                yEndIn =320
            }
        }
        if (multiplexor.id !== null && multiplexor.position !== null) {
            //console.log(multiplexor.dataPorts)
            var Multiplexor =  new joint.shapes.standard.Path({
                position: multiplexor.position,
                size: { width: muxWidth, height: muxHeight },
                id: multiplexor.id,
                elType: 'multiplexor',
                bandwidth: multiplexor.dataBandwidth,
                struct: multiplexor.struct,
                selBandwidth: multiplexor.selBandwidth,
                name: multiplexor.name,
                keyIndex: multiplexor.keyIndex,
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 3 10 7 0 10 z',
                        fill: 'white',
                    },
                    label: {
                        text: multiplexor.name ,
                        fill: 'black',
                        "ref-y": '80%',
                        textAnchor: "end"
                        
                    }
                    
                },

                ports: {
                    groups: {
                        in: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: -30, y: yStartIn},
                                    end: {x: -30, y: yEndIn}
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
                        sel: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: 30, y: -27},
                                    end: {x: 30, y: 2},
                                    angle: 90
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
                            label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 40,
                                        x: 5
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        },
                        out: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: muxWidth+25, y: muxWidth},
                                    end: {x: muxWidth+25, y: muxWidth}
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
            return Multiplexor
        }
        else{
            //console.log(multiplexor.dataPorts)
            var Multiplexor =  new joint.shapes.standard.Path({
                position: { x: 75, y: 30 },
                size: { width: muxWidth, height: muxHeight },
                elType: 'multiplexor',
                bandwidth: multiplexor.dataBandwidth,
                struct: multiplexor.struct,
                selBandwidth: multiplexor.selBandwidth,
                name: multiplexor.name,
                keyIndex: multiplexor.keyIndex,
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 3 10 7 0 10 z',
                        fill: 'white',
                    },

                    label: {
                        text:  multiplexor.name ,
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
                                    start: {x: -30, y: yStartIn},
                                    end: {x: -30, y: yEndIn}
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
                        sel: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: 30, y: -27},
                                    end: {x: 30, y: 2},
                                    angle: 90
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
                            label: {
                                position: {
                                    name: 'left',
                                    args: {
                                        y: 40,
                                        x: 5
                                    }
                                }
                            },
                            markup: [{
                                tagName: 'path',
                                selector: 'portBody'
                             }]
                        },
                        out: {
                            position: {
                                name: 'line',
                                args: {
                                    start: {x: muxWidth+25, y: muxWidth},
                                    end: {x: muxWidth+25, y: muxWidth}
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
            return Multiplexor
        }
        
        /*return new joint.shapes.basic.Path({
            position: { x: 75, y: 30 },
            size: { width: 50, height: 100 },
            elType: 'multiplexor',
            bandwidth: multiplexor.dataBandwidth,
            selBandwidth: multiplexor.selBandwidth,
            name: multiplexor.name,
            keyIndex: multiplexor.keyIndex,
            portMarkup: '<polygon points="-10,-9 -10,-11 20,-11 30,-11 30,-9  20,-9" class = "port-body" style="fill: white; stroke: black"/>',
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
                                magnet: 'passive'
                            }
                        },
                        label: {
                            position: {
                                name: 'center'
                            },
                        }
                    },
                    sel: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: -5, y: -27},
                                end: {x: 45, y: 2},
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
                            '.port-body': {
                                magnet: true
                            }
                        }
                    }
                }
            },
            attrs: {
                path: { d: 'M 0 0 L 10 3 10 7 0 10 z' },
                text: {
                    text: multiplexor.name
                }
            }
        });*/
    }
}
