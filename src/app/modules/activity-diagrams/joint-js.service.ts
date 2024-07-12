import { Injectable } from '@angular/core';
import dagre, { graphlib } from 'dagre';
import * as joint from 'jointjs';

@Injectable()
export class JointJsService {
    public createPaper = (paperElement: HTMLElement, graph: any, width: string, height: string, nameSpace: typeof joint.shapes) => {
        // https://resources.jointjs.com/docs/jointjs/v3.5/joint.html#dia.Paper.prototype.options 
        const newPaper = new joint.dia.Paper({
            el: paperElement,
            model: graph,
            width: width,
            height: height,
            gridSize: 10,
            drawGrid: { name: 'dot', args: { color: 'black' } },
            background: { color: 'white' },
            cellViewNamespace: nameSpace,
            interactive: true, // Element interaction on paper
            linkPinning: false, // Forbids link pinning on paper
            multiLinks: false,
            defaultLink: new joint.shapes.standard.Link({ router: { name: 'normal' } }),
            defaultConnector: { name: 'jumpover' },
            defaultConnectionPoint: { name: 'boundary' },
            //defaultAnchor: { name: 'perpendicular', args: { padding: 10 } },
            //defaultLinkAnchor: { name: 'perpendicular', args: { padding: 10 } },
            //defaultRouter: { name: 'normal' },
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent from linking with it self
                if (cellViewS === cellViewT) {
                    return false;
                }

                // Prevent making connection to a link
                if (cellViewT.model.attributes.type === 'standard.Link') {
                    return false;
                }

                return true;
            }
        });

        return newPaper;
    };

    public createAction = () => {
        const actionElement = new joint.shapes.standard.Rectangle({
            position: { x: 200, y: 100 },
            size: { width: 120, height: 60 },
            name: 'action',
            attrs: { label: { text: '', fontSize: 12 }, body: { rx: 10, ry: 10 } }
        });

        this.blockTextHighlight(actionElement);

        return actionElement;
    };

    public createLoop = () => {
        const loopElement = new joint.shapes.standard.Polygon({
            position: { x: 200, y: 100 },
            size: { width: 100, height: 100 },
            name: 'loop',
            attrs: { label: { text: '', fontSize: 12 }, body: { transform: 'rotate(45, 50, 50)', stroke: 'green' } }
        });

        this.blockTextHighlight(loopElement);

        return loopElement;
    }

    public createDiamond = (type: 'if' | 'case' | 'merge', color: string) => {
        const diamondElement = new joint.shapes.standard.Polygon({
            position: { x: 100, y: 200 },
            size: { width: 100, height: 100 },
            name: type,
            attrs: {
                label: {
                    text: '',
                    fontSize: 12,
                },
                body: { transform: 'rotate(45, 50, 50)', stroke: color }
            },
        });

        this.blockTextHighlight(diamondElement);

        return diamondElement;
    };

    public createStart = () => {
        const startElement = new joint.shapes.standard.Ellipse({
            position: { x: 100, y: 100 },
            size: { width: 70, height: 70 },
            name: 'start',
            attrs: {
                body: {
                    fill: 'black',
                    magnet: 'passive'
                },
                label: {
                    text: 'Start',
                    fill: 'white',
                    fontSize: 12,
                    fontWeight: 'bold'
                }
            }
        });

        this.blockTextHighlight(startElement);

        return startElement;
    };

    public createEnd = () => {
        const endElement = new joint.shapes.standard.Ellipse({
            position: { x: 150, y: 100 },
            size: { width: 70, height: 70 },
            name: 'end',
            attrs: {
                body: {
                    fill: 'black',
                    magnet: 'passive'
                },
                label: {
                    text: 'End',
                    fill: 'white',
                    fontSize: 12,
                    fontWeight: 'bold'
                }
            }
        });

        this.blockTextHighlight(endElement);

        return endElement;
    };

    public formatPaper = (graph: joint.dia.Graph) => {
        joint.layout.DirectedGraph.layout(graph, {
            dagre: dagre,
            graphlib: graphlib,
            nodeSep: 150,
            edgeSep: 100,
            rankSep: 100,
            rankDir: 'TB',
            setLinkVertices: true,
        });
    };

    public createLink = (source: joint.dia.Element, target: joint.dia.Element) => {
        const link = new joint.shapes.standard.Link();
        link.source(source);
        link.target(target);

        return link;
    };

    public addLinkLabel = (link: joint.dia.Link, text: string) => {
        link.appendLabel({
            attrs: {
                text: {
                    text: text,
                    fontSize: 12,
                }
            }
        })
    }

    private blockTextHighlight = (element: joint.dia.Element) => {
        element.attr(
            'label/style',
            '-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;'
        );
    }
}