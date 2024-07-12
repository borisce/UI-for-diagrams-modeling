import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as joint from 'jointjs';
import { MatRipple } from '@angular/material/core';
import { Diagram } from '../model/diagram';
import { JointJsState } from '../../state-machines/other-classes/jointjsstate';
import { CollabJointJSState } from '../../state-machines/other-classes/collabJointJSState';
import { CollabJointJSTransition } from '../../state-machines/other-classes/collabJointJSTransition';
import { CollabEmptyCell } from '../../state-machines/other-classes/collabEmptyCell';
import { ModuleNode } from '../model/module-node.model';
import { ModuleHierarchyService } from '../service/module-hierarchy.service';
import { ParserService } from '../service/parser.service';
import { FileService } from '../service/file.service';
import { MatDialog } from '@angular/material/dialog';
import { FileTreeNode } from '../../../core/fileSystem/FileTree/filetree.node.interface';
import { CollabService } from '../../../core/service/collab.service';
import { RepositoryService } from '../../../core/service/repository.service';
import { DiagramStateService } from '../service/diagram-state.service';
import { V } from 'jointjs';
import { DownloadService } from '../service/download.service';
import { CollapseExpandButton } from '../model/CollapseExpandButton';
import { ModalSelectFileComponent } from '../../../modal/modal-select-file/modal-select-file.component';

@Component({
  selector: 'app-diagram-paper',
  templateUrl: './diagram-paper.component.html',
  styleUrls: ['./diagram-paper.component.scss'],
  providers: [Diagram, JointJsState, CollabJointJSState, CollabJointJSTransition, CollabEmptyCell],
  encapsulation: ViewEncapsulation.None,
})

export class DiagramPaperComponent implements OnInit, OnDestroy {
  @Output() public currentStateName: EventEmitter<any> = new EventEmitter<any>();
  @Output() public activeTransition: EventEmitter<any> = new EventEmitter<any>();
  @Output() public loadedDrawingMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public loadedLanguage: EventEmitter<string> = new EventEmitter<string>();
  @Input() public isDrawingModeEnabled: boolean;
  @Input() public areAnyWindowsOpen: boolean;
  @ViewChild(MatRipple) public readonly ripple: MatRipple;
  public repoMetadataDoc: any;
  public repo: any;
  public rootFile: FileTreeNode;

  private _myGit: string = localStorage.getItem('currentBranch') || 'master';
  /*Board Stuff*/
  public activePaperElement: any = null;
  public activePaperLink: any = null;
  public activeEmptyCell: any = null;
  public elementToolsViewOnClick: any;
  public zoomLevel: number = 1;
  public dragStartPosition: any;
  private diagramGraph: any;
  public paper: any;
  private moduleNodesMap: Map<string, ModuleNode>;
  private interactionMode: 'move' | 'select' = 'move';
  private selectedElements: Set<string> = new Set<string>();
  private selectionBox: joint.shapes.standard.Rectangle | null = null;
  private selectionStart: joint.dia.Point | null = null;
  private selectionInitialPos: Map<string, joint.g.Point> = new Map<string, joint.g.Point>();
  private collapseExpandButton: CollapseExpandButton;
  public customHoverData: any = null;
  public compileDefiniteUnsuccessfulInstances: boolean = true;
  public pendingCompileDefiniteUnsuccessfulInstances: boolean = true;
  public compileIndefiniteInstances: boolean = true;
  public pendingCompileIndefiniteInstances: boolean = true;
  public compileOptionsVisible: boolean = false;
  public isLoading: boolean;
  private debounceTimeout: any;
  private debounceDelay: number = 1000;

  constructor(
    private newPaper: Diagram,
    private moduleHierarchyService: ModuleHierarchyService,
    private systemVerilogParserService: ParserService,
    private fileService: FileService,
    private dialog: MatDialog,
    private collabService: CollabService,
    private repoService: RepositoryService,
    private diagramStateService: DiagramStateService,
    private downloadService: DownloadService
  ) {}

