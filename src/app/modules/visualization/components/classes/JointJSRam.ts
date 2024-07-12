import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Register } from '../classes/register';
import { Ram } from '../classes/ram';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSRam {

    public createRam(ram: Ram) {
        if (ram.id !== null && ram.position !== null) {
            var Ram = new joint.shapes.standard.Path({
                position: ram.position,
                size: { width: 50, height: 100 },
                id: ram.id,
                elType: 'ram',
                addressBandwidth: ram.addressBandwidth,
                dataBandwidth: ram.dataBandwidth,
                usingDataStruct: ram.isDataStruct,
                struct: ram.dataStruct,
                name: ram.name,
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 z',
                        fill: 'white',
                    },
                    label: {
                        text:  ram.name ,
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
                              start: {x: -30, y: 10},
                              end: {x: -30, y: 10}
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
                    addr: {
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
                            selector: 'portBody'
                        }]
                    },
                    we: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: -30, y: 90},
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
                            selector: 'portBody'
                        }]
                    },
                    clk: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: 20, y: -30},
                                end: {x: 20, y: -30},
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
                        text: + ram.name
                    }
                }*/
            });
            return Ram
        }

        else{
            var Ram = new joint.shapes.standard.Path({
                position: { x: 75, y: 30 },
                size: { width: 50, height: 100 },
                elType: 'ram',
                addressBandwidth: ram.addressBandwidth,
                dataBandwidth: ram.dataBandwidth,
                usingDataStruct: ram.isDataStruct,
                struct: ram.dataStruct,
                name: ram.name,
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 z',
                        fill: 'white',
                    },
                    label: {
                        text:  ram.name ,
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
                              start: {x: -30, y: 10},
                              end: {x: -30, y: 10}
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
                    addr: {
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
                            selector: 'portBody'
                        }]
                    },
                    we: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: -30, y: 90},
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
                            selector: 'portBody'
                        }]
                    },
                    clk: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: 20, y: -30},
                                end: {x: 20, y: -30},
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
                        text:'REGISTER\n' + register.name
                    }
                }*/
            });
            return Ram
        }

        /*return new joint.shapes.basic.Path({
            position: { x: 75, y: 30 },
            size: { width: 50, height: 100 },
            elType: 'register',
            bandwidth: register.dataBandwidth,
            name: register.name,
            portMarkup: '<polygon points="-10,-9 -10,-11 20,-11 30,-11 30,-9  20,-9" class = "port-body" style="fill: white; stroke: black"/>',
            ports: {
              groups: {
                in: {
                  position: {
                      name: 'line',
                      args: {
                          start: {x: -30, y: 15},
                          end: {x: -30, y: 45}
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
              rst: {
                position: {
                    name: 'line',
                    args: {
                        start: {x: -30, y: 45},
                        end: {x: -30, y: 75}
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
                      start: {x: -30, y: 75},
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
                      name: 'top'
                  },
              }
          },
              clk: {
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
                    text:'REGISTER\n' + register.name
                }
            }
        });*/
    }
}
