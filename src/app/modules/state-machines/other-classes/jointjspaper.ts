import * as joint from 'jointjs';
import { Injectable } from '@angular/core';

@Injectable()
export class NewPaper {
  public createPaper(
    diagramPaper: any,
    diagramGraph: any,
    width: any,
    height: any,
    nameSpace: any
  ): joint.dia.Paper {
    return new joint.dia.Paper({
      el: diagramPaper,
      width,
      height,
      model: diagramGraph,
      drawGrid: true,
      gridSize: 5,
      cellViewNamespace: nameSpace,
      linkPinning: false, // links cant be pinned to the paper
      multiLinks: false, // prevents creation of multiple links between 2 elements
      interactive: {elementMove: true}, // enables element movement
      defaultLink: new joint.shapes.standard.Link(),
      defaultConnector: {
        name: 'smooth',
        /*
        args: {
            size: 7
        }
        */
      },
      defaultConnectionPoint: {
            name: 'boundary'
        },
        defaultAnchor: {
            name: 'perpendicular',
            args: {
                padding: 15
            }
        },
        defaultRouter: {
            name: 'normal'
        },
        defaultLinkAnchor: {
            name: 'connectionPerpendicular'
        },
        });
    }
}