  public async ngOnInit(): Promise<void> {
    const namespace: typeof joint.shapes = joint.shapes;
    this.diagramGraph = new joint.dia.Graph({cellNamespace: namespace});

    const embed: HTMLElement = document.getElementById('diagram-paper-contents');
    const diagramPaper: HTMLDivElement = document.createElement('div');
    diagramPaper.setAttribute('id', 'diagramPaper');
    diagramPaper.style.marginLeft = '47px';
    diagramPaper.style.borderStyle = 'solid';
    diagramPaper.style.borderWidth = '1.5px';
    diagramPaper.style.borderColor = 'rgba(134,134,134,0.37)';
    diagramPaper.style.overflow = 'auto';
    embed.appendChild(diagramPaper);
    const width: any = '97.5%';
    const height: any = '89.6vh';

    this.paper = this.newPaper.createPaper(
      diagramPaper,
      this.diagramGraph,
      width,
      height,
      namespace
    );
    this.addActionListeners();

    this.compileDefiniteUnsuccessfulInstances = this.diagramStateService.loadCheckboxState('compileDefiniteUnsuccessfulInstances');
    this.compileIndefiniteInstances = this.diagramStateService.loadCheckboxState('compileIndefiniteInstances');
    this.pendingCompileDefiniteUnsuccessfulInstances = this.compileDefiniteUnsuccessfulInstances;
    this.pendingCompileIndefiniteInstances = this.compileIndefiniteInstances;

    this.repo = this.repoService.currentRepo;
    this.repoMetadataDoc = this.collabService.getRepoMetadataDoc(
      this.repo.uuid
    );
    this.repoMetadataDoc.fetch((e: any) => {
      if (e) {
        console.error('Error fetching repo metadata:', e);
        return;
      }
    });
    this.diagramStateService.loadDiagramFromLocalStorage(this.diagramGraph, this.repo.uuid);
    this.diagramStateService.saveRepoUuidToLocalStorage(this.repo.uuid);
    this.rootFile = this.diagramStateService.loadRootFileFromLocalStorage();
  }

