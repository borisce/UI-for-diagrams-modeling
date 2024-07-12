import { expect, it, describe } from '@jest/globals';
import { ActivityDiagramsComponent } from '../diagram-paper/diagram-paper.component';
import { JointJsService } from '../joint-js.service';
import { CodeGenerationService } from '../code-generation.service';
import { KeyBoardShortcutService } from '../keyboard-shortcut.service';
import * as joint from 'jointjs';
import { InputOutput, InternalSignal, Parameter } from '../types/data-source.type';
import { DiagramGenerationService } from '../diagram-generation.service';

const createComponent = () => {
    const jointJsService = new JointJsService();
    const codeGenerationService = new CodeGenerationService();
    const diagramGenerationService = new DiagramGenerationService
    const keyboardShortcutService = new KeyBoardShortcutService();

    const component = new ActivityDiagramsComponent(null, null, null, jointJsService, codeGenerationService, diagramGenerationService, keyboardShortcutService, null, null); // Add missing dependencies

    component.blocks = [{ name: 'newBlock', logic: 'combinational', graph: new joint.dia.Graph({}, { cellNamespace: joint.shapes }), linkLabels: [] }];
    component.activeBlockIndex = 0;
    component.graph = component.blocks[0].graph;
    component.linkLabels = component.blocks[0].linkLabels;

    return component;
}

