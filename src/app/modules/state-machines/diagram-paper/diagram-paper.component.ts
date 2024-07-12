import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {NewPaper} from '../other-classes/jointjspaper';
import {State} from '../other-classes/state';
import {JointJsState} from '../other-classes/jointjsstate';
import * as joint from 'jointjs';
import {MatTableDataSource} from '@angular/material/table';
import {Outputs} from '../other-classes/Outputs';
import {Inputs} from '../other-classes/Inputs';
import {OutputAssignments} from '../other-classes/OutputAssignments';
import {AuthenticationService} from '../../../core/service';
import {
  addCellToDiagram,
  changeDiagramCell,
  CollabService,
  // getVisualizationPresenceId,
  initializeDiagram,
  removeCellFromDiagram
} from '../../../core/service/collab.service';
import {RepositoryService} from '../../../core/service/repository.service';
import {ICollaborator} from '../../../shared/collaborators-list/collaborators-list.component';
import {CollabJointJSState} from '../other-classes/collabJointJSState';
import {CollabState} from '../other-classes/collabState';
import {CollabTransition} from '../other-classes/collabTransition';
import {CollabJointJSTransition} from '../other-classes/collabJointJSTransition';
import {SignalAssignments} from '../other-classes/SignalAssignments';
import {Signals} from '../other-classes/Signals';
import {Parameters} from '../other-classes/Parameters';
import {CollabEmptyCell} from '../other-classes/collabEmptyCell';
import {EmptyCell} from '../other-classes/EmptyCell';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ANTLRErrorListener, ANTLRInputStream, CommonTokenStream, Recognizer} from 'antlr4ts';
import {Token} from 'antlr4ts/Token';
import {TestCondition, TestConditionVHDL} from '../other-classes/TestCondition';
import {vhdlLexer} from '../../visualization/components/diagram-generation/vhdl/ANTLR/vhdlLexer';
import {vhdlParser} from '../../visualization/components/diagram-generation/vhdl/ANTLR/vhdlParser';
import {SystemVerilogLexer} from '../generate-diagram-from-code/systemverilog/ANTLR/SystemVerilogLexer';
import {SystemVerilogParser} from '../generate-diagram-from-code/systemverilog/ANTLR/SystemVerilogParser';
// import {VisPresence} from '../../visualization/collab/vis-presence';
import {MatRipple} from '@angular/material/core';

@Component({
  selector: 'app-diagram-paper',
  templateUrl: './diagram-paper.component.html',
  styleUrls: ['./diagram-paper.component.scss'],
  providers: [NewPaper, JointJsState, CollabJointJSState, CollabJointJSTransition, CollabEmptyCell]
})

export class DiagramPaperComponent implements OnInit, OnDestroy {

  @Output() public currentStateName: EventEmitter<any> = new EventEmitter<any>();
  @Output() public activeTransition: EventEmitter<any> = new EventEmitter<any>();
  @Output() public xmlFileContent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public loadedInputs: EventEmitter<any> = new EventEmitter<any>();
  @Output() public loadedOutputs: EventEmitter<any> = new EventEmitter<any>();
  @Output() public loadedSignals: EventEmitter<any> = new EventEmitter<any>();
  @Output() public loadedParameters: EventEmitter<any> = new EventEmitter<any>();
  @Output() public loadedMachineType: EventEmitter<string> = new EventEmitter<string>();
  @Output() public loadedDrawingMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public loadedLanguage: EventEmitter<string> = new EventEmitter<string>();
  @Input() public dataOutputSource: MatTableDataSource<Outputs>;
  @Input() public dataInputSource: MatTableDataSource<Inputs>;
  @Input() public dataSignalSource: MatTableDataSource<Signals>;
  @Input() public dataParameterSource: MatTableDataSource<Parameters>;
  @Input() public isDrawingModeEnabled: boolean;
  @Input() public areAnyWindowsOpen: boolean;
  @ViewChild(MatRipple) public readonly ripple: MatRipple;
  /*Board Stuff*/
  public activeBoard: string = 'default';
  public initializationDone: boolean = false;
  // public presence: any;
  // public localPresence: any;
  // public heldCellId: string;
  public collaborators: Map<string, ICollaborator> = new Map<string, ICollaborator>();
  public suppressOutgoing: boolean;
  public activePaperElement: any = null;
  public activePaperLink: any = null;
  /*end*/
  public activeEmptyCell: any = null;
  public linkToolsView: any;
  public elementToolsViewOnClick: any;
  public state_ids: number[];
  public zoomLevel: number = 1;
  public dragStartPosition: any;
  // private userPresences: Map<string, string> = new Map<string, string>();
  private visualisationsDoc: any;
  private diagramGraph: any;
  private paper: any;
  private repo: any;
  private conditionErrors: string;
  // private lockedElements: Map<string, { username: string, displayName: string }> =
  //  new Map<string, { username: string; displayName: string }>();
  // private elementLocks: Map<string, string> = new Map<string, string>();

