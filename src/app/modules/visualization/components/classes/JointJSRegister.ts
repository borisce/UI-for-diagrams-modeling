import * as _ from 'lodash';
import * as joint from 'jointjs';
import { Register } from '../classes/register';
import { Injectable } from '@angular/core';

@Injectable()
export class JointJSRegister {

    public createRegister(register: Register) {
        var resetLabel = ""
        if(register.resetPort == true){
            resetLabel = "RST"
        }
        if (register.id !== null && register.position !== null) {
            var Register = new joint.shapes.standard.Path({
                position: register.position,
                size: { width: 70, height: 140 },
                id: register.id,
                elType: 'register',
                bandwidth: register.dataBandwidth,
                struct: register.struct,
                enablePort: register.enablePort,
                resetPort: register.resetPort,
                name: register.name,
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 0 9 2 8 0 7 M 0 10 L 0 0',
                        fill: 'white',
                    },
                    label: {
                        text:"        " + resetLabel +"\n\n\n\n\n\n\n\n\n\n\n" +  register.name ,
                        fill: 'black',
                        "ref-y": '15%',
                        
                    }
                    
                },
                
                ports: {
                  groups: {
                    in: {
                      position: {
                          name: 'line',
                          args: {
                              start: {x: -30, y: 30},
                              end: {x: -30, y: 30}
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
                            name: 'right',
                            args: {
                                y: 0,
                                x: 35
                            }
                        }
                      },
                      markup: [{
                        tagName: 'path',
                        selector: 'portBody'
                      }]
                    },
                    rst: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: 50, y: -30},
                                end: {x: 50, y: -30},
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
                                name: 'right',
                                args: {
                                    y: 45,
                                    x: -12
                                }
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
                            end: {x: -30, y: 70}
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
                            name: 'right',
                            args: {
                                y: 0,
                                x: 35
                            }
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
                                start: {x: -30, y: 110},
                                end: {x: -30, y: 110}
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
                                name: 'right',
                                args: {
                                    y: 2,
                                    x: 50
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
                              start: {x: 95, y: 70},
                              end: {x: 95, y: 70}
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
                      label: {
                        position: {
                            name: 'left',
                            args: {
                                y: 0,
                                x: -32
                            }
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
            return Register
        }

        else{
            var Register = new joint.shapes.standard.Path({
                position: { x: 75, y: 30 },
                size: { width: 70, height: 140 },
                elType: 'register',
                bandwidth: register.dataBandwidth,
                struct: register.struct,
                enablePort: register.enablePort,
                resetPort: register.resetPort,
                name: register.name,
                
                attrs: {
                    body: {
                        refD: 'M 0 0 L 10 0 10 10 0 10 0 9 2 8 0 7 M 0 10 L 0 0',
                        fill: 'white',
                    },
                    
                    label: {
                        text:"        " + resetLabel +"\n\n\n\n\n\n\n\n\n\n\n" +  register.name ,
                        fill: 'black',
                        "ref-y": '15%',
                        
                    }
                    
                },
                
                ports: {
                    groups: {
                      in: {
                        position: {
                            name: 'line',
                            args: {
                                start: {x: -30, y: 30},
                                end: {x: -30, y: 30}
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
                                name: 'right',
                                args: {
                                    y: 0,
                                    x: 35
                                }
                            }
                        },
                        markup: [{
                          tagName: 'path',
                          selector: 'portBody'
                        }]
                      },
                      rst: {
                          position: {
                              name: 'line',
                              args: {
                                  start: {x: 50, y: -30},
                                  end: {x: 50, y: -30},
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
                                name: 'right',
                                args: {
                                    y: 45,
                                    x: -12
                                }
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
                              end: {x: -30, y: 70}
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
                            name: 'right',
                            args: {
                                y: 0,
                                x: 35
                            }
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
                                start: {x: -30, y: 110},
                                end: {x: -30, y: 110}
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
                                name: 'right',
                                args: {
                                    y: 2,
                                    x: 50
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
                                start: {x: 95, y: 70},
                                end: {x: 95, y: 70}
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
                        label: {
                            position: {
                                name: 'left',
                                args: {
                                    y: 0,
                                    x: -32
                                }
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
            return Register
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
