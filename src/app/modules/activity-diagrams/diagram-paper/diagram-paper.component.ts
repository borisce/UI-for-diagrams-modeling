import { Component, OnInit, HostListener, Host } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as joint from 'jointjs';
import { Canvg } from 'canvg';

import { ActiveTable, InputOutput, InputOutputType, InternalSignal, InternalSignalType, Parameter, ParameterType } from '../types/data-source.type';

import { JointJsService } from '../joint-js.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RepositoryService } from '../../../core/service/repository.service';
import { Router } from '@angular/router';
import { CollabService, documentTitle, getFileNameFromDocID } from '../../../core/service/collab.service';
import { LoadDiagramModalComponent } from '../modals/load-diagram-modal/load-diagram-modal.component';
import { SaveDiagramModalComponent } from '../modals/save-diagram-modal/save-diagram-modal.component';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { GenerateCodeModalComponent } from '../modals/generate-code-modal/generate-code-modal.component';
import { AddBlockModalComponent } from '../modals/add-block-modal/add-block-modal.component';
import { EditBlockModalComponent } from '../modals/edit-block-modal/edit-block-modal.component';
import { Block, DiagramData } from '../types/diagram-data.type';
import { operators } from '../operators';
import { CodeGenerationService } from '../code-generation.service';
import { KeyBoardShortcutService } from '../keyboard-shortcut.service';
import { DiagramElements } from '../types/diagram-elements.type';
import { DeleteElementShortcut } from '../types/keyboard-shortcuts';
import { DiagramGenerationService } from '../diagram-generation.service';
import { FilePickerComponent } from '../modals/file-picker/file-picker.component';

@Component({
  selector: 'app-diagram-paper',
  templateUrl: './diagram-paper.component.html',
  styleUrls: ['./diagram-paper.component.css'],
  providers: [JointJsService, CodeGenerationService, KeyBoardShortcutService, DiagramGenerationService],
})
export class ActivityDiagramsComponent implements OnInit {
  // Need to assign these to variables to use them in the template
  public operators = operators;
  public InputOutputType = InputOutputType;
  public InternalSignalType = InternalSignalType;
  public ParameterType = ParameterType;

  public moduleName: string = 'module_name';

  // Represent seq/comb blocks
  public blocks: Array<Block>;
  public activeBlockIndex: number = 0;

  // Graph, paper and element variables
  public graph: joint.dia.Graph;
  public paper: joint.dia.Paper;

  // Currently selected elements
  public activePaperElement: joint.dia.Element = null;
  public activePaperElementCaption: string = '';

  public activePaperLink: joint.dia.Link = null;
  public activePaperLinkCaption: string = '';
  // Used to determine where the active link is coming from -> used in template
  public activePaperLinkSource: 'case' | 'if' | 'loop' | null = null;

  // Element hover view variables
  public toolsView: joint.dia.ToolsView;
  public elementToolsView: joint.dia.ToolsView;
  //public currentLinkVertecesLenght: number;

  // Mode toggle variables
  public drawingMode: boolean = false;

  // Table variables
  public moduleInputs: MatTableDataSource<InputOutput> = new MatTableDataSource;
  public moduleOutputs: MatTableDataSource<InputOutput> = new MatTableDataSource;
  public internalSignals: MatTableDataSource<InternalSignal> = new MatTableDataSource;
  public parameters: MatTableDataSource<Parameter> = new MatTableDataSource;
  public activeTable: ActiveTable | null = null;

  // Link labels;
  public linkLabels: Array<{ id: joint.dia.Cell.ID, label: string }> = [];

  public paperScale: number = 1;
  public dragStartPosition;