describe('Activity diagram paper test', () => {
    describe('Create elements', () => {
        it('Create action element, add it to graph', () => {
            const component = createComponent();
            component.addElement('action');

            const elements = component.graph.getElements();

            expect(elements.length).toBe(1);
            expect(elements[0].attributes.type).toBe('standard.Rectangle');
            expect(elements[0].attributes.name).toBe('action');
            expect(component.activePaperElement).toBe(elements[0]);
            expect(component.activePaperLink).toBe(null);
            expect(component.activeTable).toBe(null);
        });

        it('Create if element, add it to graph', () => {
            const component = createComponent();
            component.addElement('if');

            const elements = component.graph.getElements();

            expect(elements.length).toBe(1);
            expect(elements[0].attributes.type).toBe('standard.Polygon');
            expect(elements[0].attributes.name).toBe('if');
            expect(component.activePaperElement).toBe(elements[0]);
            expect(component.activePaperLink).toBe(null);
            expect(component.activeTable).toBe(null);
        });

        it('Create case element, add it to graph', () => {
            const component = createComponent();
            component.addElement('case');

            const elements = component.graph.getElements();

            expect(elements.length).toBe(1);
            expect(elements[0].attributes.type).toBe('standard.Polygon');
            expect(elements[0].attributes.name).toBe('case');
            expect(component.activePaperElement).toBe(elements[0]);
            expect(component.activePaperLink).toBe(null);
            expect(component.activeTable).toBe(null);
        });

        it('Create merge element, add it to graph', () => {
            const component = createComponent();
            component.addElement('merge');

            const elements = component.graph.getElements();

            expect(elements.length).toBe(1);
            expect(elements[0].attributes.type).toBe('standard.Polygon');
            expect(elements[0].attributes.name).toBe('merge');
            expect(component.activePaperElement).toBe(elements[0]);
            expect(component.activePaperLink).toBe(null);
            expect(component.activeTable).toBe(null);
        });

        it('Create loop element, add it to graph', () => {
            const component = createComponent();
            component.addElement('loop');

            const elements = component.graph.getElements();

            expect(elements.length).toBe(1);
            expect(elements[0].attributes.type).toBe('standard.Polygon');
            expect(elements[0].attributes.name).toBe('loop');
            expect(component.activePaperElement).toBe(elements[0]);
            expect(component.activePaperLink).toBe(null);
            expect(component.activeTable).toBe(null);
        });

        it('Create start element, add it to graph', () => {
            const component = createComponent();
            component.addElement('start');

            const elements = component.graph.getElements();

            expect(elements.length).toBe(1);
            expect(elements[0].attributes.type).toBe('standard.Ellipse');
            expect(elements[0].attributes.name).toBe('start');
            expect(component.activePaperElement).toBe(elements[0]);
            expect(component.activePaperLink).toBe(null);
            expect(component.activeTable).toBe(null);
        });

        it('Create end element, add it to graph', () => {
            const component = createComponent();
            component.addElement('end');

            const elements = component.graph.getElements();

            expect(elements.length).toBe(1);
            expect(elements[0].attributes.type).toBe('standard.Ellipse');
            expect(elements[0].attributes.name).toBe('end');
            expect(component.activePaperElement).toBe(elements[0]);
            expect(component.activePaperLink).toBe(null);
            expect(component.activeTable).toBe(null);
        });
    });

    describe('Delete currently selected element', () => {
        it('Delete selected element', () => {
            const component = createComponent();

            component.addElement('action');

            const elements = component.graph.getElements();
            expect(elements.length).toBe(1);
            expect(component.activePaperElement).toBe(elements[0]);

            component.deleteElement();

            const elementsAfterDelete = component.graph.getElements();
            expect(elementsAfterDelete.length).toBe(0);
            expect(component.activePaperElement).toBe(null);
        });
    });

    describe('Delete currently selected link', () => {
        it('Delete selected link', () => {
            const component = createComponent();

            component.addElement('if');
            component.addElement('action');

            const elements = component.graph.getElements();
            expect(elements.length).toBe(2);
            expect(component.activePaperElement).toBe(elements[1]);

            const link = new joint.shapes.standard.Link();
            link.source(elements[0]);
            link.target(elements[1]);
            link.addTo(component.graph);

            // Simulate selecting link since we can't use paper event due to tests running in node env
            component.activePaperLink = link;
            component.deleteLink();

            const links = component.graph.getLinks();
            expect(links.length).toBe(0);
        });
    });

    describe('Update properties of currently selected element', () => {
        it('Update size of selected element', () => {
            const component = createComponent();

            component.addElement('action');
            component.updateElementProperties(undefined, { width: 500, height: 500 });

            const elements = component.graph.getElements();

            // activePaperElement is reset after property update so check elements[0] instead
            expect(elements.length).toBe(1);
            expect(elements[0].attributes.size.width).toBe(500);
            expect(elements[0].attributes.size.height).toBe(500);
        });

        it('Update caption of selected element', () => {
            const component = createComponent();

            component.addElement('action');
            component.updateElementProperties('new text', undefined);

            const elements = component.graph.getElements();

            // activePaperElement is reset after property update so check elements[0] instead
            expect(elements.length).toBe(1);
            expect(elements[0].attributes.attrs.label.text).toBe('new text');
        });

        it('Update both caption and size of selected element', () => {
            const component = createComponent();

            component.addElement('action');
            component.updateElementProperties('new text', { width: 500, height: 500 });

            const elements = component.graph.getElements();

            // activePaperElement is reset after property update so check elements[0] instead
            expect(elements.length).toBe(1);
            expect(elements[0].attributes.size.width).toBe(500);
            expect(elements[0].attributes.size.height).toBe(500);
            expect(elements[0].attributes.attrs.label.text).toBe('new text');
        });
    });

    describe('Update properties of currently selected link', () => {
        it('Update caption of selected if link', () => {
            const component = createComponent();

            component.addElement('if');
            component.addElement('action');

            const elements = component.graph.getElements();
            const link = new joint.shapes.standard.Link();
            link.source(elements[0]);
            link.target(elements[1]);
            link.addTo(component.graph);

            // Simulate selecting link since we can't use paper event due to tests running in node env
            component.activePaperLink = link;
            component.updateLinkCaption('new text', 'ifLink');

            const links = component.graph.getLinks();

            // Check if link label was added to linkLabels
            expect(component.linkLabels.length).toBe(1);
            expect(component.linkLabels[0].id).toBe(links[0].attributes.id);
            expect(component.linkLabels[0].label).toBe('new text');
        });

        it('Update caption of selected case link', () => {
            const component = createComponent();

            component.addElement('case');
            component.addElement('action');

            const elements = component.graph.getElements();
            const link = new joint.shapes.standard.Link();
            link.source(elements[0]);
            link.target(elements[1]);
            link.addTo(component.graph);

            // Simulate selecting link since we can't use paper event due to tests running in node env
            component.activePaperLink = link;
            component.updateLinkCaption('new text', 'caseLink');

            const links = component.graph.getLinks();

            // Check if link label was added to linkLabels
            expect(component.linkLabels.length).toBe(1);
            expect(component.linkLabels[0].id).toBe(links[0].attributes.id);
            expect(component.linkLabels[0].label).toBe('new text');
        });
    });

    describe('Open certain table', () => {
        it('Open inputs table', () => {
            const component = createComponent();
            component.openTable('inputs');

            expect(component.activeTable.name).toBe('inputs');
            expect(component.activePaperElement).toBe(null);
            expect(component.activePaperLink).toBe(null);
        });

        it('Open outputs table', () => {
            const component = createComponent();
            component.openTable('outputs');

            expect(component.activeTable.name).toBe('outputs');
            expect(component.activePaperElement).toBe(null);
            expect(component.activePaperLink).toBe(null);
        });

        it('Open signals table', () => {
            const component = createComponent();
            component.openTable('signals');

            expect(component.activeTable.name).toBe('signals');
            expect(component.activePaperElement).toBe(null);
            expect(component.activePaperLink).toBe(null);
        });

        it('Open parameters table', () => {
            const component = createComponent();
            component.openTable('parameters');

            expect(component.activeTable.name).toBe('parameters');
            expect(component.activePaperElement).toBe(null);
            expect(component.activePaperLink).toBe(null);
        });
    });

    describe('Add row to active table', () => {
        it('Active table is inputs', () => {
            const component = createComponent();

            component.openTable('inputs');
            expect(component.activeTable.tableData.data.length).toBe(0);
            expect(component.activeTable.name).toBe('inputs');

            component.addToTable();

            expect(component.activeTable.tableData.data.length).toBe(1);
            expect(component.activeTable.tableData.data[0].name).toBe('input_name');
            expect((component.activeTable.tableData.data[0] as InputOutput).bits).toBe('1');
        });

        it('Active table is outputs', () => {
            const component = createComponent();

            component.openTable('outputs');
            expect(component.activeTable.tableData.data.length).toBe(0);
            expect(component.activeTable.name).toBe('outputs');

            component.addToTable();

            expect(component.activeTable.tableData.data.length).toBe(1);
            expect(component.activeTable.tableData.data[0].name).toBe('output_name');
            expect((component.activeTable.tableData.data[0] as InputOutput).bits).toBe('1');
        });

        it('Active table is signals', () => {
            const component = createComponent();

            component.openTable('signals');
            expect(component.activeTable.tableData.data.length).toBe(0);
            expect(component.activeTable.name).toBe('signals');

            component.addToTable();

            expect(component.activeTable.tableData.data.length).toBe(1);
            expect(component.activeTable.tableData.data[0].name).toBe('signal_name');
            expect((component.activeTable.tableData.data[0] as InternalSignal).bits).toBe('1');
        });

        it('Active table is parameters', () => {
            const component = createComponent();

            component.openTable('parameters');
            expect(component.activeTable.tableData.data.length).toBe(0);
            expect(component.activeTable.name).toBe('parameters');

            component.addToTable();

            expect(component.activeTable.tableData.data.length).toBe(1);
            expect(component.activeTable.tableData.data[0].name).toBe('PARAMETER_NAME');
            expect((component.activeTable.tableData.data[0] as Parameter).type).toBe('integer');
            expect((component.activeTable.tableData.data[0] as Parameter).value).toBe('1');
        });
    });

    describe('Delete row from active table', () => {
        it('Active table is inputs', () => {
            const component = createComponent();

            component.openTable('inputs');
            component.addToTable();
            expect(component.activeTable.tableData.data.length).toBe(1);

            component.deleteFromTable(0);

            expect(component.activeTable.tableData.data.length).toBe(0);
        });

        it('Active table is outputs', () => {
            const component = createComponent();

            component.openTable('outputs');
            component.addToTable();
            expect(component.activeTable.tableData.data.length).toBe(1);

            component.deleteFromTable(0);

            expect(component.activeTable.tableData.data.length).toBe(0);
        });

        it('Active table is signals', () => {
            const component = createComponent();

            component.openTable('signals');
            component.addToTable();
            expect(component.activeTable.tableData.data.length).toBe(1);

            component.deleteFromTable(0);

            expect(component.activeTable.tableData.data.length).toBe(0);
        });

        it('Active table is parameters', () => {
            const component = createComponent();

            component.openTable('parameters');
            component.addToTable();
            expect(component.activeTable.tableData.data.length).toBe(1);

            component.deleteFromTable(0);

            expect(component.activeTable.tableData.data.length).toBe(0);
        });
    });

    describe('Parse JSON file', () => {
        it('Parse JSON file correctly', () => {
            const mockFileContent = JSON.stringify({
                moduleInputs: [],
                moduleOutputs: [],
                internalSignals: [],
                parameters: [],
                blocks: [
                    {
                        blockName: 'test',
                        logic: 'combinational',
                        graph: new joint.dia.Graph({}, { cellNamespace: joint.shapes }).toJSON(),
                        linkLabels: []
                    }
                ]
            });

            const component = createComponent();

            component.parseJsonFile(mockFileContent, false);

            expect(component.moduleInputs.data.length).toBe(0);
            expect(component.moduleOutputs.data.length).toBe(0);
            expect(component.internalSignals.data.length).toBe(0);
            expect(component.parameters.data.length).toBe(0);
            expect(component.blocks.length).toBe(1);
            expect(component.blocks[0].name).toBe('test');
            expect(component.blocks[0].logic).toBe('combinational');
        });

        it('Parse JSON file - invalid JSON', () => {
            const mockFileContent = JSON.stringify('invalid json');

            const component = createComponent();
            component.addElement('action');

            component.parseJsonFile(mockFileContent, false);

            // Initial graph should be the same -> include 1 element since the parsing should fail
            expect(component.graph.getElements().length).toBe(1);
        });
    });

    describe('Change mode to drawing/moving', () => {
        it('Change from moving to drawing', () => {
            const component = createComponent();

            expect(component.drawingMode).toBe(false);

            component.changeDrawingMode();

            expect(component.drawingMode).toBe(true);
        });

        it('Change from drawing to moving', () => {
            const component = createComponent();

            component.changeDrawingMode();
            expect(component.drawingMode).toBe(true);

            component.changeDrawingMode();

            expect(component.drawingMode).toBe(false);
        });

        it('Check magnets for every element when it is drawing mode', () => {
            const component = createComponent();

            component.addElement('action');
            const element = component.graph.getElements()[0];

            component.changeDrawingMode();

            expect(element.attributes.attrs.body.magnet).toBe(true);
        });

        it('Check magnets for every element when it is moving mode', () => {
            const component = createComponent();

            component.addElement('action');
            const element = component.graph.getElements()[0];

            component.changeDrawingMode();
            component.changeDrawingMode();

            expect(element.attributes.attrs.body.magnet).toBe('passive');
        });
    });

});