  public ngOnDestroy(): void {
    this.activeEmptyCell = null;
  }

  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e: any): void {
    if (this.dragStartPosition) {
      this.paper.translate(e.offsetX - this.dragStartPosition.x * this.zoomLevel,
        e.offsetY - this.dragStartPosition.y * this.zoomLevel);
    }
  }

  // @HostListener('document:keydown', ['$event'])
  // public handleKeyboardEvent(event: KeyboardEvent): void {
  //   if (event.key === 'Delete') {
  //     if (this.activePaperLink != null && !this.areAnyWindowsOpen) {
  //       this.activePaperLink.remove();
  //       this.activePaperLink = null;
  //     }
  //     if (this.activePaperElement != null && !this.areAnyWindowsOpen) {
  //       this.activePaperElement.remove();
  //       this.activePaperElement = null;
  //     }
  //   }
  // }

  private getElementCollapsedState(element: joint.dia.Element): boolean {
    return element.get('collapsed') || false;
  }

  public addActionListeners(): void {
    // tslint:disable-next-line:typedef
    const onElementOrLinkMouseOut = (view: joint.dia.CellView): void => {
      this.paper.hideTools();
      this.activePaperElement = view.model;

      view.removeTools();
      this.paper.hideTools();
      if (view instanceof joint.dia.ElementView) {
        const currentState: boolean = this.getElementCollapsedState(view.model);
        view.addTools(this.elementToolsViewOnClick);
        if (this.collapseExpandButton) {
          this.collapseExpandButton.updateButtonState(currentState);
        } else {
          // tslint:disable-next-line:max-line-length
          this.collapseExpandButton = new CollapseExpandButton(this.toggleBranch.bind(this), currentState);
          this.elementToolsViewOnClick = new joint.dia.ToolsView({
            tools: [new joint.elementTools.Boundary(), this.collapseExpandButton]
          });
        }
      }
      view.showTools();
    };

    this.paper.on('element:mouseout', (elementView: any) =>
      onElementOrLinkMouseOut(elementView));

    this.paper.on('blank:pointerclick', () => {
      this.paper.hideTools();
      this.activePaperLink = null;
      this.activePaperElement = null;
      this.selectedElements.clear();
      this.updateSelectionVisuals();
      this.clearTemporarySelectionVisuals();
    });

    this.paper.on('blank:pointermove', (event: JQuery.Event, x: number, y: number) => {
      if (this.interactionMode === 'select') {
        this.paper.hideTools();
        if (!this.selectionStart || !this.selectionBox) { return; }

        const width: number = x - this.selectionStart.x;
        const height: number = y - this.selectionStart.y;
        this.selectionBox.resize(Math.abs(width), Math.abs(height));
        this.selectionBox.position(
          width > 0 ? this.selectionStart.x : x,
          height > 0 ? this.selectionStart.y : y
        );
      }
    });

    this.paper.on('blank:pointerdown', (event: JQuery.Event, x: number, y: number) => {
      if (this.compileOptionsVisible) {
        this.toggleCompileOptions();
      }
      switch (this.interactionMode) {
        case 'select':
          this.setupSelectionBox(x, y);
          break;
        case 'move':
          // Logic for 'move' mode
          this.activePaperLink = null;
          this.activePaperElement = null;
          this.dragStartPosition = { x, y };
          break;
      }
    });

    this.paper.on('element:pointerdown', (elementView, evt, x, y) => {
      if (this.selectedElements.has(elementView.model.id)) {
        this.selectionInitialPos.clear();
        this.selectedElements.forEach(id => {
          const element: any = this.diagramGraph.getCell(id);
          if (element) {
            const elementPos: any = element.position();
            const deltaPoint: joint.g.Point = new joint.g.Point(x - elementPos.x, y - elementPos.y);
            this.selectionInitialPos.set(id, deltaPoint);
          }
        });
      }
    });

    this.paper.on('element:pointermove', (elementView, evt, x, y) => {
      this.diagramStateService.addToHistoryWithTimeout(this.diagramGraph);
      if (this.selectedElements.has(elementView.model.id)) {
        this.selectedElements.forEach(id => {
          const element: any = this.diagramGraph.getCell(id);
          if (element) {
            const initialDelta: joint.g.Point = this.selectionInitialPos.get(id);
            if (initialDelta) {
              element.position(x - initialDelta.x, y - initialDelta.y);
            }
          }
        });
      }
    });

    this.paper.on('element:pointerup', () => {
      if (this.interactionMode === 'move') {
        this.selectionInitialPos.clear();
      }
    });

    this.paper.on('blank:pointerup', () => {
      switch (this.interactionMode) {
        case 'select':
          if (!this.selectionStart || !this.selectionBox) { return; }
          this.selectedElements.clear();
          const bbox: joint.g.Rect = this.selectionBox.getBBox();
          this.diagramGraph.getElements().forEach(element => {
            if (bbox.containsPoint(element.getBBox().origin()) &&
              bbox.containsPoint(element.getBBox().topRight()) &&
              bbox.containsPoint(element.getBBox().bottomLeft()) &&
              bbox.containsPoint(element.getBBox().bottomRight())) {
              // Element is inside the selection box, add to selected elements
              this.selectedElements.add(element.id);
            }
          });
          this.selectionBox.remove();
          this.selectionBox = null;
          this.selectionStart = null;
          this.updateSelectionVisuals();
          this.clearTemporarySelectionVisuals();
          break;
        case 'move':
          delete this.dragStartPosition;
      }
    });

    this.paper.on('link:mouseover', (linkView: joint.dia.LinkView) => {
      const customData: any = linkView.model.attributes.customData;
      if (customData) {
        this.customHoverData = {
          conditions: customData.conditions && customData.conditions.length > 0 ?
                      customData.conditions : null,
          totalInstantiations: customData.totalInstantiations > 0 ?
                               customData.totalInstantiations : null,
          successInstantiations: customData.successInstantiations > 0 ?
                                 customData.successInstantiations : null,
          failedInstantiations: customData.failedInstantiations > 0 ?
                                customData.failedInstantiations : null,
          undefinedInstantiations: customData.undefinedInstantiations > 0 ?
                                   customData.undefinedInstantiations : null
        };
        const tooltip: HTMLElement = document.getElementById('link-hover-tooltip');
        if (tooltip) {
          tooltip.style.display = 'block';
        }
      }
    });

    this.paper.on('link:mouseout', () => {
      const tooltip: HTMLElement = document.getElementById('link-hover-tooltip');
      if (tooltip) {
        tooltip.style.display = 'none';
        this.customHoverData = null;
      }
    });

    this.paper.on('link:mousemove', (linkView: joint.dia.LinkView, evt: MouseEvent) => {
      const tooltip: HTMLElement = document.getElementById('link-hover-tooltip');
      if (tooltip) {
        tooltip.style.left = `${evt.clientX + 15}px`;
        tooltip.style.top = `${evt.clientY + 15}px`;
      }
    });

    this.paper.on('blank:mousewheel', (event) => {
      this.onMouseWheel(event);
    });

    // Add listeners for 'add', 'change', and 'remove' events on the diagramGraph if needed
    this.diagramGraph.on('add', (cell: any) => {
      // Handle add event
    });

    this.diagramGraph.on('change', (cell: any) => {
      // Handle change event
    });

    this.diagramGraph.on('remove', (cell: any) => {
      this.diagramStateService.saveDiagramWithTimeout(this.diagramGraph);
    });
  }

  private toggleBranch(root: joint.dia.Element): void {
    const shouldHide: boolean = !root.get('collapsed');
    root.set('collapsed', shouldHide);
    this.recursivelyToggleVisibility(root, root, shouldHide);
  }

  // tslint:disable-next-line:max-line-length
  private recursivelyToggleVisibility(element: joint.dia.Element, root: joint.dia.Element, shouldHide: boolean): void {
    const directSuccessors: joint.dia.Element[] = this.getDirectSuccessors(element);

    // Recursively handle visibility for direct successors
    directSuccessors.forEach((successor: joint.dia.Element) => {
      this.recursivelyToggleVisibility(successor, root, shouldHide);
    });

    const isRoot: boolean = element.id === root.id;
    // After handling all successors, determine if this element should be hidden or shown
    if ((shouldHide || this.shouldElementBeHidden(element)) && !isRoot) {
      this.setVisibility(element, false); // Hide the element
    } else {
      this.setVisibility(element, true); // Show the element
    }

    // Process links for the current element
    // tslint:disable-next-line:max-line-length
    const outboundLinks: joint.dia.Link[] = this.diagramGraph.getConnectedLinks(element, { outbound: true });
    outboundLinks.forEach((link: joint.dia.Link) => {
      const targetId: number = link.get('target').id;
      const targetElement: any = this.diagramGraph.getCell(targetId);

      // Hide or show link depending on whether the target element is being hidden or shown
      this.setLinkVisibility(link, !shouldHide && !targetElement.get('hidden'));
    });
  }

  private shouldElementBeHidden(element: joint.dia.Element): boolean {
    // tslint:disable-next-line:max-line-length
    const inboundLinks: joint.dia.Link[] = this.diagramGraph.getConnectedLinks(element, { inbound: true });
    // Check if all inbound links are from hidden elements
    return inboundLinks.every(link => {
      const sourceId: number = link.get('source').id;
      const sourceElement: any = this.diagramGraph.getCell(sourceId);
      return sourceElement.get('hidden');
    });
  }

  private getDirectSuccessors(element: joint.dia.Element): joint.dia.Element[] {
    // tslint:disable-next-line:max-line-length
    const outboundLinks: joint.dia.Link[] = this.diagramGraph.getConnectedLinks(element, { outbound: true });
    return outboundLinks.map(link => {
      const targetId: number = link.get('target').id;
      return this.diagramGraph.getCell(targetId) as joint.dia.Element;
    }).filter(e => e && e.isElement());
  }

  private setVisibility(element: joint.dia.Cell, visible: boolean): void {
    // tslint:disable-next-line:max-line-length
    const outboundLinks: joint.dia.Link[] = this.diagramGraph.getConnectedLinks(element, { inbound: true });
    let visibleOutboundLinksCount: number = 0;
    outboundLinks.forEach((link: joint.dia.Link) => {
      const isVisible: boolean = this.isLinkVisible(link);
      if (isVisible) {
        visibleOutboundLinksCount++;
      }
    });
    if (visibleOutboundLinksCount <= 1) {
      const elementView: any = this.paper.findViewByModel(element);
      if (elementView) {
        elementView.el.style.display = visible ? '' : 'none';
      }
      if (element.isElement()) {
        this.toggleLinksVisibility(element as joint.dia.Element, visible);
      }
    }
  }

  private isLinkVisible(link: joint.dia.Link): boolean {
    // Access the view for the link from the paper
    const linkView: any = this.paper.findViewByModel(link);
    return linkView && linkView.el.style.display !== 'none';
  }

  private toggleLinksVisibility(element: joint.dia.Element, visible: boolean): void {
    // tslint:disable-next-line:max-line-length
    const outboundLinks: joint.dia.Link[] = this.diagramGraph.getConnectedLinks(element, { outbound: true });
    outboundLinks.forEach((link: joint.dia.Link) => {
      const isVisible: boolean = this.areLinkedElementsVisible(link);
      this.setLinkVisibility(link, isVisible && visible);
    });
  }

  private areLinkedElementsVisible(link: joint.dia.Link): boolean {
    const sourceElement: joint.dia.Cell = this.diagramGraph.getCell(link.get('source').id);
    const targetElement: joint.dia.Cell = this.diagramGraph.getCell(link.get('target').id);
    return !sourceElement.get('hidden') && !targetElement.get('hidden');
  }

  private setLinkVisibility(link: joint.dia.Link, visible: boolean): void {
    const linkView: any = this.paper.findViewByModel(link);
    if (linkView) {
      linkView.el.style.display = visible ? '' : 'none';
    }
  }

  private onMouseWheel(event: any): void {
    event.preventDefault();
    const delta: number = event.originalEvent.deltaY;
    // Zoom in or out based on the scroll direction
    if (delta < 0) {
      this.zoomIn();
    } else if (delta > 0) {
      this.zoomOut();
    }
  }

  public zoomIn(): void {
    if (this.zoomLevel < 2) { // Maximum zoom level constraint
      this.zoomLevel += 0.05;
      this.paper.scale(this.zoomLevel, this.zoomLevel);
    }
  }

  public zoomOut(): void {
    if (this.zoomLevel > 0.2) { // Minimum zoom level constraint
      this.zoomLevel -= 0.05;
      this.paper.scale(this.zoomLevel, this.zoomLevel);
    }
  }

  public canRemoveElements(): boolean {
    return !!(this.selectedElements.size || this.activePaperElement || this.activePaperLink);
  }

  public removeElements(): void {
    if (this.selectedElements.size) {
      this.selectedElements.forEach(id => {
        const element: any = this.diagramGraph.getCell(id);
        if (element) {
          const connectedLinks: any = this.diagramGraph.getConnectedLinks(element);
          connectedLinks.forEach(link => {
            link.remove();
          });
          element.remove();
        }
      });
      this.selectedElements.clear();
    } else if (this.activePaperElement) {
      const connectedLinks: any = this.diagramGraph.getConnectedLinks(this.activePaperElement);
      connectedLinks.forEach(link => {
        link.remove();
      });
      this.activePaperElement.remove();
      this.activePaperElement = null;
    }
  }

  public clearGraph(): void {
    this.diagramGraph.clear();
  }

  public canRefreshGraph(): boolean {
    return !!this.rootFile;
  }

  public async refreshGraph(): Promise<void> {
    if (this.canRefreshGraph()) {
      this.isLoading = true; // Show the loader
      try {
        const files: FileTreeNode[] = this.getHierarchicalData();
        const allFiles: FileTreeNode[] = this.fileService.extractFiles(files[0]);
        // tslint:disable-next-line:max-line-length
        this.moduleNodesMap = await this.systemVerilogParserService.getModulesFromRootFile(this.rootFile, allFiles, this.compileDefiniteUnsuccessfulInstances, this.compileIndefiniteInstances);
        this.clearGraph();
        // tslint:disable-next-line:max-line-length
        this.moduleHierarchyService.createDiagram(this.moduleNodesMap, this.rootFile, this.diagramGraph);
        this.diagramStateService.saveDiagramToLocalStorage(this.diagramGraph);
        this.diagramStateService.addToHistory(this.diagramGraph);
      } finally {
        this.isLoading = false;
      }
    }
  }

  public allowHistory(): boolean {
    return this.moduleNodesMap != null && this.moduleNodesMap.size < 30;
  }

  public canUndo(): boolean {
    // tslint:disable-next-line:max-line-length
    return this.moduleNodesMap != null && this.moduleNodesMap.size < 30 && this.diagramStateService.currentHistoryIndex > 0;
  }

  public canRedo(): boolean {
    // tslint:disable-next-line:max-line-length
    return this.moduleNodesMap != null && this.moduleNodesMap.size < 30 && this.diagramStateService.currentHistoryIndex < this.diagramStateService.history.length - 1;
  }

  public undo(): void {
    if (this.canUndo()) {
      this.diagramStateService.undo(this.diagramGraph);
    }
  }

  public redo(): void {
    if (this.canRedo()) {
      this.diagramStateService.redo(this.diagramGraph);
    }
  }

  public toggleCompileOptions(): void {
    this.compileOptionsVisible = !this.compileOptionsVisible;
  }

  public onCompileDefiniteUnsuccessfulInstancesChange(event: any): void {
    this.pendingCompileDefiniteUnsuccessfulInstances = event.checked;
    this.debounceRefreshGraph();
  }

  public onCompileIndefiniteInstancesChange(event: any): void {
    this.pendingCompileIndefiniteInstances = event.checked;
    this.debounceRefreshGraph();
  }

  private debounceRefreshGraph(): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(async () => {
      // tslint:disable-next-line:max-line-length
      if (this.pendingCompileDefiniteUnsuccessfulInstances !== this.compileDefiniteUnsuccessfulInstances ||
        this.pendingCompileIndefiniteInstances !== this.compileIndefiniteInstances) {
        // tslint:disable-next-line:max-line-length
        this.compileDefiniteUnsuccessfulInstances = this.pendingCompileDefiniteUnsuccessfulInstances;
        this.compileIndefiniteInstances = this.pendingCompileIndefiniteInstances;
        // tslint:disable-next-line:max-line-length
        this.diagramStateService.saveCheckboxState('compileDefiniteUnsuccessfulInstances', this.compileDefiniteUnsuccessfulInstances);
        // tslint:disable-next-line:max-line-length
        this.diagramStateService.saveCheckboxState('compileIndefiniteInstances', this.compileIndefiniteInstances);
        await this.refreshGraph();
      }
    }, this.debounceDelay);
  }

  public toggleInteractionMode(): void {
    if (this.interactionMode === 'move') {
      this.interactionMode = 'select';
    } else {
      this.interactionMode = 'move';
    }
    this.addActionListeners();
  }

  private setupSelectionBox(x: number, y: number): void {
    this.selectionStart = { x, y };
    this.selectionBox = new joint.shapes.standard.Rectangle();
    this.selectionBox.position(x, y);
    this.selectionBox.resize(1, 1); // Start with a tiny size
    this.selectionBox.attr({
      body: {
        fill: 'none',
        stroke: '#333333',
        'stroke-width': 1,
        'stroke-dasharray': '3,3'
      },
      label: {
        text: '',
        fill: '#333333',
        'font-size': 14,
        'text-anchor': 'middle',
        'ref-x': .5,
        'ref-y': .5
      }
    });
    this.selectionBox.addTo(this.diagramGraph);

    const view: any = this.paper.findViewByModel(this.selectionBox);
    if (view) {
      V(view.el).addClass('custom-selection-box');
    }
  }

  private updateSelectionVisuals(): void {
    // Update the visual state of selected elements
    this.paper.findViewsInArea(this.paper.getArea()).forEach(view => {
      if (this.selectedElements.has(view.model.id)) {
        view.highlight();
      } else {
        view.unhighlight();
      }
    });
  }

  private clearTemporarySelectionVisuals(): void {
    const selectionBoxes: HTMLElement[] = this.paper.svg.querySelectorAll('.custom-selection-box');
    selectionBoxes.forEach(box => {
      const parentElement: SVGGElement = box.closest('g');
      if (parentElement) {
        parentElement.remove();
      }
    });
  }

  public getInteractionIcon(): string {
    return this.interactionMode === 'move' ? 'pan_tool' : 'highlight_alt';
  }

  public async selectTopModuleFile(): Promise<void> {
    const files: FileTreeNode[] = this.getHierarchicalData();
    const allFiles: FileTreeNode[] = this.fileService.extractFiles(files[0]);
    // tslint:disable-next-line:typedef
    const response = this.dialog.open(ModalSelectFileComponent, {
      width: '500px',
      data: files,
      panelClass: 'darkmode-dialog'
    });
    // tslint:disable-next-line:typedef
    const selectedData = await response.afterClosed().toPromise();
    if (selectedData !== undefined && selectedData.file !== undefined) {
      this.isLoading = true;
      const startTime: number = performance.now();
      try {
        this.diagramStateService.addToHistory(this.diagramGraph);
        this.rootFile = selectedData.file;
        this.diagramStateService.saveRootFileToLocalStorage(this.rootFile);

        const parseStartTime: number = performance.now(); // Start timing the parsing
        // tslint:disable-next-line:max-line-length
        this.moduleNodesMap = await this.systemVerilogParserService.getModulesFromRootFile(this.rootFile, allFiles, this.compileDefiniteUnsuccessfulInstances, this.compileIndefiniteInstances);
        const parseEndTime: number = performance.now(); // End timing the parsing
        console.log(`Parsing time: ${((parseEndTime - parseStartTime) / 1000).toFixed(5)} seconds`);

        this.clearGraph();

        const diagramStartTime: number = performance.now(); // Start timing the diagram creation
        // tslint:disable-next-line:max-line-length
        this.moduleHierarchyService.createDiagram(this.moduleNodesMap, this.rootFile, this.diagramGraph);
        const diagramEndTime: number = performance.now(); // End timing the diagram creation
        console.log(`Diagram creation time: ${((diagramEndTime - diagramStartTime) / 1000).toFixed(5)} seconds`);

        this.diagramStateService.saveDiagramToLocalStorage(this.diagramGraph);
        this.diagramStateService.addToHistory(this.diagramGraph);
      } finally {
        const endTime: number = performance.now();
        console.log(`Total function execution time: ${((endTime - startTime) / 1000).toFixed(5)} seconds`);
        this.isLoading = false;
      }
    }
  }

  public getHierarchicalData(): FileTreeNode[] {
    const paths: string[] = this.repoMetadataDoc.data.files[this._myGit].concat(
      this.repoMetadataDoc.data.emptyFolders[this._myGit]
    );
    return this.fileService.convertToHierarchy(paths);
  }

  public updateLanguage(language: string): void {
    if (this.activeEmptyCell !== null) {
      this.activeEmptyCell.prop('codeToBeGenerated', language);
    }
  }

  public onDownloadSvg(): void {
    this.downloadService.saveSvg(this.paper.svg);
  }

  public toggleGrid(): void {
    const currentGrid: boolean = this.paper.options.drawGrid;
    this.paper.options.drawGrid = !currentGrid;

    if (this.paper.options.drawGrid) {
      this.paper.drawGrid({
        name: 'dot',
        args: [{ color: '#e4e4e4', thickness: 1 }]
      });
    } else {
      this.paper.clearGrid();
    }
  }
}