  private highlightColor: string = '#F6A000';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private jointJsService: JointJsService,
    public codeGenerationService: CodeGenerationService,
    public diagramGenerationService: DiagramGenerationService,
    public keyboardShortcutService: KeyBoardShortcutService,
    public repoService: RepositoryService,
    public collabService: CollabService) {
  }

  public ngOnInit(): void {
    if (!this.repoService.currentRepo) {
      this.router.navigate(['/my-repos']);
    }

    // Graph setup
    this.blocks = [{ name: 'newBlock', logic: 'combinational', graph: new joint.dia.Graph({}, { cellNamespace: joint.shapes }), linkLabels: [] }];
    this.activeBlockIndex = 0;
    this.graph = this.blocks[0].graph;
    this.linkLabels = this.blocks[0].linkLabels;

    this.initializePaper();

    // Used for when we are passing state from other component -> to load on mount
    const fileContent = localStorage.getItem('activityDiagram');
    if (fileContent) {
      this.parseJsonFile(fileContent);
      localStorage.removeItem('activityDiagram');
    }
  }

  public ngOnDestroy(): void {
    this.paper.remove();
    this.graph.clear();
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e) {
    if (this.dragStartPosition) {
      this.paper.translate(e.offsetX - this.dragStartPosition.x * this.paperScale, e.offsetY - this.dragStartPosition.y * this.paperScale);
    }
  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    // Prevents the shortcut from being triggered when a dialog is open
    if (this.dialog.openDialogs.length > 0) return;

    if (this.keyboardShortcutService.matchShortcut(event, DeleteElementShortcut) && (this.activePaperElement || this.activePaperLink)) {
      this.deleteElement();
      this.deleteLink();
    }
  }

  @HostListener('mousewheel', ['$event'])
  public onMouseWheel(event: WheelEvent) {
    // Check if cursor is over paper, ignore the error it clearly exists when console logged
    // @ts-ignore
    if (!event.target?.nodeName.includes('svg')) return;

    // Get the current translation
    let translate = this.paper.translate();

    // Calculate the new translation based on the mouse wheel event
    let tx = translate.tx - event.deltaX / this.paperScale;
    let ty = translate.ty - event.deltaY / this.paperScale;

    this.paper.translate(tx, ty);
  }

  public addGraphPaperEventListeners(): void {
    let hideTimeout: NodeJS.Timeout;

    this.graph.on('remove', (cell) => {
      if (cell.isLink()) {
        this.activePaperLink = null;
        this.activePaperLinkCaption = null;
      } else if (cell.isElement()) {
        this.activePaperElement = null;
        this.activePaperElementCaption = null;
      }
    });

    this.graph.on('add', (cell) => {
      joint.highlighters.mask.removeAll(this.paper);

      const highlightCell = () => {
        const cellView = this.paper.findViewByModel(cell);

        joint.highlighters.mask.add(cellView, { selector: 'root' }, 'my-element-highlight', {
          deep: true,
          attrs: {
            'stroke': this.highlightColor,
            'stroke-width': 3
          }
        });
      }

      if (!cell.isLink()) {
        highlightCell();
      } else if (cell.isLink()) {
        const sourceElement = this.graph.getCell(cell.attributes.source.id);
        if (['if', 'case', 'loop'].includes(sourceElement.attributes['name'])) {
          this.activePaperElement = null;
          this.activeTable = null;
          this.activePaperLink = cell;
          this.activePaperLinkCaption = '';
          this.activePaperLinkSource = sourceElement.attributes['name'];
          highlightCell();
        }
      }
    });

    this.paper.on('element:mouseenter', (elementView: any) => {
      clearTimeout(hideTimeout);
      elementView.removeTools();
      elementView.addTools(this.elementToolsView);
      elementView.showTools(this.elementToolsView);
    });

    this.paper.on('element:mouseleave', (elementView: any) => {
      /*
        Timeout to prevent boundary + remove tool from disappearing for diamond shapes
        since their boundary is a rectangle and the mouseleave event is triggered when you leave the diamond
        making it impossible to delete.
      */
      hideTimeout = setTimeout(() => {
        elementView.hideTools();
      }, 1000)
    });

    this.paper.on('element:pointerclick', (elementView) => {
      joint.highlighters.mask.removeAll(this.paper);
      this.activePaperLink = null;
      this.activeTable = null;

      joint.highlighters.mask.add(elementView, { selector: 'root' }, 'my-element-highlight', {
        deep: true,
        attrs: {
          'stroke': this.highlightColor,
          'stroke-width': 3
        }
      });

      this.activePaperElement = elementView.model;
      this.activePaperElementCaption = this.activePaperElement.attributes.attrs?.label?.text;
    });

    // Right click on links
    this.paper.on('link:contextmenu', (linkView, _evt, x, y) => {
      joint.highlighters.mask.removeAll(this.paper);
      this.activePaperElement = null;
      this.activeTable = null;

      const sourceElement = this.graph.getCell(linkView.model.attributes.source.id);
      if (!['if', 'case', 'loop'].includes(sourceElement.attributes['name'])) {
        return;
      }

      joint.highlighters.mask.add(linkView, { selector: 'root' }, 'my-element-highlight', {
        deep: true,
        attrs: {
          'stroke': this.highlightColor,
          'stroke-width': 3
        }
      });

      this.activePaperLink = linkView.model;
      this.activePaperLinkCaption = this.linkLabels.find((label: { id: any; }) => label.id == this.activePaperLink.id)?.label ?? '';
      this.activePaperLinkSource = sourceElement.attributes['name'];
    });

    this.paper.on('link:mouseenter', (linkView) => {
      linkView.removeTools();
      linkView.addTools(this.toolsView);
      linkView.showTools();

      // This doesn't work properly and causes other issues
      // Set how many verteces this link has -> we continue this in link:mouseleave
      //this.currentLinkVertecesLenght = linkView.model.attributes.vertices?.length ?? 0;
    });

    this.paper.on('link:mouseleave', (linkView) => {
      linkView.hideTools();

      // This doesn't work properly and causes other issues
      // This condition tells us that a vertex was added -> in that case we reinitialize the paper
      // Why? -> because this was the only way to make the created vertex draggable/movable
      // It's an ugly solution but only thing that works
      // The created verteces are not draggable even though they are supposed to be
      // if (linkView.model.attributes.vertices?.length && linkView.model.attributes.vertices?.length > this.currentLinkVertecesLenght) {
      //   this.changeActiveBlock(this.activeBlockIndex);
      // }

      // this.currentLinkVertecesLenght = null;
    });

    this.paper.on('blank:pointerclick', () => {
      joint.highlighters.mask.removeAll(this.paper);
      this.activePaperElement = null;
      this.activePaperElementCaption = null;
      this.activePaperLink = null;
      this.activePaperLinkCaption = null;
      this.activeTable = null;
    })

    this.paper.on('blank:pointerdown', (event, x, y) => {
      this.dragStartPosition = { x, y };
    });

    this.paper.on('cell:pointerup blank:pointerup', (cellView, x, y) => {
      delete this.dragStartPosition;
    });
  }

  public addElement(elementType: DiagramElements) {
    let element: joint.dia.Element;

    switch (elementType) {
      case 'action':
        element = this.jointJsService.createAction();
        break;
      case 'if':
        element = this.jointJsService.createDiamond('if', 'black');
        break;
      case 'case':
        element = this.jointJsService.createDiamond('case', 'blue');
        break;
      case 'merge':
        element = this.jointJsService.createDiamond('merge', 'red');
        element.attr('label/text', 'Merge');
        break;
      case 'start':
        element = this.jointJsService.createStart();
        break;
      case 'end':
        element = this.jointJsService.createEnd();
        break;
      case 'loop':
        element = this.jointJsService.createLoop();
        break;
    }

    this.drawingMode = true;
    this.changeDrawingMode();

    element.addTo(this.graph);

    this.activePaperLink = null;
    this.activeTable = null;
    this.activePaperElement = element;
    this.activePaperElementCaption = this.activePaperElement.attributes.attrs?.label?.text;
  }

  public deleteElement() {
    this.activePaperElement?.remove();
    this.activePaperElement = null;
  }

  public deleteLink() {
    this.activePaperLink?.remove();
    this.activePaperLink = null;
  }

  /**
   * Updates properties of current selected element
   */
  public updateElementProperties(caption?: string, size?: { width: number, height: number }): void {
    if (caption)
      this.activePaperElement.attr('label/text', caption);

    if (size)
      this.activePaperElement.resize(size.width, size.height);

    this.activePaperElement = null;
    this.activePaperElementCaption = null;
    joint.highlighters.mask.removeAll(this.paper);
  }

  /**
   * Updates the caption of current selected link
   */
  public updateLinkCaption(newCaption: string, linkType: 'ifLink' | 'caseLink'): void {
    // Removes old label
    this.activePaperLink.removeLabel(0);

    // Remove old label
    for (let i = 0; i < this.linkLabels.length; i++) {
      if (this.linkLabels[i].id == this.activePaperLink.id) {
        this.linkLabels.splice(i, 1);
        break;
      }
    }

    // Add new label
    this.activePaperLink.appendLabel({
      attrs: {
        text: {
          text: newCaption,
          fontSize: 12,
        }
      }
    });

    // Add new label;
    this.linkLabels.push({ id: this.activePaperLink.id, label: newCaption });

    this.activePaperLink = null;
    this.activePaperLinkCaption = null;
    joint.highlighters.mask.removeAll(this.paper);
  }

  public showToast(type: string, message?: string) {
    switch (type) {
      case 'error':
        this.snackBar.open(message, undefined, {
          panelClass: ['error-snackbar'],
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        break;
      case 'success':
        this.snackBar.open(message, undefined, {
          panelClass: ['success-snackbar'],
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        break;
      case 'warning':
        this.snackBar.open(message, undefined, {
          panelClass: ['warning-snackbar'],
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
        break;
    }
  }

  public openTable(type: 'inputs' | 'outputs' | 'signals' | 'parameters'): void {
    this.activePaperElement = null;
    this.activePaperLink = null;
    this.activeTable = {
      name: type,
      tableData: type == 'inputs' ? this.moduleInputs : type == 'outputs' ? this.moduleOutputs : type === 'parameters' ? this.parameters : this.internalSignals,
    };
  }

  public addToTable(): void {
    if (!this.activeTable) return;

    switch (this.activeTable.name) {
      case 'parameters':
        this.parameters.data.push({ name: 'PARAMETER_NAME', type: ParameterType.integer, value: '1' });
        this.parameters._updateChangeSubscription();
        break;
      case 'signals':
        this.internalSignals.data.push({ name: 'signal_name', type: InternalSignalType.logic, bits: '1' });
        this.internalSignals._updateChangeSubscription();
        break;
      case 'inputs':
        this.moduleInputs.data.push({ name: 'input_name', type: InputOutputType.logic, bits: '1' });
        this.moduleInputs._updateChangeSubscription();
        break;
      case 'outputs':
        this.moduleOutputs.data.push({ name: 'output_name', type: InputOutputType.logic, bits: '1' });
        this.moduleOutputs._updateChangeSubscription();
        break;
    }
  }

  public deleteFromTable(element: any): void {
    if (!this.activeTable) return;

    switch (this.activeTable.name) {
      case 'parameters':
        const indexParams: number = this.parameters.data.indexOf(element);
        this.parameters.data.splice(indexParams, 1);
        this.parameters._updateChangeSubscription();
        break;
      case 'signals':
        const indexSignals: number = this.internalSignals.data.indexOf(element);
        this.internalSignals.data.splice(indexSignals, 1);
        this.internalSignals._updateChangeSubscription();
        break;
      case 'inputs':
        const indexInputs: number = this.moduleInputs.data.indexOf(element);
        this.moduleInputs.data.splice(indexInputs, 1);
        this.moduleInputs._updateChangeSubscription();
        break;
      case 'outputs':
        const indexOutputs: number = this.moduleOutputs.data.indexOf(element);
        this.moduleOutputs.data.splice(indexOutputs, 1);
        this.moduleOutputs._updateChangeSubscription();
        break;
    }
  }

  public saveDiagram(): void {
    const blocksInfo = this.blocks.map(block => {
      const json = block.graph.toJSON();

      return {
        blockName: block.name,
        logic: block.logic,
        graph: json,
        linkLabels: block.linkLabels,
      };
    });

    const serializedDiagram = {
      moduleName: this.moduleName,
      blocks: blocksInfo,
      moduleInputs: this.moduleInputs.data,
      moduleOutputs: this.moduleOutputs.data,
      internalSignals: this.internalSignals.data,
      parameters: this.parameters.data,
    };

    const dialog = this.dialog.open(SaveDiagramModalComponent)

    dialog.afterClosed().subscribe(fileName => {
      if (!fileName) return;

      try {
        this.collabService.resetConnection();

        const filePath: string = documentTitle(
          this.repoService.currentRepo.uuid,
          `activity-diagram/${fileName}.ad`,
          this.repoService.currentRepo.authorUUID,
          'master'
        );
        this.collabService.createOrUpdateDocument(filePath, JSON.stringify(serializedDiagram), this.repoService.currentRepo.uuid, 'master');
        this.showToast('success', 'Diagram saved succesfully');
      } catch (_error) {
        this.showToast('error', 'An error occurred during saving, try again.');
      }
    });
  }

  public async loadDiagram() {
    const getDiagramFiles = async () => {
      return ((await this.collabService.getContentsOfFilesBySuffix('.ad', this.repoService.currentRepo.uuid)).map((file) => {
        return {
          id: file,
          name: getFileNameFromDocID(file),
        }
      }));
    }

    const diagramFiles = await getDiagramFiles();

    if (diagramFiles.length === 0) {
      this.showToast('error', 'No diagrams found in the repository');
      return;
    }

    const dialogRef = this.dialog.open(LoadDiagramModalComponent, {
      data: {
        files: diagramFiles
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (!result) return;

      const fileContent = await this.collabService.getDocContents(result.id);

      this.parseJsonFile(fileContent);
    });
  }

  public parseJsonFile = (fileContent: string, showToast = true) => {
    try {
      const json = JSON.parse(fileContent);
      this.moduleName = json.moduleName ?? 'module_name';
      this.moduleInputs.data = json.moduleInputs ?? [];
      this.moduleOutputs.data = json.moduleOutputs ?? [];
      this.internalSignals.data = json.internalSignals ?? [];
      this.parameters.data = json.parameters ?? [];

      this.blocks = [];
      json.blocks.forEach(block => {
        const newGraph = new joint.dia.Graph({}, { cellNamespace: joint.shapes });
        newGraph.fromJSON(block.graph);
        this.blocks.push({ name: block.blockName, logic: block.logic, graph: newGraph, linkLabels: block.linkLabels });
      });

      this.changeActiveBlock(0);
      if (showToast) this.showToast('success', 'Diagram loaded succesfully');
    } catch {
      if (showToast) this.showToast('error', 'Invalid file');
    }
  }

  public generateCode(): void {
    let errorFound = false;

    const tableCheckResult = this.codeGenerationService.checkTables(this.moduleInputs, this.moduleOutputs, this.internalSignals, this.parameters);
    if (tableCheckResult != '') {
      this.showToast('error', tableCheckResult);
      return;
    }

    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i];
      const graphJSON: Array<Object> = block.graph.toJSON();
      const graphCheckResult = this.codeGenerationService.checkGraph(graphJSON, block.graph, block.linkLabels);

      if (graphCheckResult != '') {
        this.showToast('error', `[Block ${block.name}] ${graphCheckResult}`);
        errorFound = true;
        break;
      }
    }

    if (errorFound) return;

    const diagramData: DiagramData = {
      moduleName: this.moduleName,
      blocks: this.blocks,
      moduleInputs: this.moduleInputs,
      moduleOutputs: this.moduleOutputs,
      internalSignals: this.internalSignals,
      parameters: this.parameters,
    }

    const dialog = this.dialog.open(GenerateCodeModalComponent, {
      data: {
        diagramData: diagramData
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result?.generatedCode || !result?.fileName || !result?.language) {
        this.showToast('error', 'An error occurred during saving, try again.');
        return;
      }

      const fileExtension = result.language == 'System Verilog' ? 'sv' : 'vhd';

      this.saveCode(result.generatedCode, result.fileName, fileExtension);
    });
  }

  public saveCode(code: string, fileName: string, fileExtension: 'sv' | 'vhd'): void {
    try {
      this.collabService.resetConnection();

      const filePath: string = documentTitle(
        this.repoService.currentRepo.uuid,
        `src/generated-code/${fileName}.${fileExtension}`,
        this.repoService.currentRepo.authorUUID,
        'master'
      );
      this.collabService.createOrUpdateDocument(filePath, code, this.repoService.currentRepo.uuid, 'master');
      this.showToast('success', 'Code saved to a file succesfully');
    } catch (_error) {
      this.showToast('error', 'An error occurred during saving, try again.');
    }
  }

  public generateDiagram(): void {
    const dialog = this.dialog.open(FilePickerComponent, {
      data: {
        fileExtensions: ['.sv', '.vhd'],
        title: 'Generate diagram',
        text: 'Select a file'
      }
    });

    dialog.afterClosed().subscribe(async result => {
      if (!result) {
        this.showToast('error', 'No file selected');
        return;
      }

      const fileContent = await this.collabService.getDocContents(result.id);

      try {
        const generationResult = this.diagramGenerationService.generateDiagram(result.name, fileContent);

        if (generationResult.doesFileContainErrors) {
          this.showToast('warning', 'The file contains errors, the diagram might not be generated correctly.')
        }

        this.moduleName = generationResult.moduleName ?? 'module_name';
        this.moduleInputs.data = generationResult.inputs.data ?? [];
        this.moduleOutputs.data = generationResult.outputs.data ?? [];
        this.internalSignals.data = generationResult.internalSignals.data ?? [];
        this.parameters.data = generationResult.parameters.data ?? [];
        this.blocks = generationResult.blocks;

        this.changeActiveBlock(0);
      } catch (error) {
        console.error(error);
        this.showToast('error', 'There was an error during diagram generation - try checking the file');

        // Reset variables to initial state
        this.moduleInputs.data = [];
        this.moduleOutputs.data = [];
        this.internalSignals.data = [];
        this.parameters.data = [];
        this.blocks = [{ name: 'newBlock', logic: 'combinational', graph: new joint.dia.Graph({}, { cellNamespace: joint.shapes }), linkLabels: [] }];
        this.activeBlockIndex = 0;
      }
    });
  }

  public async exportImage() {
    const paper = document.getElementById('diagram-paper');
    const svg = paper.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const diagramBox = this.paper.getContentBBox();

    canvas.width = diagramBox.width + 50;
    canvas.height = diagramBox.height + 50;

    try {
      const v = await Canvg.from(ctx, svgData);
      v.render();

      const dataURL = canvas.toDataURL('image/png', 1.0);
      const a = document.createElement
        ('a');
      a.href = dataURL;
      a.download = 'diagram.png';
      a.click();

      a.remove();

      this.showToast('success', 'Image exported succesfully');
    } catch {
      this.showToast('error', 'An error occurred during image export, try again.');
    }
  }

  /**
   * Changes current paper mode (drawing/moving)
   */
  public changeDrawingMode(): void {
    if (this.drawingMode) { // disable drawing mode, activate moving mode
      this.drawingMode = false;
      this.modeChanged(this.drawingMode);
      //e.checked = true;
    } else { // activate drawing mode, disable moving mode
      this.drawingMode = true;
      this.modeChanged(this.drawingMode);
      //e.checked = false;
    }
  }

  /**
   * Adds removes magnets from all elements on the paper
   */
  public modeChanged(mode: boolean): void {
    if (mode == true) { // Drawing mode enabled -> magnets are true and user can connect elements
      this.graph.getElements().forEach(element => {
        element.prop('attrs/body/magnet', true);
      });
      if (this.paper) this.paper.options.interactive = false;
    } else { // Drawing mode disabled -> magnets are false and user can't connect elements, but he can move them
      this.graph.getElements().forEach(element => {
        element.prop('attrs/body/magnet', 'passive');
      });
      if (this.paper) this.paper.options.interactive = true;
    }
  }

  public initializePaper(): void {
    const namespace = joint.shapes;
    let paperElement = document.getElementById('diagram-paper')!;
    const paperHeight = '94.5%';
    const paperWidth = '100%';

    paperElement.style.margin = 'auto';
    paperElement.style.borderStyle = 'solid';
    paperElement.style.borderWidth = '1px';
    paperElement.style.borderColor = '#888888'
    paperElement.style.overflow = 'auto';

    const { createPaper } = this.jointJsService;
    this.paper = createPaper(paperElement, this.graph, paperWidth, paperHeight, namespace);
    this.paper.drawGrid();
    this.paper.scale(1);

    this.paperScale = 1;

    const verticesTool: joint.linkTools.Vertices = new joint.linkTools.Vertices({ stopPropagation: false });
    const boundaryTool: joint.linkTools.Boundary = new joint.linkTools.Boundary();
    const removeTool: joint.linkTools.Remove = new joint.linkTools.Remove();
    const segments: joint.linkTools.Segments = new joint.linkTools.Segments();
    this.toolsView = new joint.dia.ToolsView({ tools: [verticesTool, boundaryTool, removeTool, segments] });
    this.elementToolsView = new joint.dia.ToolsView({ tools: [boundaryTool, removeTool] });

    this.addGraphPaperEventListeners();
  }

  public clearPaper(): void {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Clear paper',
        text: 'Are you sure you want to clear the paper?'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result) return;

      this.graph.clear();
      this.linkLabels = [];
    });
  }

  public formatPaper(): void {
    this.jointJsService.formatPaper(this.graph);
  }

  public addNewBlock(): void {
    const dialog = this.dialog.open(AddBlockModalComponent, {
      data: {
        inputs: this.moduleInputs,
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result?.blockName || !result?.logic) return;

      let sensitivityList: Block['sensitivityList'] | null = null;

      // If user didn't select any signal -> ignore
      if (result.logic == 'sequential' && result.sensitivityList.clockSignal && result.sensitivityList.resetSignal) {
        sensitivityList = result.sensitivityList;
      }

      this.blocks.push({ name: result.blockName, logic: result.logic, sensitivityList, graph: new joint.dia.Graph({}, { cellNamespace: joint.shapes }), linkLabels: [] });
    })
  }

  public changeActiveBlock(newBlockIndex: number): void {
    this.graph = this.blocks[newBlockIndex].graph;
    this.linkLabels = this.blocks[newBlockIndex].linkLabels;

    this.activePaperElement = null;
    this.activePaperElementCaption = '';
    this.activePaperLink = null;
    this.activePaperLinkCaption = '';
    this.activeTable = null;

    // Reset paper and initialize again
    this.paper.remove();
    const paperWrapper = document.getElementById('paper-wrapper')!;
    const newPaper = document.createElement('div');
    newPaper.id = 'diagram-paper';
    paperWrapper.appendChild(newPaper);

    this.initializePaper();

    this.activeBlockIndex = newBlockIndex;
  }

  public editBlock(): void {
    const dialog = this.dialog.open(EditBlockModalComponent, {
      data: {
        blockName: this.blocks[this.activeBlockIndex].name,
        logic: this.blocks[this.activeBlockIndex].logic,
        sensitivityList: this.blocks[this.activeBlockIndex].sensitivityList,
        inputs: this.moduleInputs,
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result?.blockName || !result?.logic) return;

      let sensitivityList: Block['sensitivityList'] | null = null;

      // If user didn't select any signal -> ignore
      if (result.logic == 'sequential' && result.sensitivityList.clockSignal && result.sensitivityList.resetSignal) {
        sensitivityList = result.sensitivityList;
      }

      this.blocks[this.activeBlockIndex].name = result.blockName;
      this.blocks[this.activeBlockIndex].logic = result.logic;
      this.blocks[this.activeBlockIndex].sensitivityList = sensitivityList;
    })
  }

  public deleteBlock(): void {
    const dialog = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: `Delete block ${this.blocks[this.activeBlockIndex].name}`,
        text: 'Are you sure you want to delete this block?'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result) return;

      this.blocks.splice(this.activeBlockIndex, 1);
      this.changeActiveBlock(0);
    });
  }
}