  constructor(
    private newPaper: NewPaper,
    private jointJsState: JointJsState,
    private collabJointJsState: CollabJointJSState,
    private collabJointJsTransition: CollabJointJSTransition,
    private collabEmptyCell: CollabEmptyCell,
    private authService: AuthenticationService,
    private collabService: CollabService,
    private repositoryService: RepositoryService,
    private snackBar: MatSnackBar
  ) {
  }

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e: any): void {
    if (this.dragStartPosition) {
      this.paper.translate(e.offsetX - this.dragStartPosition.x * this.zoomLevel,
        e.offsetY - this.dragStartPosition.y * this.zoomLevel);
    }
  }

  public ngOnInit(): void {
    const namespace: typeof joint.shapes = joint.shapes;
    this.diagramGraph = new joint.dia.Graph({machineType: 'Mealy'}, {cellNamespace: namespace});

    this.repo = this.repositoryService.currentRepo;
    this.setupCollaboration();
    // this.setupPresence();

    const embed: HTMLElement = document.getElementById('diagram-paper-contents');
    const diagramPaper: HTMLDivElement = document.createElement('div');
    diagramPaper.setAttribute('id', 'diagramPaper');
    diagramPaper.style.margin = '5px';
    diagramPaper.style.borderStyle = 'solid';
    diagramPaper.style.borderWidth = '1.5px';
    diagramPaper.style.borderRadius = '10px';
    diagramPaper.style.overflow = 'auto';
    embed.appendChild(diagramPaper);
    const width: any = '86.5%';
    const height: any = '100vh';

    this.paper = this.newPaper.createPaper(
      diagramPaper,
      this.diagramGraph,
      width,
      height,
      namespace
    );

    /*
    this.paper.setInteractivity((cellView) => {
      return !this.lockedElements.has(cellView.model.id);
    });*/

    const verticesTool: joint.linkTools.Vertices = new joint.linkTools.Vertices();
    const boundaryTool: joint.linkTools.Boundary = new joint.linkTools.Boundary();
    const removeButton: joint.linkTools.Remove = new joint.linkTools.Remove();
    const elementVerticesTool: joint.elementTools.Boundary = new joint.elementTools.Boundary();
    const elementRemoveButton: joint.elementTools.Remove =
      new joint.elementTools.Remove({x: '100%', y: '0%'});

    this.linkToolsView = new joint.dia.ToolsView({
      tools: [verticesTool, boundaryTool, removeButton]
    });
    this.elementToolsViewOnClick = new joint.dia.ToolsView({
      tools: [elementVerticesTool, elementRemoveButton]
    });

    this.state_ids = new Array(1000);
    for (let i: number = 0; i < this.state_ids.length; i++) {
      this.state_ids[i] = 0;
    }
    this.addActionListeners();
  }

  public ngOnDestroy(): void {
    // this.localPresence.destroy();
    // this.presence.destroy();
    this.initializationDone = false;
    this.diagramGraph.clear();
    this.initializationDone = true;
    // this.visualisationsDoc.destroy();
    this.paper.remove();
    this.activeEmptyCell = null;
  }

  public changeActiveBoard(boardId: string): void {
    // this.localPresence.destroy();
    // this.localPresence = undefined;
    this.initializationDone = false;
    this.activeBoard = boardId;
    this.diagramGraph.clear();
    // this.lockedElements = new Map<string, { username: string; displayName: string }>();
    // this.elementLocks = new Map<string, string>();
    this.loadDiagramToGraph(this.visualisationsDoc.data[this.branch][this.activeBoard].diagram);
    this.initializationDone = true;
    // this.setupPresence();
  }
  /*
  public removePresenceLabel = (cellView: joint.dia.CellView) => {
    const labels: NodeListOf<Element> = cellView.$el[0]
      .querySelectorAll('.collab-presence-label');
    if (labels.length !== 0) {
      labels.forEach(value => value.remove());
    }
  }*/

  public loadDiagramToGraph(data: any): void {
    this.activeEmptyCell = null;
    data.cells.forEach(element => {
      if (element.type === 'standard.Ellipse') {
        const existingState: CollabState = {
          name: element.name,
          uniqueId: element.uniqueId,
          initial: element.initial,
          id: element.id,
          outputs: element.outputs,
          signals: element.signals,
          position: element.position
        };
        const existingStateElement: joint.shapes.standard.Ellipse =
          this.collabJointJsState.insertCollabState(existingState);
        existingStateElement.addTo(this.diagramGraph);
      }
    });
    data.cells.forEach(link => {
      if (link.type === 'standard.Link') {
        const existingTransition: CollabTransition = {
          source: link.source,
          target: link.target,
          condition: link.equation,
          id: link.id,
          outputs: link.outputs === undefined ? [] : link.outputs,
          signals: link.signals === undefined ? [] : link.signals,
          vertices: link.vertices === undefined ? [] : link.vertices
        };
        const existingTransitionLink: joint.shapes.standard.Link =
          this.collabJointJsTransition.insertCollabTransition(existingTransition);
        existingTransitionLink.addTo(this.diagramGraph);
      }
    });
    data.cells.forEach(cell => {
      if (cell.type === 'standard.TextBlock') {
        const newEmptyCell: EmptyCell = {
          machineType: cell.machineType,
          drawingMode: cell.drawingMode,
          codeToBeGenerated: cell.codeToBeGenerated,
          inputs: cell.inputs,
          outputs: cell.outputs,
          signals: cell.signals,
          parameters: cell.parameters,
          id: cell.id
        };
        this.loadedInputs.emit(newEmptyCell.inputs);
        this.loadedOutputs.emit(newEmptyCell.outputs);
        this.loadedSignals.emit(newEmptyCell.signals);
        this.loadedParameters.emit(newEmptyCell.parameters);
        this.loadedDrawingMode.emit(newEmptyCell.drawingMode);
        this.loadedMachineType.emit(newEmptyCell.machineType);
        this.loadedLanguage.emit(newEmptyCell.codeToBeGenerated);
        const preparedEmptyCell: joint.shapes.standard.TextBlock =
          this.collabEmptyCell.insertCollabEmptyCell(newEmptyCell);
        preparedEmptyCell.addTo(this.diagramGraph);
        this.activeEmptyCell = preparedEmptyCell;
        this.paper.options.interactive.elementMove = !newEmptyCell.drawingMode;
        this.updateMode(newEmptyCell.drawingMode);
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Delete') {
      if (this.activePaperLink != null && !this.areAnyWindowsOpen) {
        this.activePaperLink.remove();
        this.activePaperLink = null;
      }
      if (this.activePaperElement != null && !this.areAnyWindowsOpen) {
        this.activePaperElement.remove();
        this.activePaperElement = null;
      }
    } else if (event.key === 'e') {
      if (this.activePaperLink != null && !this.areAnyWindowsOpen) {
        this.activeTransition.emit(this.activePaperLink.attributes);
      }
      if (this.activePaperElement != null && !this.areAnyWindowsOpen) {
        this.currentStateName.emit(this.activePaperElement.attributes);
      }
    }
  }

  public addActionListeners(): void {
    this.paper.on('element:pointerdblclick', (elementView: any) => {
      this.activePaperElement = elementView.model;
      this.activePaperLink = null;
      this.currentStateName.emit(this.activePaperElement.attributes);
    });
    this.paper.on('link:contextmenu', (linkView: any) => {
      this.activePaperLink = linkView.model;
      this.activePaperElement = null;
      this.activeTransition.emit(this.activePaperLink.attributes);
    });
    this.paper.on('element:mouseout', (elementView: any) => {
      this.paper.hideTools();
      this.activePaperElement = elementView.model;
      this.activePaperLink = null;
      elementView.removeTools();
      elementView.addTools(this.elementToolsViewOnClick);
      elementView.showTools(this.elementToolsViewOnClick);
    });
    this.paper.on('link:mouseout', (linkView: any) => {
      this.paper.hideTools();
      this.activePaperLink = linkView.model;
      this.activePaperElement = null;
      linkView.removeTools();
      linkView.addTools(this.linkToolsView);
      linkView.showTools(this.linkToolsView);
    });
    this.paper.on('blank:pointerclick', () => {
      this.paper.hideTools();
      this.activePaperLink = null;
      this.activePaperElement = null;
    });
    this.paper.on('blank:pointerdown', (event, x, y) => {
      this.activePaperLink = null;
      this.activePaperElement = null;
      this.dragStartPosition = {x, y};
    });
    this.paper.on('cell:pointerup blank:pointerup', () => {
      delete this.dragStartPosition;
      // this.heldCellId = undefined;
      // this.submitPresence(undefined, undefined, undefined, cell.model.id);
    });
    this.paper.on('link:connect', (linkView) => {
      if (linkView.model.attributes.source.id === linkView.model.attributes.target.id) {
        const oldID: any = linkView.model.attributes.id;
        this.diagramGraph.getLinks().forEach(link => {
          if (oldID === link.attributes.id) {
            link.remove();
            link = null;
          }
        });
      } else {
        const newOutputData: MatTableDataSource<OutputAssignments>
          = new MatTableDataSource<OutputAssignments>([]);
        for (const output of this.dataOutputSource.data) {
          newOutputData.data.push({
            name: output.name,
            bits: output.bits,
            type: 'Binary',
            value: ''
          });
        }
        const newSignalData: MatTableDataSource<SignalAssignments> =
          new MatTableDataSource<SignalAssignments>([]);
        for (const signal of this.dataSignalSource.data) {
          newSignalData.data.push({
            name: signal.name,
            bits: signal.bits,
            type: 'Binary',
            value: ''
          });
        }
        const alternativeTransition: CollabTransition = {
          source: linkView.model.attributes.source,
          target: linkView.model.attributes.target,
          condition: '1',
          id: linkView.model.attributes.id,
          outputs: newOutputData.data,
          signals: newSignalData.data,
          vertices: linkView.model.attributes.vertices
        };
        const oldID: any = linkView.model.attributes.id;
        this.diagramGraph.getLinks().forEach(link => {
          if (oldID === link.attributes.id) {
            link.remove();
            link = null;
          }
        });
        const newTransition: joint.shapes.standard.Link =
          this.collabJointJsTransition.insertCollabTransition(alternativeTransition);
        newTransition.addTo(this.diagramGraph);
      }
    });
    this.diagramGraph.on('add', (cell) => {
      if (!this.suppressOutgoing && this.initializationDone) {
        addCellToDiagram(this.visualisationsDoc, cell.attributes, this.branch, this.activeBoard,
          () => {
            this.suppressOutgoing = false;
          });
      } else {
        this.suppressOutgoing = false;
      }
    });
    this.diagramGraph.on('change', (event) => {
      if (!this.suppressOutgoing && this.initializationDone) {
        changeDiagramCell(this.visualisationsDoc, event, this.branch, this.activeBoard, () => {
          this.suppressOutgoing = false;
        });
      } else {
        this.suppressOutgoing = false;
      }
    });
    this.diagramGraph.on('remove', (event) => {
      if (!this.suppressOutgoing && this.initializationDone) {
        removeCellFromDiagram(this.visualisationsDoc, event.id, this.branch, this.activeBoard,
          () => {
            this.suppressOutgoing = false;
          });
      } else {
        this.suppressOutgoing = false;
      }
    });
    /*
    this.paper.on('cell:pointerdown', (cell) => {
      this.heldCellId = cell.model.id;
      if (!this.lockedElements.has(cell.model.id)) {
        this.submitPresence(undefined, undefined, cell.model.id);
      }
    });
    this.paper.on('cell:mouseenter', (cellView: joint.dia.CellView) => {
      const labels: NodeListOf<Element> = cellView.$el[0]
        .querySelectorAll('.collab-presence-label');
      if (this.lockedElements.has(cellView.model.id as string) && labels.length === 0) {
        const label: SVGTextElement = document.createElementNS(
          'http://www.w3.org/2000/svg', 'text');
        const lockOwner: { username: string; displayName: string } =
          this.lockedElements.get(cellView.model.id as string);
        label.textContent = lockOwner.displayName;
        label.setAttribute('class', 'collab-presence-label');
        label.setAttribute('x', '0');
        label.setAttribute('y', '0');
        label.setAttribute('fill', 'white');

        if (cellView.$el.hasClass('joint-link')) {
          const pathBBox: DOMRect = (cellView.$el[0].firstElementChild as SVGPathElement).getBBox();
          label.setAttribute('x', (pathBBox.x + pathBBox.width / 2) as any);
          label.setAttribute('y', (pathBBox.y + pathBBox.height / 2) as any);
        }

        cellView.$el[0].appendChild(label);
        const labelRect: DOMRect = label.getBBox();

        const rect: SVGRectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', labelRect.x as any);
        rect.setAttribute('y', labelRect.y as any);
        rect.setAttribute('width', labelRect.width as any);
        rect.setAttribute('height', labelRect.height as any);
        rect.setAttribute('fill', this.collabService.getUserColor(lockOwner.username));
        rect.setAttribute('class', 'collab-presence-label');
        cellView.$el[0].insertBefore(rect, label);
      }
    });
    this.paper.on('cell:mouseleave', this.removePresenceLabel);
    */
  }

  public changeMachineType(newType: string): void {
    this.diagramGraph.attributes.machineType = newType;
    if (this.activeEmptyCell !== null) {
      this.activeEmptyCell.prop('machineType', newType);
    }
  }

  public addNewState(state: State, drawingMode: boolean): void {
    const newState: joint.shapes.standard.Ellipse = this.jointJsState.insertState(state);
    let id: number;
    if (newState.attributes.initial === true) {
      if (!this.isInitialStateInsertable()) {
        const config: MatSnackBarConfig<any> = new MatSnackBarConfig();
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';
        config.duration = 5000;
        config.panelClass = ['snackbar'];
        this.snackBar.open(
          'Cannot insert more than one initial state',
          'OK',
          config
        );
        return;
      }
      newState.attributes.uniqueid = 1;
      const newOutputData: MatTableDataSource<OutputAssignments>
        = new MatTableDataSource<OutputAssignments>([]);
      for (const output of this.dataOutputSource.data) {
        newOutputData.data.push({
          name: output.name,
          bits: output.bits,
          type: 'Binary',
          value: ''
        });
      }
      const newSignalData: MatTableDataSource<SignalAssignments> =
        new MatTableDataSource<SignalAssignments>([]);
      for (const signal of this.dataSignalSource.data) {
        newSignalData.data.push({
          name: signal.name,
          bits: signal.bits,
          type: 'Binary',
          value: ''
        });
      }
      newState.prop('outputs', newOutputData.data);
      newState.prop('signals', newSignalData.data);
      this.state_ids[1] = 1;
      if (drawingMode) {
        newState.prop('attrs/body/magnet', true);
      } else {
        newState.prop('attrs/body/magnet', 'passive');
      }
      newState.addTo(this.diagramGraph);
    } else {
      for (let i: number = 2; i < this.state_ids.length; i++) {
        if (this.state_ids[i] === 0) {
          id = i;
          break;
        }
      }
      if (drawingMode) {
        newState.prop('attrs/body/magnet', true);
      } else {
        newState.prop('attrs/body/magnet', 'passive');
      }
      newState.attributes.uniqueid = id;
      const newOutputData: MatTableDataSource<OutputAssignments>
        = new MatTableDataSource<OutputAssignments>([]);
      for (const output of this.dataOutputSource.data) {
        newOutputData.data.push({
          name: output.name,
          bits: output.bits,
          type: 'Binary',
          value: ''
        });
      }
      const newSignalData: MatTableDataSource<SignalAssignments> =
        new MatTableDataSource<SignalAssignments>([]);
      for (const signal of this.dataSignalSource.data) {
        newSignalData.data.push({
          name: signal.name,
          bits: signal.bits,
          type: 'Binary',
          value: ''
        });
      }
      newState.prop('outputs', newOutputData.data);
      newState.prop('signals', newSignalData.data);
      this.state_ids[id] = 1;
      newState.addTo(this.diagramGraph);
    }
  }

  public createNewStateWithSpecifiedAttributes(state: CollabState, drawingMode: boolean): void {
    const newState: joint.shapes.standard.Ellipse =
      this.collabJointJsState.insertCollabState(state);
    if (drawingMode) {
      newState.prop('attrs/body/magnet', true);
    } else {
      newState.prop('attrs/body/magnet', 'passive');
    }
    newState.addTo(this.diagramGraph);
  }

  public isInitialStateInsertable(): boolean {
    let isInsertable: boolean = true;
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.type === 'standard.Ellipse' && element.attributes.initial === true) {
       isInsertable = false;
      }
    });
    return isInsertable;
  }

  public isThisStateUnique(stateName: string): boolean {
    let isStateUnique: boolean = true;
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.name === stateName) {
        isStateUnique = false;
      }
    });
    return isStateUnique;
  }

  public getStateNameById(id: string): string {
    let name: string = '';
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.id === id) {
        name = element.attributes.name;
      }
    });
    return name;
  }

  public getStateBasedOnName(name: string): joint.shapes.standard.Ellipse {
    let state: any = null;
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.name === name) {
        state = element;
      }
    });
    return state;
  }

  public getStateBasedOnId(id: string): joint.shapes.standard.Ellipse {
    let state: any = null;
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.id === id) {
        state = element;
      }
    });
    return state;
  }

  public changeMode(booleanValue: any): void {
    if (this.activeEmptyCell !== null) {
      this.activeEmptyCell.prop('drawingMode', booleanValue);
    }
    if (booleanValue) {
      this.diagramGraph.getElements().forEach(element => {
        element.prop('attrs/body/magnet', true);
      });
      this.paper.options.interactive.elementMove = false;
    } else {
      this.diagramGraph.getElements().forEach(element => {
        element.prop('attrs/body/magnet', 'passive');
      });
      this.paper.options.interactive.elementMove = true;
    }
  }

  public updateStateName(modifiedStateName: string): void {
    this.activePaperElement.prop('attrs/label/text', modifiedStateName);
    this.activePaperElement.prop('name', modifiedStateName);
  }

  public updateCondition(modifiedCondition: string): void {
    if (modifiedCondition !== '') {
      this.activePaperLink.prop('equation', modifiedCondition);
      this.activePaperLink.removeLabel(0);
      this.activePaperLink.appendLabel({
        attrs: {
          text: {
            text: modifiedCondition
          }
        }
      });
    }
  }

  public updateTransitionOutputs(modifiedOutputAssignments: OutputAssignments[]): void {
    this.activePaperLink.prop('outputs', modifiedOutputAssignments);
  }

  public updateTransitionSignals(modifiedSignalAssignments: SignalAssignments[]): void {
    this.activePaperLink.prop('signals', modifiedSignalAssignments);
  }

  public updateStateOutputs(modifiedOutputAssignments: OutputAssignments[]): void {
    this.activePaperElement.prop('outputs', modifiedOutputAssignments);
  }

  public updateStateSignals(modifiedSignalAssignments: SignalAssignments[]): void {
    this.activePaperElement.prop('signals', modifiedSignalAssignments);
  }

  public updateAllTransitionOutputs(modifiedOutputSource: Outputs[]): void {
    this.diagramGraph.getLinks().forEach(link => {
      const newOutputData: MatTableDataSource<OutputAssignments>
        = new MatTableDataSource<OutputAssignments>([]);
      let i: number = 0;
      while (i >= 0) {
        let outputExists: boolean = false;
        if (modifiedOutputSource[i] === undefined) {
          break;
        } else {
          for (const linkOutput of link.attributes.outputs) {
            if (modifiedOutputSource[i].name === linkOutput.name
              && modifiedOutputSource[i].bits === linkOutput.bits) {
              newOutputData.data.push({
                name: modifiedOutputSource[i].name,
                bits: modifiedOutputSource[i].bits,
                type: linkOutput.type,
                value: linkOutput.value
              });
              outputExists = true;
            }
          }
          if (outputExists === false) {
            newOutputData.data.push({
              name: modifiedOutputSource[i].name,
              bits: modifiedOutputSource[i].bits,
              type: 'Binary',
              value: ''
            });
          }
        }
        i++;
      }
      link.prop('outputs', newOutputData.data);
    });
  }

  public updateAllTransitionSignals(modifiedSignalSource: Signals[]): void {
    this.diagramGraph.getLinks().forEach(link => {
      const newSignalData: MatTableDataSource<SignalAssignments>
        = new MatTableDataSource<SignalAssignments>([]);
      let i: number = 0;
      while (i >= 0) {
        let signalExists: boolean = false;
        if (modifiedSignalSource[i] === undefined) {
          break;
        } else {
          for (const linkSignal of link.attributes.signals) {
            if (modifiedSignalSource[i].name === linkSignal.name
              && modifiedSignalSource[i].bits === linkSignal.bits) {
              newSignalData.data.push({
                name: modifiedSignalSource[i].name,
                bits: modifiedSignalSource[i].bits,
                type: linkSignal.type,
                value: linkSignal.value
              });
              signalExists = true;
            }
          }
          if (signalExists === false) {
            newSignalData.data.push({
              name: modifiedSignalSource[i].name,
              bits: modifiedSignalSource[i].bits,
              type: 'Binary',
              value: ''
            });
          }
        }
        i++;
      }
      link.prop('signals', newSignalData.data);
    });
  }

  public updateAllStateOutputs(modifiedOutputSource: Outputs[]): void {
    this.diagramGraph.getElements().forEach(element => {
      const newOutputData: MatTableDataSource<OutputAssignments>
        = new MatTableDataSource<OutputAssignments>([]);
      let i: number = 0;
      while (i >= 0) {
        let outputExists: boolean = false;
        if (modifiedOutputSource[i] === undefined) {
          break;
        } else {
          for (const stateOutput of element.attributes.outputs) {
            if (modifiedOutputSource[i].name === stateOutput.name
              && modifiedOutputSource[i].bits === stateOutput.bits) {
              newOutputData.data.push({
                name: modifiedOutputSource[i].name,
                bits: modifiedOutputSource[i].bits,
                type: stateOutput.type,
                value: stateOutput.value
              });
              outputExists = true;
            }
          }
          if (outputExists === false) {
            newOutputData.data.push({
              name: modifiedOutputSource[i].name,
              bits: modifiedOutputSource[i].bits,
              type: 'Binary',
              value: ''
            });
          }
        }
        i++;
      }
      element.prop('outputs', newOutputData.data);
    });
  }

  public updateAllStateSignals(modifiedSignalSource: Signals[]): void {
    this.diagramGraph.getElements().forEach(element => {
      const newSignalData: MatTableDataSource<SignalAssignments>
        = new MatTableDataSource<SignalAssignments>([]);
      let i: number = 0;
      while (i >= 0) {
        let signalExists: boolean = false;
        if (modifiedSignalSource[i] === undefined) {
          break;
        } else {
          for (const stateSignal of element.attributes.signals) {
            if (modifiedSignalSource[i].name === stateSignal.name
              && modifiedSignalSource[i].bits === stateSignal.bits) {
              newSignalData.data.push({
                name: modifiedSignalSource[i].name,
                bits: modifiedSignalSource[i].bits,
                type: stateSignal.type,
                value: stateSignal.value
              });
              signalExists = true;
            }
          }
          if (signalExists === false) {
            newSignalData.data.push({
              name: modifiedSignalSource[i].name,
              bits: modifiedSignalSource[i].bits,
              type: 'Binary',
              value: ''
            });
          }
        }
        i++;
      }
      element.prop('signals', newSignalData.data);
    });
  }

  public saveDiagramAsXML(filename: string, machineType: string, language: string): void {
    let content: string = '';
    content += '<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n';
    content += '<module name=\"' + this.replaceSpecialChars(filename) + '\" ' +
      'machine_type=\"' + machineType + '\">\n';
    content += '  <language>' + language + '</language>\n';
    content += '  <states>\n';
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.type === 'standard.Ellipse') {
        content += '    <state name=\"' + element.attributes.name + '\">\n';
        content += '      <id>' + element.attributes.id + '</id>\n';
        content += '      <initial>' + element.attributes.initial + '</initial>\n';
        content += '      <positionx>' + element.attributes.position.x + '</positionx>\n';
        content += '      <positiony>' + element.attributes.position.y + '</positiony>\n';
        if (machineType === 'Moore') {
          for (const output of element.attributes.outputs) {
            content += '      <output name=\"' + output.name + '\">\n';
            content += '        <bits>' + output.bits + '</bits>\n';
            content += '        <type>' + output.type + '</type>\n';
            content += '        <value>' + this.replaceSpecialChars(output.value) + '</value>\n';
            content += '      </output>\n';
          }
          for (const signal of element.attributes.signals) {
            content += '      <signal name=\"' + signal.name + '\">\n';
            content += '        <bits>' + signal.bits + '</bits>\n';
            content += '        <type>' + signal.type + '</type>\n';
            content += '        <value>' + this.replaceSpecialChars(signal.value) + '</value>\n';
            content += '      </signal>\n';
          }
        }
        content += '    </state>\n';
      }
    });
    content += '  </states>\n';
    content += '  <inputs>\n';
    for (const input of this.dataInputSource.data) {
      content += '    <input name=\"' + input.name + '\">\n';
      content += '      <bits>' + input.bits + '</bits>\n';
      content += '    </input>\n';
    }
    content += '  </inputs>\n';
    content += '  <outputs>\n';
    for (const output of this.dataOutputSource.data) {
      content += '    <output name=\"' + output.name + '\">\n';
      content += '      <bits>' + output.bits + '</bits>\n';
      content += '    </output>\n';
    }
    content += '  </outputs>\n';
    content += '  <signals>\n';
    for (const signal of this.dataSignalSource.data) {
      content += '    <signal name=\"' + signal.name + '\">\n';
      content += '      <bits>' + signal.bits + '</bits>\n';
      content += '    </signal>\n';
    }
    content += '  </signals>\n';
    content += '  <parameters>\n';
    for (const parameter of this.dataParameterSource.data) {
      content += '    <parameter name=\"' + parameter.name + '\">\n';
      content += '      <type>' + parameter.type + '</type>\n';
      content += '      <value>' + parameter.value + '</value>\n';
      content += '    </signal>\n';
    }
    content += '  </parameters>\n';
    content += '  <transitions>\n';
    this.diagramGraph.getLinks().forEach(link => {
      content += '    <transition id=\"' + link.attributes.id + '\">\n';
      content += '      <equation>' + this.replaceSpecialChars(link.attributes.equation) + '</equation>\n';
      content += '      <sourceid>' + link.getSourceElement().attributes.id + '</sourceid>\n';
      content += '      <targetid>' + link.getTargetElement().attributes.id + '</targetid>\n';
      if (machineType === 'Mealy') {
        for (const output of link.attributes.outputs) {
          content += '      <output name=\"' + output.name + '\">\n';
          content += '        <bits>' + output.bits + '</bits>\n';
          content += '        <type>' + output.type + '</type>\n';
          content += '        <value>' + this.replaceSpecialChars(output.value) + '</value>\n';
          content += '      </output>\n';
        }
        for (const signal of link.attributes.signals) {
          content += '      <signal name=\"' + signal.name + '\">\n';
          content += '        <bits>' + signal.bits + '</bits>\n';
          content += '        <type>' + signal.type + '</type>\n';
          content += '        <value>' + this.replaceSpecialChars(signal.value) + '</value>\n';
          content += '      </signal>\n';
        }
      }
      if (link.attributes.vertices !== undefined) {
        for (const linkVertex of link.attributes.vertices) {
          content += '      <vertex x=\"' + linkVertex.x + '\" y=\"';
          content += linkVertex.y + '\"></vertex>\n';
        }
      }
      content += '    </transition>\n';
    });
    content += '  </transitions>\n';
    content += '</module>\n';
    this.xmlFileContent.emit(content);
  }

  public getAllStates(): any {
    const states: any[] = [];
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.type === 'standard.Ellipse') {
        states.push(element);
      }
    });
    return states;
  }

  public getAllStateNames(id: string): string[] {
    const stateNames: any[] = [];
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.type === 'standard.Ellipse' && element.attributes.id !== id) {
        stateNames.push(element.attributes.name);
      }
    });
    return stateNames;
  }

  public getAllTransitions(): any {
    return this.diagramGraph.getLinks();
  }

  public zoomIn(): void {
    this.zoomLevel += 0.05;
    this.paper.scale(this.zoomLevel, this.zoomLevel);
  }

  public zoomOut(): void {
    this.zoomLevel -= 0.05;
    this.paper.scale(this.zoomLevel, this.zoomLevel);
  }

  public clearGraph(): void {
    this.diagramGraph.clear();
    this.dataInputSource.data = [];
    this.dataInputSource._updateChangeSubscription();
    this.dataOutputSource.data = [];
    this.dataOutputSource._updateChangeSubscription();
    this.dataSignalSource.data = [];
    this.dataSignalSource._updateChangeSubscription();
    this.dataParameterSource.data = [];
    this.dataParameterSource._updateChangeSubscription();
  }

  public addLinkToGraph(link: any): void {
    link.addTo(this.diagramGraph);
  }

  public findEmptyCell(
    machineType: string,
    drawingMode: boolean,
    codeToBeGenerated: string,
    inputs: any,
    outputs: any,
    signals: any,
    parameters: any
  ): void {
    if (this.activeEmptyCell !== null) {
      this.updateEmptyCellInputs(inputs);
      this.updateEmptyCellOutputs(outputs);
      this.updateEmptyCellSignals(signals);
      this.updateEmptyCellParameters(parameters);
    } else {
      this.createNewEmptyCell(
        machineType,
        drawingMode,
        codeToBeGenerated,
        inputs,
        outputs,
        signals,
        parameters
      );
    }
  }

  public updateEmptyCellInputs(inputs: any): void {
    this.activeEmptyCell.prop('inputs', inputs);
  }

  public updateEmptyCellOutputs(outputs: any): void {
    this.activeEmptyCell.prop('outputs', outputs);
  }

  public updateEmptyCellSignals(signals: any): void {
    this.activeEmptyCell.prop('signals', signals);
  }

  public updateEmptyCellParameters(parameters: any): void {
    this.activeEmptyCell.prop('parameters', parameters);
  }

  public updateLanguage(language: string): void {
    if (this.activeEmptyCell !== null) {
      this.activeEmptyCell.prop('codeToBeGenerated', language);
    }
  }

  public createNewEmptyCell(
    machineType: string,
    drawingMode: boolean,
    codeToBeGenerated: string,
    inputs: any,
    outputs: any,
    signals: any,
    parameters: any
  ): void {
    const newEmptyCell: EmptyCell = {
      machineType,
      drawingMode,
      codeToBeGenerated,
      inputs,
      outputs,
      signals,
      parameters
    };
    const preparedEmptyCell: joint.shapes.standard.TextBlock =
      this.collabEmptyCell.insertCollabEmptyCell(newEmptyCell);
    preparedEmptyCell.addTo(this.diagramGraph);
    this.activeEmptyCell = preparedEmptyCell;
  }

  private setupCollaboration(): void {
    this.visualisationsDoc = this.collabService
      .createVisualisations(this.repo.uuid.toString(), undefined, (doc) => {
        doc.subscribe(() => {
          initializeDiagram(doc, this.branch,
            'Default',
            undefined,
            this.activeBoard,
            () => {
              this.loadDiagramToGraph(
                doc.data[this.branch][this.activeBoard].diagram);
              this.initializationDone = true;
            });
          doc.on('op', (operation: any[], source) => {
            if (!source) {
              for (const c of operation) {
                if (c.p[0] === this.branch && c.p[1] === this.activeBoard) {
                  c.p = c.p.slice(c.p.indexOf('cells') + 1);
                  if (c.p.length === 1) {
                    if (c.li) {
                      this.suppressOutgoing = true;
                      this.diagramGraph.addCell(c.li);
                    }
                    if (c.ld) {
                      const cell: joint.dia.Cell = this.diagramGraph.getCell(c.ld.id);
                      this.suppressOutgoing = true;
                      this.diagramGraph.removeCells([cell]);
                    }
                  } else if (c.p.length > 1) {
                    if (c.od && c.oi) {
                      const cellId: string = this.visualisationsDoc
                        .data[this.branch][this.activeBoard].diagram.cells[c.p[0]].id;
                      const cell: joint.dia.Cell = this.diagramGraph.getCell(cellId);
                      this.suppressOutgoing = true;
                      cell.set(c.p[1], c.oi);
                    }
                  }
                }
              }
            }
          });
        });
      });
  }
  /*
  private setupPresence(): void {
    this.presence = this.collabService
      .getFilePresence(getVisualizationPresenceId(this.repo.uuid, this.branch, this.activeBoard));
    this.presence.subscribe(() => {
      this.presence.on('receive', (id: string, presence: VisPresence) => {
        if (presence) {
          if (presence.click) {
            const ripplePoint: joint.g.Point = this.paper.localToClientPoint(
              presence.click.position.x, presence.click.position.y);
            this.ripple.launch(ripplePoint.x, ripplePoint.y, {
              color: this.collabService.getUserColor(presence.userName) + '88',
              radius: 20
            });
          }
          const highlightOpts: object = this.getHighlightOpts(presence.userName);
          if (presence.lockedElementId) {
            this.diagramGraph.getCell(presence.lockedElementId).findView(this.paper)
              .highlight(null, highlightOpts);
            this.lockedElements.set(presence.lockedElementId,
              {username: presence.userName, displayName: presence.displayName});
            this.elementLocks.set(id, presence.lockedElementId);
          }
          if (presence.unlockedElementId) {
            this.diagramGraph.getCell(presence.unlockedElementId).findView(this.paper)
              .unhighlight(null, highlightOpts);
            this.lockedElements.delete(presence.unlockedElementId);
            this.elementLocks.delete(id);
          }
          if (!this.userPresences.has(id)) {
            this.userPresences.set(id, presence.displayName);
            let collaborator: ICollaborator = this.collaborators.get(presence.displayName);
            if (collaborator) {
              collaborator.count += 1;
            } else {
              collaborator = {
                name: presence.displayName,
                color: this.collabService.getUserColor(presence.userName),
                count: 1
              };
            }
            this.collaborators.set(presence.displayName, collaborator);
          }
          if (presence.request) {
            this.snackBar.open(`${presence.displayName} joined visualization.`, 'OK', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          }
        } else {
          if (this.userPresences.has(id)) {
            const name: string = this.userPresences.get(id);
            this.snackBar.open(`${name} left visualization.`, 'OK', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom'
            });
            this.userPresences.delete(id);
            const collaborator: ICollaborator = this.collaborators.get(name);
            if (collaborator) {
              if (collaborator.count > 1) {
                collaborator.count -= 1;
              } else {
                this.collaborators.delete(name);
              }
            }
          }
          const lock: string = this.elementLocks.get(id);
          if (lock) {
            this.elementLocks.delete(id);
            const lockOwner: { username: string; displayName: string } =
              this.lockedElements.get(lock);
            this.lockedElements.delete(lock);
            const cellView: joint.dia.CellView = this.diagramGraph
              .getCell(lock).findView(this.paper);
            cellView.unhighlight(null, this.getHighlightOpts(lockOwner.username));
            this.removePresenceLabel(cellView);
          }
        }
      });
    });
    this.localPresence = this.presence.create();
    this.submitPresence(undefined, true);
  }

  private submitPresence(click?: { position: { x: number; y: number } }, request?: boolean,
                         lockedElementId?: string, unlockedElementId?: string): void {
    const user: any = this.authService.currentUser as any;
    const presence: VisPresence = {
      userName: user.username,
      displayName: `${user.firstName} ${user.lastName}`,
      request,
      click,
      lockedElementId,
      unlockedElementId
    };
    if (this.localPresence) {
      this.localPresence.submit(presence);
    }
  }

  private getHighlightOpts(username: string): object {
    return {
      highlighter: {
        name: 'stroke',
        options: {
          padding: 3,
          rx: 3,
          ry: 3,
          attrs: {
            'stroke-width': 3,
            stroke: this.collabService.getUserColor(username)
          }
        }
      }
    };
  }*/

  private updateMode(booleanValue: any): void {
    if (booleanValue) {
      this.diagramGraph.getElements().forEach(element => {
        element.prop('attrs/body/magnet', true);
      });
    } else {
      this.diagramGraph.getElements().forEach(element => {
        element.prop('attrs/body/magnet', 'passive');
      });
    }
  }

  private replaceSpecialChars(inputString: string): string {
    return inputString?.replace(/&/g, '&amp;').replace(/>/g, '&gt;')
      .replace(/</g, '&lt;').replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  public countNumberOfStates(): number {
    let stateCount: number = 0;
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.type === 'standard.Ellipse') {
        stateCount = stateCount + 1;
      }
    });
    return stateCount;
  }

  public findIsolatedState(): string {
    const states: any[] = this.getAllStates();
    const transitions: any[] = this.getAllTransitions();
    let isStateIsolated: boolean = false;
    for (const state of states) {
      isStateIsolated = true;
      for (const transition of transitions) {
        if (transition.attributes.source.id === state.attributes.id
          || transition.attributes.target.id === state.attributes.id) {
          isStateIsolated = false;
          break;
        }
      }
      if (isStateIsolated) {
        return state.attributes.name;
      }
    }
    return '';
  }

  public findIncorrectConditionsBasedOnCode(language: string): boolean {
    const transitions: any[] = this.getAllTransitions();
    this.conditionErrors = '';
    // tslint:disable-next-line:no-this-assignment
    const parent: any = this;
    for (const transition of transitions) {
      // tslint:disable-next-line:new-parens
      const listener: ANTLRErrorListener<Token> = new class implements ANTLRErrorListener<Token> {
        public syntaxError<T>(
          recognizer: Recognizer<T, any>,
          offendingSymbol: T | undefined,
          line: number,
          charPositionInLine: number,
          msg: string,
        ): void {
          parent.conditionErrors = `column ${charPositionInLine - 8}: ${msg}`;
        }
      };
      if (language === 'VHDL') {
        const object: TestConditionVHDL = new TestConditionVHDL(transition.attributes.equation);
        const code: string = object.getCode();
        const inputStream: ANTLRInputStream = new ANTLRInputStream(code);
        const lexer: vhdlLexer = new vhdlLexer(inputStream);
        const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
        const parser: vhdlParser = new vhdlParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener(listener);
        parser.design_file();
        if (this.conditionErrors.length !== 0) {
          return false;
        }
      } else {
        const object: TestCondition = new TestCondition(transition.attributes.equation);
        const code: string = object.getCode();
        const inputStream: ANTLRInputStream = new ANTLRInputStream(code);
        const lexer: SystemVerilogLexer = new SystemVerilogLexer(inputStream);
        const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
        const parser: SystemVerilogParser = new SystemVerilogParser(tokenStream);
        parser.removeErrorListeners();
        parser.addErrorListener(listener);
        parser.source_text();
        if (this.conditionErrors.length !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  public areAllStateNamesUnique(): boolean {
    let areAllStatesUnique: boolean = true;
    this.diagramGraph.getElements().forEach(element => {
      if (element.attributes.type === 'standard.Ellipse') {
        this.diagramGraph.getElements().forEach(element2 => {
          if (element2.attributes.type === 'standard.Ellipse'
            && element2.attributes.id !== element.attributes.id
            && element2.attributes.name === element.attributes.name) {
            areAllStatesUnique = false;
          }
        });
      }
    });
    return areAllStatesUnique;
  }
}
