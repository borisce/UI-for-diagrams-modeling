/*
odskúšať pridávanie portov, ošetriť/zakázať pridávanie portov s rovnakým názvom v rámci modulu
odsadenie pri pridani noveho elementu
presunut lable portov
pomenovanie konektorov/linku
zlepšit spojenie s portami uplne prepojenie a pri zalomení ísť rovno až potom lomiť
out/in rodičovske porty pomenovať  a otočiť out
rozdeliť pridavanie rodičovských portov do 2 buttonov
pridať ikony k hlavným tlačítkam
vektory/štrukutry hrubšie linky
duplikovač signal pri kliknutí na linku
ponechať šírku bit signalu, ale zvýšiť radius listeneru
pridať zoomovanie scrollovanie (lupa,ruka) (ako mod) - nízšia priorita
označiť pri prechode/hovery myšou: doubleclick editácia názvu, click and drag/hold duplikovanie signalu, del - delete signalu
klávesová skratka na zrezanie/skew vektoru napríklad ctrl + click
grid/mriežka skontrolovať, či sa linky a elementy zarovnávajú v rámci nej
viac od seba mriežku
pridať výpisi do pridávacieho dialogového okna ohľadom toho čo používateľ splnil a čo nie
input output vyriešiť ako bezdrôtové prepojenie logical.in
pridať clone na viacero elementov
zrušiť arrow head na linkách
po generovaní a upravách uložíme diagram. Vytvoríme nové úpravy v zdrojovom kóde. Cheme generovať diagram (použije sa pôvodný serializovaný
  diagram? DO akej miery? Čo môžeme znovupoužiť a čo musíme editovať)
generate problematika
okno pre písanie kódu a importovanie kódu do modulu
*/

import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Module} from '../classes/module';
import {Port} from '../classes/port';
import {Or} from '../classes/or';
import {Nand, Nor, Not, Xnor, Xor} from '../classes/logicGate';
import {Link} from '../classes/link';
import {JointJSModuleElement} from '../classes/JointJSModuleElement';
import {JointJSPortElement} from '../classes/JointJSPortElement';
import {JointJSStandalonePortElement} from '../classes/JointJSStandalonePortElement';
import {JointJSDuplicatorElement} from '../classes/JointJSDuplicatorElement';
import {And} from '../classes/and';
import { AndCustomPorts } from '../classes/andCustomPorts';
import { OrCustomPorts } from '../classes/orCustomPorts';
import { NorCustomPorts } from '../classes/norCustomPorts';
import { NandCustomPorts } from '../classes/nandCustomPorts';
import { XorCustomPorts } from '../classes/xorCustomPorts';
import { XnorCustomPorts } from '../classes/xnorCustomPorts';
import {JointJSLogicOr} from '../classes/JointJSLogicOr';
import {JointJSLogicOrCustomPorts} from '../classes/JointJSLogicOrCustomPorts';
import {JointJSLogicAnd} from '../classes/JointJSLogicAnd';
import {JointJSLogicAndCustomPorts} from '../classes/JointJSLogicAndCustomPorts';
import {JointJSLogicGates} from '../classes/JointJSLogicGates';
import {JointJSLogicNotCustomPorts} from '../classes/JointJsLogicNotCustomPorts';
import {JointJSLogicNorCustomPorts} from '../classes/JointJSLogicNorCustomPorts';
import {JointJSLogicNandCustomPorts} from '../classes/JointJSLogicNandCustomPorts';
import {JointJSLogicXorCustomPorts} from '../classes/JointJSLogicXorCustomPorts';
import {JointJSLogicXnorCustomPorts} from '../classes/JointJSLogicXnorCustomPorts';
import {JointJSMultiplexor} from '../classes/JointJSMultiplexor';
import {JointJSDecoder} from '../classes/JointJSDecoder';
import {JointJSAdder} from '../classes/JointJSAdder';
import {JointJSSubtractor} from '../classes/JointJSSubtractor';
import {JointJSComparator} from '../classes/JointJSComparator';
import {JointJSPaper} from '../classes/JointJSPaper';
import * as _ from 'lodash';
import * as joint from 'jointjs';
import {V} from 'jointjs';
import {ParsedModule} from '../classes/parsedModule';
import {SubdiagramPaperComponent} from '../subdiagram-paper-component/subdiagram-paper-component.component';
import {Duplicator} from '../classes/duplicator';
import {Multiplexor} from '../classes/multiplexor';
import {ParsedDiagram} from '../classes/parsedDiagram';
import {ParsedPackages} from '../classes/parsedPackages';
import {PackageItem} from 'src/app/api/systemverilogparser/models';
import {Decoder} from '../classes/decoder';
import {
  addCellToDiagram,
  changeDiagramCell,
  CollabService,
  getVisualizationPresenceId,
  initializeDiagram,
  removeCellFromDiagram
} from '../../../../core/service/collab.service';
import {VisPresence} from '../../collab/vis-presence';
import {MatRipple} from '@angular/material/core';
import {AuthenticationService} from '../../../../core/service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RepositoryService} from '../../../../core/service/repository.service';
import {ICollaborator} from '../../../../shared/collaborators-list/collaborators-list.component';
import {Adder} from '../classes/adder';
import {Subtractor} from '../classes/subtractor';
import {Comparator} from '../classes/comparator';
import {Register} from '../classes/register';
import {Ram} from '../classes/ram';
import {JointJSRegister} from '../classes/JointJSRegister';
import {JointJSRam} from '../classes/JointJSRam';
import {Encoder} from '../classes/encoder';
import {JointJSEncoder} from '../classes/JointJSEncoder';
import {Logic} from '../diagram-generation/vhdl/models';
import { DiagramGenerationComponent } from '../diagram-generation/diagram-generation.component';
import { VisualizationMenuComponent } from '../visualizationMenu/visualizationMenu.component';
import * as dagre from 'dagre';


enum GATETYPES {
  AND = 'and',
  OR = 'or',
  NAND = 'nand',
  NOR = 'nor',
  XOR = 'xor',
  XNOR = 'xnor',
  NOT = 'not',
}

//import dagre from 'dagre';
//import graphlib from 'graphlib';

interface DestPortAndElement {
  port: any;
  element: any;
}

@Component({
  selector: 'app-diagram-paper',
  templateUrl: './diagram-paper.component.html',
  styleUrls: ['./diagram-paper.component.css'],
  providers: [JointJSModuleElement, JointJSPortElement, JointJSStandalonePortElement
    , JointJSDuplicatorElement, JointJSLogicOr, JointJSLogicOrCustomPorts, JointJSLogicAnd, JointJSLogicAndCustomPorts,
     JointJSLogicGates, JointJSLogicNorCustomPorts, JointJSLogicNandCustomPorts, JointJSLogicNotCustomPorts, JointJSLogicXorCustomPorts,
     JointJSLogicXnorCustomPorts, JointJSMultiplexor,
    JointJSPaper, JointJSDecoder, JointJSAdder, JointJSSubtractor, JointJSComparator, JointJSRegister, JointJSRam, JointJSEncoder]
})

export class DiagramPaperComponent implements OnInit, OnDestroy {

  @ViewChild(SubdiagramPaperComponent) public readonly subPaper: SubdiagramPaperComponent;
  @ViewChild(MatRipple) public readonly ripple: MatRipple;
  @ViewChild(DiagramGenerationComponent) public readonly diaGenComponent: DiagramGenerationComponent;
  @ViewChild(VisualizationMenuComponent) public readonly visualMenuComponent: VisualizationMenuComponent;
  public activeBoard: string = 'default';
  public paper: joint.dia.Paper;
  public textCheckNewPort = true;
  public name = '';
  public bandwidth = '';
  public activePaperElement = null;
  public toolsView;
  public availablePackages: ParsedPackages = {};
  public packageDefines: PackageItem[] = [];
  public presence: any;
  public localPresence: any;
  public initializationDone: boolean = false;
  public heldCellId: any;
  public collaborators: Map<string, ICollaborator> = new Map<string, ICollaborator>();
  public dragStartPosition;
  public zoomLevel = 1;
  public propName = '';
  public propPorts = [];
  public propType = '';
  public propBandwidthLabel = '';
  public propBandwidth = '';
  public svgContainer = [];
  public svg;
  public svgRect;
  public svgBBox;
  public svgVertical;
  public svgHorizontal;
  public svgAxisX;
  public svgAxisY;
  public usedPackages: string [] = []
  private userPresences: Map<string, string> = new Map<string, string>();
  private diagramGraph: joint.dia.Graph;
  private visualizationsDoc: any;
  private suppressOutgoing: boolean;
  private repo: any;
  /**
   * Map of elements locked by other users:
   * KEY: graph cell ID
   * VALUE: name of user locking that element
   * @private
   */
  private lockedElements: Map<string, { username: string, displayName: string }> =
    new Map<string, { username: string; displayName: string }>();
  /**
   * Map of presences having locked elements
   * KEY: presence ID
   * VALUE: graph cell ID
   * @private
   */
  private elementLocks: Map<string, string> = new Map<string, string>();

  constructor(private jointJSModuleEl: JointJSModuleElement,
              private jointJSPortEl: JointJSPortElement,
              private jointJSStandalonePortEl: JointJSStandalonePortElement,
              private jointJSDuplicatorEl: JointJSDuplicatorElement,
              private jointJSOr: JointJSLogicOr,
              private jointJSOrCustomPorts: JointJSLogicOrCustomPorts,
              private jointJSAnd: JointJSLogicAnd,
              private jointJSAndCustomPorts: JointJSLogicAndCustomPorts,
              private jointJSNandCustomPorts: JointJSLogicNandCustomPorts,
              private jointJSNotCustomPorts: JointJSLogicNotCustomPorts,
              private jointJSNorCustomPorts: JointJSLogicNorCustomPorts,
              private jointJSXorCustomPorts: JointJSLogicXorCustomPorts,
              private jointJSXnorCustomPorts: JointJSLogicXnorCustomPorts,
              private jointJSLogicGate: JointJSLogicGates,
              private jointJSPaper: JointJSPaper,
              private jointJSMultiplexor: JointJSMultiplexor,
              private jointJSDecoder: JointJSDecoder,
              private jointJSEncoder: JointJSEncoder,
              private jointJSAdder: JointJSAdder,
              private jointJSSubtractor: JointJSSubtractor,
              private jointJSComparator: JointJSComparator,
              private jointJSRegister: JointJSRegister,
              private jointJSRam: JointJSRam,
              private collabService: CollabService,
              private snackBar: MatSnackBar,
              private authService: AuthenticationService,
              private repoService: RepositoryService,
              private visualizationMenuComponent: VisualizationMenuComponent
  ) {
    const namespace = joint.shapes;
    this.diagramGraph = new joint.dia.Graph({}, {cellNamespace: namespace});

    this.repo = this.repoService.currentRepo;
    this.setupCollaboration();
    this.setupPresence();


    const oldDiagram: HTMLElement = document.getElementById('diagramPaper');
    if (oldDiagram) {
      oldDiagram.remove();
    }


    const embed = document.getElementById('diagram-paper-content');
    const diagramPaper: HTMLDivElement = document.createElement('div');
    diagramPaper.setAttribute('id', 'diagramPaper');
    diagramPaper.style.margin = 'auto';
    diagramPaper.style.cssFloat = 'left';
    diagramPaper.style.borderStyle = 'solid';
    diagramPaper.style.borderWidth = '3px';
    diagramPaper.style.overflow = 'auto';
    embed.appendChild(diagramPaper);
    const width: string = '87%';
    const height: number = 900;

    this.paper =
      jointJSPaper.createPaper(diagramPaper, this.diagramGraph, width, height, namespace);

    this.paper.setInteractivity((cellView) => {
      return !this.lockedElements.has(cellView.model.id);
    });

    const segmentsTool: joint.linkTools.Segments = new joint.linkTools.Segments();
    const boundaryTool: joint.linkTools.Boundary = new joint.linkTools.Boundary();
    const sourceAnchorTool: joint.linkTools.SourceAnchor = new joint.linkTools.SourceAnchor();
    const removeButton: joint.linkTools.Remove = new joint.linkTools.Remove({action: function(evt, linkView: any) {
      
      var sourceElement = linkView.sourceView.model;
      var targetElement = linkView.targetView.model;
    
      var sourcePortId = linkView.model.get('source').port;
      var targetPortId = linkView.model.get('target').port;
      
      var sourcePort = sourceElement.getPort(sourcePortId);
      var targetPort = targetElement.getPort(targetPortId);


      if(targetElement.attributes.elType != 'standalonePort'){
        if(targetPort.group == "sel" || (targetElement.attributes.elType == "ram" && targetPort.group == "clk") || (targetElement.attributes.elType == "register" && targetPort.group == "rst")){
          targetElement.portProp(targetPort.id, 'attrs/portBody/d', 'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5')
          var yEnd = targetPort?.args?.y
          if(isNaN(yEnd) || yEnd.isUndefined){
            var portGroup = targetPort.group
            yEnd = sourceElement.attributes.ports.groups[portGroup].position.args.end.y-30
          }
          else{
            yEnd = yEnd-30
          }
          targetElement.portProp(targetPort.id, 'args/y', yEnd)
          if (targetElement.attributes.elType == "register" && targetPort.group == "rst"){
            var labelY = targetElement.portProp(targetPort.id, 'attrs/text/y') 
            targetElement.portProp(targetPort.id, 'attrs/text/y', labelY+30)
          }
        }
        else{
          if (targetElement.attributes.elType == "register" && (targetPort.group == "in" || targetPort.group == "enable" || targetPort.group == "clk")){
            var labelX = targetElement.portProp(targetPort.id, 'attrs/text/x') 
            targetElement.portProp(targetPort.id, 'attrs/text/x', labelX+30)
          }
          
          if (targetElement.attributes.elType == "module" && targetPort.group == "in"){
            var labelX = targetElement.portProp(targetPort.id, 'attrs/text/x') 
            targetElement.portProp(targetPort.id, 'attrs/text/x', labelX+30)
          }
          
          targetElement.portProp(targetPort.id, 'attrs/portBody/d', 'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5')
          var xEndTarget = targetPort.args.x
          if(isNaN(xEndTarget)){
            xEndTarget = 0
          }
          targetElement.portProp(targetPort.id, 'args/x', xEndTarget-30)
        }
        
        
        
        
      }
      if(sourceElement.attributes.elType != 'standalonePort'){
        if (sourceElement.attributes.elType == "module" && sourcePort.group == "out"){
          var labelX = sourceElement.portProp(sourcePort.id, 'attrs/text/x') 
          sourceElement.portProp(sourcePort.id, 'attrs/text/x', labelX-25)
        }
        if (sourceElement.attributes.elType == "register" && sourcePort.group == "out"){
            var labelX = sourceElement.portProp(sourcePort.id, 'attrs/text/x')
            if(labelX == undefined){
              labelX = 0
            } 
            sourceElement.portProp(sourcePort.id, 'attrs/text/x', labelX-25)
        }
        
        sourceElement.portProp(sourcePort.id, 'attrs/portBody/d', 'M -5,-5 L 5,-5 10,0 5,5 -5,5 -5,0 -25,0 M -5,0 -5,-5')
        var xEndSource = sourcePort?.args?.x
        if(xEndSource == undefined){
        xEndSource = 0
        }
        sourceElement.portProp(sourcePort.id, 'args/x', xEndSource+25)
      }
      this.model.remove({ ui: true, tool: this.cid });
    }});

    this.toolsView = new joint.dia.ToolsView({
      tools: [segmentsTool, boundaryTool, sourceAnchorTool, removeButton]
    });

    this.svg = V(this.paper.svg);
    this.svgVertical = V('path').attr('d', 'M -10000 -1 L 10000 -1');
    this.svgHorizontal = V('path').attr('d', 'M -1 -10000 L -1 10000');
    this.svgRect = V('rect');
    this.svgAxisX = this.svgVertical.clone().addClass('axis');
    this.svgAxisY = this.svgHorizontal.clone().addClass('axis');
    this.svgBBox = this.svgRect.clone().addClass('bbox');


    this.svg.append([this.svgAxisX, this.svgAxisY, this.svgBBox]);
  }

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    if (this.dragStartPosition)
      this.paper.translate(e.offsetX - this.dragStartPosition.x, e.offsetY - this.dragStartPosition.y);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    /* if(($event.ctrlKey || $event.metaKey) && $event.keyCode == 65) {
      this.paper.findViewsInArea(this.paper.getArea()).forEach(cell => {
        cell.highlight();

      });

      this.diagramGraph.on('change:position', (cell, x, y) => {

        //this.diagramGraph.translate(x, y)
        //this.paper.translate(x, y);
      })




        $event.preventDefault();
    } */

  }

  public changeActiveBoard(boardId: string): void {
    this.localPresence.destroy();
    this.localPresence = undefined;
    this.initializationDone = false;
    this.activeBoard = boardId;
    this.diagramGraph.clear();
    this.lockedElements = new Map<string, { username: string; displayName: string }>();
    this.elementLocks = new Map<string, string>();
    this.loadDiagramToGraph(this.visualizationsDoc.data[this.branch][this.activeBoard].diagram);
    this.initializationDone = true;
    this.setupPresence();
  }

  public removePresenceLabel = (cellView: joint.dia.CellView) => {
    const labels: NodeListOf<Element> = cellView.$el[0]
      .querySelectorAll('.collab-presence-label');
    if (labels.length !== 0) {
      labels.forEach(value => value.remove());
    }
  };

  public addCustomEventListeners(): void {
    const modal: HTMLElement = document.getElementById('modalNewPort');

    this.paper.on('element:contextmenu', (elementView, evt, x, y) => {
      const contextMenu: HTMLElement = document.getElementById('contextMenu');
      const addPort: HTMLElement = document.getElementById('add-port-menu-option');
      const menuOffset: number = 0;

      this.activePaperElement = elementView.model;
      contextMenu.style.left = (x + menuOffset).toString() + 'px';
      contextMenu.style.top = (y).toString() + 'px';
      contextMenu.style.display = 'block';
      if(elementView.model.attributes.elType == "module"){
        addPort.style.display="inline-block"
      }
      else{
        addPort.style.display="none"
      }
    });

    this.paper.on('link:connect', function(linkView:any, evt, elementView, ) {
      var sourceElement = linkView.sourceView.model;
      var targetElement = linkView.targetView.model;
      
      var sourcePortId = linkView.model.get('source').port;
      var targetPortId = linkView.model.get('target').port;
    
    
      var sourcePort = sourceElement.getPort(sourcePortId);
      var targetPort = targetElement.getPort(targetPortId);

      if(targetElement.attributes.elType != 'standalonePort'){
        if(targetPort.group == "sel" || (targetElement.attributes.elType == "ram" && targetPort.group == "clk") || (targetElement.attributes.elType == "register" && targetPort.group == "rst")){
          if (targetElement.attributes.elType == "register" && targetPort.group == "rst"){
            var labelY = targetElement.portProp(targetPort.id, 'attrs/text/x')
            if(labelY == undefined || labelY == null){
              labelY = 0
            } 
            targetElement.portProp(targetPort.id, 'attrs/text/x', labelY+30)
          }
          var yEnd = targetPort?.args?.y
          if(isNaN(yEnd) || yEnd.isUndefined){
            var portGroup = targetPort.group
            if(targetElement.attributes.elType == "ram" || targetElement.attributes.elType == "register"){
              yEnd = targetElement.attributes.ports.groups[portGroup].position.args.end.y+30  
            }
            else{
              yEnd = targetElement.attributes.ports.groups[portGroup].position.args.end.y+17
            }
            
          }
          else{
            yEnd = yEnd +30
          }
          targetElement.portProp(targetPort.id, 'args/y', yEnd)
          targetElement.portProp(targetPort.id, 'attrs/portBody/d', '')

        }
        else{
          if (targetElement.attributes.elType == "module" && targetPort.group == "in"){
            var labelX = targetElement.portProp(targetPort.id, 'attrs/text/x') 
            targetElement.portProp(targetPort.id, 'attrs/text/x', labelX-30)
          }
          if (targetElement.attributes.elType == "register" && (targetPort.group == "in" || targetPort.group == "enable" || targetPort.group == "clk")){
            var labelX = targetElement.portProp(targetPort.id, 'attrs/text/x')
            if(labelX == undefined){
              labelX = 0
            } 
            targetElement.portProp(targetPort.id, 'attrs/text/x', labelX-30)
          }
          var xEnd = targetPort?.args?.x
          if(isNaN(xEnd) || xEnd.isUndefined){
            var portGroup = targetPort.group
            xEnd = targetElement.attributes.ports.groups[portGroup].position.args.start.x
          }
          targetElement.portProp(targetPort.id, 'args/x', xEnd+30)
          targetElement.portProp(targetPort.id, 'attrs/portBody/d', '')
          
        }
        
      }
      if(sourceElement.attributes.elType != 'standalonePort'){
        if (sourceElement.attributes.elType == "module" && sourcePort.group == "out"){
          var labelX = sourceElement.portProp(sourcePort.id, 'attrs/text/x') 
          sourceElement.portProp(sourcePort.id, 'attrs/text/x', labelX+25)
        }
        if (sourceElement.attributes.elType == "register" && sourcePort.group == "out"){
            var labelX = sourceElement.portProp(sourcePort.id, 'attrs/text/x')
            if(labelX == undefined){
              labelX = 0
            } 
            sourceElement.portProp(sourcePort.id, 'attrs/text/x', labelX+25)
          }
        var xEnd = sourcePort?.args?.x
        if(isNaN(xEnd) || xEnd.isUndefined){
          var portGroup = sourcePort.group
          xEnd = sourceElement.attributes.ports.groups[portGroup].position.args.start.x
        }
        sourceElement.portProp(sourcePort.id, 'args/x', xEnd-25)
        sourceElement.portProp(sourcePort.id, 'attrs/portBody/d', '')
      }
    
    });

    this.paper.on('blank:pointerclick', (event, x, y) => {
      this.submitPresence({
        position: {
          x,
          y
        }
      });
      const contextMenu: HTMLElement = document.getElementById('contextMenu');
      contextMenu.style.display = 'none';
    });


    window.onclick = event => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    this.paper.on('link:pointerclick', (cellView, event, x, y) => {
      const oldSource = cellView.model.attributes.source;
      let sourcePort;
      let sourceElement;
      this.diagramGraph.getElements().forEach(element => {
        if (element.getPort(oldSource.port)) {
          sourceElement = element;
          sourcePort = element.getPort(oldSource.port);
        } else if (element.getPort(oldSource.selector)) {
          sourceElement = element;
          sourcePort = element.getPort(oldSource.selector);
        }
      });
      if (event.ctrlKey) {
        const duplicatorClass: Duplicator = {
          id: null,
          position: {
            x,
            y
          },
          bandwidth: sourcePort.bandwidth,
          duplicatedPort: sourcePort.id,
          struct: sourcePort.struct,
          wasDuplicatedStandalone: sourcePort.standalone
        };
        const duplicator = this.jointJSDuplicatorEl.createDuplicatorElement(duplicatorClass);
        const sourceLink = new joint.shapes.standard.Link();
        duplicator.addTo(this.diagramGraph);
        sourceLink.source(sourceElement, {
          selector: oldSource.port,
          anchor: {
            name: 'right',
            args: {
              dy: -12.5,
              dx: -10
            }
          }
        });
        sourceLink.target(duplicator);
        sourceLink.addTo(this.diagramGraph);
        cellView.model.source(duplicator);
      }
    });

    this.paper.on('link:pointerup', (cellView) => {
      const elements = document.getElementsByClassName('port-body') as HTMLCollectionOf<HTMLElement>;
      const orInputs = document.getElementsByClassName('input') as HTMLCollectionOf<HTMLElement>;
      const orOutputs = document.getElementsByClassName('output') as HTMLCollectionOf<HTMLElement>;
      for (let index = 0; index < document.getElementsByClassName('port-body').length; index++) {
        elements[index].style.fill = 'white';
      }
      for (let index = 0; index < document.getElementsByClassName('input').length; index++) {
        if(orInputs[index].style.fill != 'black'){
          orInputs[index].style.fill = 'white';
        }
        
      }
      for (let index = 0; index < document.getElementsByClassName('output').length; index++) {
        orOutputs[index].style.fill = 'white';
      }

      if (cellView.model.attributes.target.x && cellView.model.attributes.target.y) {
        cellView.model.remove();
      }
    });

    this.paper.on('blank:pointerdown', (event, x, y) => {
      this.dragStartPosition = {x: x, y: y};
    });

    this.paper.on('cell:pointerup blank:pointerup', (cellView, x, y) => {
      delete this.dragStartPosition;
    });

    // TODO - mouse event

    // this.paper.on("blank:mousewheel", (evt, x, y, delta) => {
    //   const oldscale = this.paper.scale().sx;
    //   const newscale = oldscale + 0.2 * delta * oldscale

    //   if (newscale>0.2 && newscale<5) {
    //     this.paper.scale(newscale, newscale, 0, 0);
    //     this.paper.translate(-x*newscale+evt.offsetX,-y*newscale+evt.offsetY);
    //   }
    // });

    this.paper.on('link:mouseenter', (linkView) => {

      linkView.removeTools();
      linkView.addTools(this.toolsView);
      linkView.showTools();
    });

    /*this.paper.on('link:pointerdown', (linkView) => {
      const points = linkView.metrics.data.match(/[+-]?\d+(?:\.\d+)?/g).map(Number);
      const newVertices: joint.g.Point[] = [];
      for (let index = 2; index < points.length - 2; index += 2) {
        const vertice = new joint.g.Point(points[index], points[index + 1]);
        newVertices.push(vertice);
      }
      linkView.model.vertices(
        newVertices
      );
    });*/

    this.paper.on('link:mouseleave', (linkView) => {
      linkView.hideTools();
    });

    this.diagramGraph.on('change:position', (element) => {
      const renderedLinks = this.diagramGraph.getLinks();
      for (const link of renderedLinks) {
        if (link.getSourceElement() === element || link.getTargetElement() === element) {
          link.vertices([]);
        }
      }

      /* var bbox = this.paper.getContentBBox();
      this.svgBBox.attr(bbox).addClass('active'); */

    });

    this.diagramGraph.on('add', (cell) => {
      if (!this.suppressOutgoing && this.initializationDone) {
        addCellToDiagram(this.visualizationsDoc, cell.attributes, this.branch, this.activeBoard,
          () => {
            this.suppressOutgoing = false;
          });
      } else {
        this.suppressOutgoing = false;
      }
    });

    this.diagramGraph.on('change', (event) => {
      if (!this.suppressOutgoing && this.initializationDone) {
        changeDiagramCell(this.visualizationsDoc, event, this.branch, this.activeBoard, () => {
          this.suppressOutgoing = false;
        });
      } else {
        this.suppressOutgoing = false;
      }
    });

    this.diagramGraph.on('remove', (event) => {
      if (!this.suppressOutgoing && this.initializationDone) {
        removeCellFromDiagram(this.visualizationsDoc, event.id, this.branch, this.activeBoard,
          () => {
            this.suppressOutgoing = false;
          });
      } else {
        this.suppressOutgoing = false;
      }
    });

    this.paper.on('cell:pointerdown', (cell) => {
      this.heldCellId = cell.model.id;
      if (!this.lockedElements.has((cell.model.id).toString())) {
        this.submitPresence(undefined, undefined, cell.model.id);

        // Get all links connected to the clicked element
        const links = this.diagramGraph.getConnectedLinks(cell.model, { inbound: true, outbound: true });

        // Adjust start and end directions for each link
        links.forEach((link) => {
            const router = link.get('router');
            if (router) {
                // Adjust start directions if needed
                router.args.startDirections = ['right'];

                // Adjust end directions if needed
                router.args.endDirections = ['left'];

                // Update the link with the modified router
                link.set('router', router);
            }
        });

        // Trigger a refresh of the links on the paper
        this.paper.trigger('link:options');
      }
    });

    this.paper.on('cell:pointerup', (cell) => {
      this.heldCellId = undefined;
      this.submitPresence(undefined, undefined, undefined, cell.model.id);
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
  }

  public ngOnDestroy(): void {
    this.localPresence.destroy();
    this.presence.destroy();
    this.visualizationsDoc.destroy();
    let diagramPaper: HTMLElement = document.getElementById('diagramPaper');
    while (diagramPaper) {
      diagramPaper.remove();
      diagramPaper = document.getElementById('diagramPaper');
      const diagramMenus: any =
        document.getElementsByClassName('jqx-menu-popup');
      for (const diagramMenu of diagramMenus) {
        diagramMenu.remove();
      }
    }
  }

  public ngOnInit(): void {
    this.addCustomEventListeners();
    this.scrollingAndZoomingEvents();
  }

  public scrollingAndZoomingEvents(){
    this.paper.on('blank:mousewheel', (evt, x, y, delta) => {
      if (evt.ctrlKey) {
        evt.preventDefault();
    
        const oldscale = this.paper.scale().sx;
        const newscale = oldscale + 0.2 * delta * oldscale;
    
        if (newscale > 0.2 && newscale < 5) {
          this.paper.scale(newscale, newscale, 0, 0);
          this.paper.translate(-x * newscale + evt.offsetX, -y * newscale + evt.offsetY);
        }
      }
      else if (evt.shiftKey) {
        evt.preventDefault();

        const translateX = this.paper.translate().tx;
        const translateY = this.paper.translate().ty;
        //this.paper.translate(0, translateY - (translateY - y));
        let j = 20 * delta * -1;
        //for(let i = 0; i < 5; i++){
          this.paper.translate(translateX + j,translateY);
          //j+=10;
        //}
      }
      else {
        evt.preventDefault();
        // Scroll vertically without scaling
        const translateX = this.paper.translate().tx;
        const translateY = this.paper.translate().ty;
        //this.paper.translate(0, translateY - (translateY - y));
        let j = 20 * delta;
        //for(let i = 0; i < 5; i++){
          this.paper.translate(translateX, translateY + j);
          //j+=10;
        //}
      }
});
  }


  public zoomIn() {
    this.zoomLevel = Math.min(3, this.zoomLevel + 0.2);
    var size = this.paper.getComputedSize();
    this.paper.translate(0, 0);
    this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
  }

  public zoomOut() {
    this.zoomLevel = Math.max(0.2, this.zoomLevel - 0.2);
    var size = this.paper.getComputedSize();
    this.paper.translate(0, 0);
    this.paper.scale(this.zoomLevel, this.zoomLevel, size.width / 2, size.height / 2);
  }

  public clearGraph() {
    this.diagramGraph.clear();
    this.usedPackages = []
  }

  public checkPortUniqueness(pName: string) {
    let isPortUnique = true;
    this.activePaperElement.getPorts().forEach(port => {
      if (port.id === pName) {
        isPortUnique = false;
      }
    });
    return isPortUnique;
  }

  public addNewModule(module: Module, addingFromParsedCode: boolean) {
    const newModule = this.jointJSModuleEl.createModuleElement(module, addingFromParsedCode);
    newModule.addTo(this.diagramGraph);
  }

  public onModalWindowCancelClicked() {
    const modal2 = document.getElementById('modalNewPort');
    modal2.style.display = 'none';
  }

  public addNewPort(port: Port) {
    const standAlonePort = this.jointJSStandalonePortEl.createStandalonePort(port);
    const innerPort = this.jointJSPortEl.createNewPort(port);
    standAlonePort.addPort(innerPort);
    standAlonePort.addTo(this.diagramGraph);
  }

  public async onAddPortToModuleClicked(e) {
    await this.visualizationMenuComponent.onAddPortToModuleClicked(e)
  }

  public onRemoveModuleClicked(e) {
  
    const allLinks = this.paper.model.getLinks();

    const linkViews = []
    const linksToRemove = allLinks.filter(link => {
      return link.getSourceElement().id === this.activePaperElement.id || 
               link.getTargetElement().id === this.activePaperElement.id;
    });

    linksToRemove.forEach(link =>{
      const linkView = this.paper.findViewByModel(link); 
      linkViews.push(linkView) 
    })

    linkViews.forEach(linkView => {
      var sourceElement = linkView.sourceView.model;
      var targetElement = linkView.targetView.model;
    
      var sourcePortId = linkView.model.get('source').port;
      var targetPortId = linkView.model.get('target').port;
      
      var sourcePort = sourceElement.getPort(sourcePortId);
      var targetPort = targetElement.getPort(targetPortId);


      if(targetElement.attributes.elType != 'standalonePort'){
        if(targetPort.group == "sel" || (targetElement.attributes.elType == "ram" && targetPort.group == "clk") || (targetElement.attributes.elType == "register" && targetPort.group == "rst")){
          targetElement.portProp(targetPort.id, 'attrs/portBody/d', 'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5')
          var yEnd = targetPort?.args?.y
          if(isNaN(yEnd) || yEnd.isUndefined){
            var portGroup = targetPort.group
            yEnd = sourceElement.attributes.ports.groups[portGroup].position.args.end.y-30
          }
          else{
            yEnd = yEnd-30
          }
          targetElement.portProp(targetPort.id, 'args/y', yEnd)
          
        }
        else{
          if (targetElement.attributes.elType == "module" && targetPort.group == "in"){
            var labelX = targetElement.portProp(targetPort.id, 'attrs/text/x') 
            targetElement.portProp(targetPort.id, 'attrs/text/x', labelX+30)
          }

          if (targetElement.attributes.elType == "register" && (targetPort.group == "in" || targetPort.group == "enable" || targetPort.group == "clk")){
            var labelX = targetElement.portProp(targetPort.id, 'attrs/text/x') 
            targetElement.portProp(targetPort.id, 'attrs/text/x', labelX+30)
          }
          
          targetElement.portProp(targetPort.id, 'attrs/portBody/d', 'M -5,-5 L 5,-5 10,0 30,0 M 10,0 5,5 -5,5 -5,-5')
          var xEndTarget = targetPort.args.x
          if(isNaN(xEndTarget)){
            xEndTarget = 0
          }
          targetElement.portProp(targetPort.id, 'args/x', xEndTarget-30)
        }
        
        
        
        
      }
      if(sourceElement.attributes.elType != 'standalonePort'){
        if (sourceElement.attributes.elType == "module" && sourcePort.group == "out"){
          var labelX = sourceElement.portProp(sourcePort.id, 'attrs/text/x') 
          sourceElement.portProp(sourcePort.id, 'attrs/text/x', labelX-25)
        }

        if (sourceElement.attributes.elType == "register" && sourcePort.group == "out"){
          var labelX = sourceElement.portProp(sourcePort.id, 'attrs/text/x')
          if(labelX == undefined){
            labelX = 0
          } 
          sourceElement.portProp(sourcePort.id, 'attrs/text/x', labelX-25)
      }
        
        sourceElement.portProp(sourcePort.id, 'attrs/portBody/d', 'M -5,-5 L 5,-5 10,0 5,5 -5,5 -5,0 -25,0 M -5,0 -5,-5')
        var xEndSource = sourcePort?.args?.x
        if(xEndSource == undefined){
        xEndSource = 0
        }
        sourceElement.portProp(sourcePort.id, 'args/x', xEndSource+25)
      }
      linkView.remove()
    });

    this.activePaperElement.remove();
    this.activePaperElement = null;
    const menuItem = document.getElementById('contextMenu');
    menuItem.style.display = 'none';
  }

  public onShowPropertiesClicked(e) {
    const menuItem = document.getElementById('contextMenu');
    menuItem.style.display = 'none';
    this.propName = this.activePaperElement.attributes.elType === 'standalonePort' ? this.activePaperElement.attributes.attrs.text.text : this.activePaperElement.attributes.name;
    this.propPorts = this.activePaperElement.attributes.ports ? this.activePaperElement.attributes.ports.items : [];
    this.propType = this.activePaperElement.attributes.elType;
    if(this.propType.startsWith("Custom")){
      this.propType = this.propType.slice(6)
    }
    if((this.activePaperElement.attributes.elType == 'standalonePort'&& this.activePaperElement.attributes.struct != null)){
      this.propBandwidth = this.activePaperElement.attributes.struct;  
      this.propBandwidthLabel = "Datatype:"
    }
    else{
      this.propBandwidthLabel = "Width:"
      this.propBandwidth = this.activePaperElement.attributes.bandwidth;
    }
    
    const modal = document.getElementById('modalShowProperties');
    modal.style.display = 'block';
  }

  public onPropModalCancelClicked() {
    const modal = document.getElementById('modalShowProperties');
    modal.style.display = 'none';
  }

  public addPortToModule(pName: string, portDirection: string, pBandwidth: number, callType: string, pStruct: string) {
    document.getElementById('modalNewPort').style.display = 'none';
    let inputPortCount = 0, outputPortCount = 0;
    let bit = true;
    let bandwidth = 1;
    let struct = null;
    if (callType === 'guiCall' && (document.getElementById('panelInnerPVectorRadio') as HTMLInputElement).checked) {
      
      bit = false;
      bandwidth = pBandwidth;
    } else if (callType === 'loadDiagram' && pBandwidth > 1) {
      bit = false;
      bandwidth = pBandwidth;                                      
    } else if (callType === 'guiCall' && (document.getElementById('panelInnerPStructRadio') as HTMLInputElement).checked) {
      bit = false;
      bandwidth = null;
      struct = pStruct;
    } else if (callType === 'loadDiagram' && pBandwidth === null) {
      bit = false;
      bandwidth = null;
      struct = pStruct;
    }
    const portClass: Port = {
      parentElementId: null,
      parentElementPosition: null,
      id: this.activePaperElement.attributes.instance + '_' + pName,
      name: pName,
      direction: portDirection,
      bandwidth,
      standalone: false,
      bit,
      struct
    };

    this.activePaperElement.getPorts().forEach(port => {
      if (port.group === 'in') {
        inputPortCount += 1;
      } else {
        outputPortCount += 1;
      }
    });

    if (this.activePaperElement.getPorts().length !== 0
      && ((inputPortCount >= 3 && portDirection === 'in')|| (outputPortCount >= 3 && portDirection === 'out'))) {
      const storedHeight = this.activePaperElement.attributes.size.height,
      storedWidth = this.activePaperElement.attributes.size.width;
      var newHeight = storedHeight;
      const portsGroups = this.activePaperElement.attributes.ports.groups;
      if(portDirection == 'in'){
        if(portsGroups['in'].position.args.end.y < (inputPortCount + 1) * 40){
          portsGroups['in'].position.args.end.y += 40;
          if(storedHeight <= portsGroups['in'].position.args.end.y){
            newHeight = storedHeight + 40;  
          }
          this.activePaperElement.prop('ports/groups', portsGroups); 
        } 
      }
      if(portDirection == 'out'){
        if(portsGroups['out'].position.args.end.y < (outputPortCount + 1) * 40){
          portsGroups['out'].position.args.end.y += 40;
          if(storedHeight <= portsGroups['out'].position.args.end.y){
            newHeight = storedHeight + 40;  
          }
          this.activePaperElement.prop('ports/groups', portsGroups); 
        }
      }
      this.activePaperElement.set('size', {width: storedWidth, height: newHeight});
      if (portDirection === 'in') {
        this.activePaperElement.addPort(this.jointJSPortEl.createNewPort(portClass));
      } else {
        this.activePaperElement.addPort(this.jointJSPortEl.createNewPort(portClass));
      }
    } else {
      if (portDirection === 'in') {
        this.activePaperElement.addPort(this.jointJSPortEl.createNewPort(portClass));
      } else {
        this.activePaperElement.addPort(this.jointJSPortEl.createNewPort(portClass));
      }
    }
    this.activePaperElement = null;
  }

  public checkInputStateFowNewPort(pName: string, pBandwidth: string) {
    const boolIsNameUnique = this.checkPortUniqueness(pName);
    if (pName !== '' && pBandwidth !== '' && boolIsNameUnique) {
      this.textCheckNewPort = false;
    } else {
      this.textCheckNewPort = true;
    }
  }

  public bitPortChecked() {
    const portBandwidthInputElement = document.getElementById('innerPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('innerPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('innerPStruct');
    const portStructSelectElementLab = document.getElementById('innerPStructLabel');
    const portPackageSelectElement = document.getElementById('innerPPackage');
    const portPackageSelectElementLab = document.getElementById('innerPPackageLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
  }

  public vectorPortChecked() {
    const portBandwidthInputElement = document.getElementById('innerPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('innerPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('innerPStruct');
    const portStructSelectElementLab = document.getElementById('innerPStructLabel');
    const portPackageSelectElement = document.getElementById('innerPPackage');
    const portPackageSelectElementLab = document.getElementById('innerPPackageLabel');
    portBandwidthInputElement.style.display = 'block';
    portBandwidthInputElementLab.style.display = 'block';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
  }

  public customPortChecked() {
    const portBandwidthInputElement = document.getElementById('innerPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('innerPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('innerPStruct');
    const portStructSelectElementLab = document.getElementById('innerPStructLabel');
    const portPackageSelectElement = document.getElementById('innerPPackage');
    const portPackageSelectElementLab = document.getElementById('innerPPackageLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'block';
    portStructSelectElementLab.style.display = 'block';
    portPackageSelectElement.style.display = 'block';
    portPackageSelectElementLab.style.display = 'block';
  }

  public duplicatorMoveChangeTo(booleanValue) {
    if (booleanValue) {
      this.diagramGraph.getElements().forEach(element => {
        if (element.attributes.type === 'standard.Ellipse') {
          element.prop('attrs/body/magnet', 'passive');
        }
      });
    } else {
      this.diagramGraph.getElements().forEach(element => {
        if (element.attributes.type === 'standard.Ellipse') {
          element.prop('attrs/body/magnet', true);
        }
      });
    }
  }

  public addNewOrGate(or: Or) {
    const orGate = this.jointJSOr.createOrGate(or);
    //const found = this.diagramGraph.getElements().find(element => (element.attributes.name === orGate.attributes.name && element.attributes.elType === orGate.attributes.elType) || (element.attributes.elType === orGate.attributes.elType && ))
    const found = this.diagramGraph.getElements().find(element => (element.attributes.name === orGate.attributes.name && element.attributes.elType === orGate.attributes.elType))
    if (!found) orGate.addTo(this.diagramGraph);
  }

  public addNewOrCustomPortsGate(orCustomPorts: OrCustomPorts) {
    const orCustomPortsGate = this.jointJSOrCustomPorts.createOrCustomPortsGate(orCustomPorts);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === orCustomPortsGate.attributes.name && element.attributes.elType === orCustomPortsGate.attributes.elType)
    if (!found) orCustomPortsGate.addTo(this.diagramGraph);
  }

  /*public addNewOrCustomPortsGate2(orCustomPorts: OrCustomPorts2) {
    const orCustomPortsGate = this.jointJSOrCustomPorts2.createOrCustomPortsGate(orCustomPorts);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === orCustomPortsGate.attributes.name && element.attributes.elType === orCustomPortsGate.attributes.elType)
    if (!found) orCustomPortsGate.addTo(this.diagramGraph);
  }*/

  public addNewAndGate(and: And) {
    const andGate = this.jointJSAnd.createAndGate(and);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === andGate.attributes.name && element.attributes.elType === andGate.attributes.elType)
    if (!found) andGate.addTo(this.diagramGraph);
  }

  public addNewAndCustomPortsGate(andCustomPorts: AndCustomPorts) {
    const andCustomPortsGate = this.jointJSAndCustomPorts.createAndCustomPortsGate(andCustomPorts);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === andCustomPortsGate.attributes.name && element.attributes.elType === andCustomPortsGate.attributes.elType)
    if (!found) andCustomPortsGate.addTo(this.diagramGraph);
  }

  public addNewNorGate(nor: Nor) {
    const gate = this.jointJSLogicGate.createNorGate(nor);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === gate.attributes.name && element.attributes.elType === gate.attributes.elType)
    if (!found) gate.addTo(this.diagramGraph);
  }

  public addNewNorCustomPortsGate(norCustomPorts: NorCustomPorts) {
    const norCustomPortsGate = this.jointJSNorCustomPorts.createNorCustomPortsGate(norCustomPorts);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === norCustomPortsGate.attributes.name && element.attributes.elType === norCustomPortsGate.attributes.elType)
    if (!found) norCustomPortsGate.addTo(this.diagramGraph);
  }

  public addNewNandGate(nand: Nand) {
    const gate = this.jointJSLogicGate.createNandGate(nand);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === gate.attributes.name && element.attributes.elType === gate.attributes.elType)
    if (!found) gate.addTo(this.diagramGraph);
  }

  public addNewNandCustomPortsGate(nandCustomPorts: NandCustomPorts) {
    const nandCustomPortsGate = this.jointJSNandCustomPorts.createNandCustomPortsGate(nandCustomPorts);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === nandCustomPortsGate.attributes.name && element.attributes.elType === nandCustomPortsGate.attributes.elType)
    if (!found) nandCustomPortsGate.addTo(this.diagramGraph);
  }

  public addNewXorGate(xor: Xor) {
    const gate = this.jointJSLogicGate.createXorGate(xor);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === gate.attributes.name && element.attributes.elType === gate.attributes.elType)
    if (!found) gate.addTo(this.diagramGraph);
  }

  public addNewXorCustomPortsGate(xorCustomPorts: XorCustomPorts) {
    const xorCustomPortsGate = this.jointJSXorCustomPorts.createXorCustomPortsGate(xorCustomPorts);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === xorCustomPortsGate.attributes.name && element.attributes.elType === xorCustomPortsGate.attributes.elType)
    if (!found) xorCustomPortsGate.addTo(this.diagramGraph);
  }

  public addNewXnorGate(xnor: Xnor) {
    const gate = this.jointJSLogicGate.createXnorGate(xnor);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === gate.attributes.name && element.attributes.elType === gate.attributes.elType)
    if (!found) gate.addTo(this.diagramGraph);
  }

  public addNewXnorCustomPortsGate(xnorCustomPorts: XnorCustomPorts) {
    const xnorCustomPortsGate = this.jointJSXnorCustomPorts.createXnorCustomPortsGate(xnorCustomPorts);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === xnorCustomPortsGate.attributes.name && element.attributes.elType === xnorCustomPortsGate.attributes.elType)
    if (!found) xnorCustomPortsGate.addTo(this.diagramGraph);
  }

  public addNewNotGate(not: Not) {
    const gate = this.jointJSNotCustomPorts.createNotCustomPortsGate(not);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === gate.attributes.name && element.attributes.elType === gate.attributes.elType)
    if (!found) gate.addTo(this.diagramGraph);
  }

  public addNewMultiplexor(multiplexor: Multiplexor) {
    const multiplexorLogic = this.jointJSMultiplexor.createMultiplexor(multiplexor);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === multiplexorLogic.attributes.name && element.attributes.elType === multiplexorLogic.attributes.elType)
    if (!found) multiplexorLogic.addTo(this.diagramGraph);

    multiplexor.selPorts.forEach(port => {
      const selPort = {
        id: multiplexor.name + "_sel",
        group: 'sel',
        bandwidth: multiplexor.selBandwidth.toString(),
        name: multiplexor.name,
        attrs: {
        }  
      };
      multiplexorLogic.addPort(selPort);
    });
    var i = 1 
    multiplexor.dataPorts.forEach(port => {
      const inPort = {
        id: multiplexor.name + "_in" + i,
        group: 'in',
        name: multiplexor.name,
        attrs: {
        }  
      };
      multiplexorLogic.addPort(inPort);
      i++;
    });

    const outPort = {
      id: multiplexor.name + "_out1",
      name: multiplexor.name,
      group: 'out',
      keyIndex: multiplexor.keyIndex,
      bandwidth: multiplexor.dataBandwidth
    };
    multiplexorLogic.addPort(outPort);
  }

  public addNewDecoder(decoder: Decoder) {
    const newDecoder = this.jointJSDecoder.createDecoder(decoder);
    newDecoder.addTo(this.diagramGraph);
    //for (let i = 0; i < decoder.dataBandwidth; i++) {
    const inPort = {
      id: decoder.name + '_in1',// + decoder.dataBandwidth,
      name: decoder.name,
      group: 'in',
      bandwidth: decoder.dataBandwidth.toString(),
      bit: true,
      attrs: {
        /*text: {
          text: decoder.name + '_in'
        }*/
      }
    };
    newDecoder.addPort(inPort);
    //}
    if (decoder.enable) {
      newDecoder.addPort({group: 'enable',attrs: {
        /*text: {
          text: 'enable'
        }*/
      }});
    }
    //if (decoder.outSingle) {
    const outPort = {
      id: decoder.name + "_out1",
      name: decoder.name,
      group: 'out',
      bandwidth: (2 ** decoder.dataBandwidth).toString()
    };
    newDecoder.addPort(outPort);
    /*} else {
      for (let i = 0; i < 2 ** decoder.dataBandwidth; i++) {
        const outPort = {
          id: decoder.name + '_out' + '_' + i,
          name: decoder.name + '_out' + '_' + i,
          group: 'out',
          bandwidth: 1
        };
        newDecoder.addPort({ group: 'out' });
     }*/
    //}
  }

  public addNewEncoder(encoder: Encoder) {
    const newEncoder = this.jointJSEncoder.createEncoder(encoder);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === newEncoder.attributes.name && element.attributes.elType === newEncoder.attributes.elType)
    if (!found) newEncoder.addTo(this.diagramGraph);

    const inPort = {
      id: encoder.name + '_in1',
      name: encoder.name,
      group: 'in',
      bandwidth: encoder.dataBandwidth,
      bit: true,
      /*attrs: {
        text: {
          text: encoder.name + '_' + 'in'
        }
      }*/
    }

    newEncoder.addPort(inPort);

    const outPort = {
      id: encoder.name + '_out1',
      name: encoder.name,
      group: 'out',
      bandwidth: Math.ceil(Math.sqrt(encoder.dataBandwidth)).toString()
    };

    newEncoder.addPort(outPort);
  }

  public addNewAdder(adder: Adder) {
    const newAdder = this.jointJSAdder.createAdder(adder);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === newAdder.attributes.name && element.attributes.elType === newAdder.attributes.elType)
    if (!found) newAdder.addTo(this.diagramGraph);

    /*const outWidth = Number(adder.dataBandwidth) + 1;
    for (let i = 0; i < 2; i++) {
      newAdder.addPort({group: 'in'});
    }
    const outPort = {
      id: adder.name,
      name: adder.name,
      group: 'out',
      bandwidth: outWidth.toString()
    };
    newAdder.addPort(outPort);*/

  }

  public addNewSubtractor(subtractor: Subtractor) {
    const newSubtractor = this.jointJSSubtractor.createSubtractor(subtractor);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === newSubtractor.attributes.name && element.attributes.elType === newSubtractor.attributes.elType)
    if (!found) newSubtractor.addTo(this.diagramGraph);

    /*const outWidth = Number(subtractor.dataBandwidth) + 1;
    for (let i = 0; i < 2; i++) {
      newSubtractor.addPort({group: 'in'});
    }
    const outPort = {
      id: subtractor.name,
      name: subtractor.name,
      group: 'out',
      bandwidth: outWidth.toString()
    };
    newSubtractor.addPort(outPort);*/

  }

  public addNewComparator(comparator: Comparator) {
    const newComparator = this.jointJSComparator.createComparator(comparator);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === newComparator.attributes.name && element.attributes.elType === newComparator.attributes.elType)
    if (!found) newComparator.addTo(this.diagramGraph);

    /*const outWidth = 1;
    for (let i = 0; i < 2; i++) {
      newComparator.addPort({group: 'in'});
    }
    const outPort = {
      id: comparator.name,
      name: comparator.name,
      group: 'out',
      bandwidth: outWidth.toString()
    };
    newComparator.addPort(outPort);*/

  }

  public addNewRegister(register: Register) {
    const newReg = this.jointJSRegister.createRegister(register);
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === newReg.attributes.name && element.attributes.elType === newReg.attributes.elType)
    if (!found) newReg.addTo(this.diagramGraph);

    const inPort = {
      id: register.name + '_in',
      name: register.name,
      group: 'in',
      bandwidth: register.dataBandwidth,
      attrs: {
        text: {
          text: 'D'
        }
      }
    };
    newReg.addPort(inPort);
    const clkPort = {
      id: register.name + '_clk',
      name: register.name,
      group: 'clk',
      bandwidth: 1,
      attrs: {
        text: {
          text: 'CLK'
        }
      }
    };
    newReg.addPort(clkPort);
    if (register.enablePort) {
      const enblPort = {
        id: register.name + '_en',
        name: register.name,
        group: 'enable',
        bandwidth: 1,
        attrs: {
          text: {
            text: 'EN'
          }
        }
      };
      newReg.addPort(enblPort);
    }
    if (register.resetPort) {
      const rstPort = {
        id: register.name + '_rst',
        name: register.name,
        group: 'rst',
        bandwidth: 1,
        attrs: {
        }
      };
      newReg.addPort(rstPort);
    }

    const outPort = {
      id: register.name + '_out1',
      name: register.name,
      group: 'out',
      bandwidth: register.dataBandwidth,
      attrs: {
        text: {
          text: 'Q'
        }
      }
    };
    newReg.addPort(outPort);
  }

  public addNewRam(ram: Ram) {
    const newRam = this.jointJSRam.createRam(ram)
    const found = this.diagramGraph.getElements().find(element => element.attributes.name === newRam.attributes.name && element.attributes.elType === newRam.attributes.elType)
    if (!found) newRam.addTo(this.diagramGraph);

    const inPort = {
      id: ram.name + '_in',
      name: ram.name,
      group: 'in',
      bandwidth: ram.dataBandwidth,
      attrs: {
        /*text: {
          text: register.name + '_in'
        }*/
      }
    };
    newRam.addPort(inPort);
    const clkPort = {
      id: ram.name + '_clk',
      name: ram.name,
      group: 'clk',
      bandwidth: 1,
      attrs: {
        /*text: {
          text: register.name + '_clk'
        }*/
      }
    };
    newRam.addPort(clkPort);

    const addrPort = {
      id: ram.name + '_addr',
      name: ram.name,
      group: 'addr',
      bandwidth: ram.addressBandwidth,
      attrs: {
        /*text: {
          text: register.name + '_rst'
        }*/
      }
    };
    newRam.addPort(addrPort);
      
    const wePort = {
      id: ram.name + '_we',
      name: ram.name,
      group: 'we',
      bandwidth: 1,
      attrs: {
        /*text: {
          text: register.name + '_en'
        }*/
      }    
    };
      newRam.addPort(wePort);

    const outPort = {
      id: ram.name + '_out1',
      name: ram.name,
      group: 'out',
      bandwidth: ram.dataBandwidth,
      attrs: {
        /*text: {
          text: register.name + '_out'
        }*/
      }
    };
    newRam.addPort(outPort);
  }

  public addExistingModule(module: ParsedModule, addingFromParsedCode: boolean, positionX: number, positionY: number) {
    const newModule: Module = new Module({
      id: null,
      name: module.mainModuleName,
      instance: module.mainModuleInstance,
      position: {x:positionX,y:positionY},
    });
    const paperModule = this.jointJSModuleEl.createModuleElement(newModule, addingFromParsedCode);
    paperModule.addTo(this.diagramGraph);
    module.mainPorts.forEach(identifiedPort => {
      let id = identifiedPort.id
      let bandwidth = 1;
      let bit = true;
      let struct = null;
      if (identifiedPort.dataType !== 'logic') {
        struct = identifiedPort.dataType;
        bandwidth = null;
        bit = false;
      } else if (identifiedPort.bandwidth !== 'bit') {
        bandwidth = Number(identifiedPort.bandwidth);
        bit = false;
      }
      if (identifiedPort.direction === 'input') {
        identifiedPort.direction = 'in';
      }
      if (identifiedPort.direction === 'output') {
        identifiedPort.direction = 'out';
      }
      this.activePaperElement = paperModule;
      this.addPortToModule(identifiedPort.name, identifiedPort.direction, bandwidth, 'loadDiagram', struct);
    });

  }

  public addNewLink(link: Link, fromParsing: boolean) {
    var sourceData = link.source;
    //link.source.magnet="portBody"
    //link.target.magnet="portBody"
    
    const jointLink = new joint.shapes.standard.Link({
      id: link.id,
      source: link.source,
      target: link.target,
      attrs: {
        line: {
          targetMarker: {
            'type': 'none'
          }
        }
      }
    });
    if(fromParsing == true){
      var sourceCell = this.diagramGraph.getElements().find(element => element.attributes.id == link.source.id)
      var targetCell = this.diagramGraph.getElements().find(element => element.attributes.id == link.target.id)
      var sourcePort = sourceCell.getPort(link.source.port);
      var targetPort = targetCell.getPort(link.target.port);
      

      if(targetCell.attributes.elType != 'standalonePort'){
        if(targetPort.group == "sel" || (targetCell.attributes.elType == "ram" && targetPort.group == "clk") || (targetCell.attributes.elType == "register" && targetPort.group == "rst")){
          if (targetCell.attributes.elType == "register" && targetPort.group == "rst"){
            var labelY = targetCell.portProp(targetPort.id, 'attrs/text/x')
            if(labelY == undefined || labelY == null){
              labelY = 0
            } 
            targetCell.portProp(targetPort.id, 'attrs/text/x', labelY+30)
          }
          var yEnd = targetPort?.args?.y
          if(isNaN(yEnd) || yEnd.isUndefined){
            var portGroup = targetPort.group
            if(targetCell.attributes.elType == "ram" || targetCell.attributes.elType == "register"){
              const position = targetCell.attributes.ports.groups[portGroup].position as {
                args: { end: { x: number, y: number } }
              }
              yEnd = position.args.end.y+30  
            }
            else{
              const position = targetCell.attributes.ports.groups[portGroup].position as {
                args: { end: { x: number, y: number } }
              }  
              yEnd = position.args.end.y+17
            }
            
          }
          else{
            yEnd = yEnd +30
          }
          targetCell.portProp(targetPort.id, 'args/y', yEnd)
          targetCell.portProp(targetPort.id, 'attrs/portBody/d', '')

        }
        else{
          if (targetCell.attributes.elType == "module" && targetPort.group == "in"){
            var labelX = targetCell.portProp(targetPort.id, 'attrs/text/x') 
            targetCell.portProp(targetPort.id, 'attrs/text/x', labelX-30)
          }
          if (targetCell.attributes.elType == "register" && (targetPort.group == "in" || targetPort.group == "enable" || targetPort.group == "clk")){
            var labelX = targetCell.portProp(targetPort.id, 'attrs/text/x')
            if(labelX == undefined){
              labelX = 0
            } 
            targetCell.portProp(targetPort.id, 'attrs/text/x', labelX-30)
          }
          var xEnd = targetPort?.args?.x
          if(isNaN(xEnd) || xEnd.isUndefined){
            var portGroup = targetPort.group
            const position = targetCell.attributes.ports.groups[portGroup].position as {
              args: {
                  start: {
                      x: number;
                      y: number;}}
            }
            xEnd = position.args.start.x
          }
          targetCell.portProp(targetPort.id, 'args/x', xEnd+30)
          targetCell.portProp(targetPort.id, 'attrs/portBody/d', '')
          
        }
        
      }
      if(sourceCell.attributes.elType != 'standalonePort'){
        if (sourceCell.attributes.elType == "module" && sourcePort.group == "out"){
          var labelX = sourceCell.portProp(sourcePort.id, 'attrs/text/x') 
          sourceCell.portProp(sourcePort.id, 'attrs/text/x', labelX+25)
        }
        if (sourceCell.attributes.elType == "register" && sourcePort.group == "out"){
            var labelX = sourceCell.portProp(sourcePort.id, 'attrs/text/x')
            if(labelX == undefined){
              labelX = 0
            } 
            sourceCell.portProp(sourcePort.id, 'attrs/text/x', labelX+25)
          }
        var xEnd = sourcePort?.args?.x
        if(isNaN(xEnd) || xEnd.isUndefined){
          var portGroup = sourcePort.group
          const position = sourceCell.attributes.ports.groups[portGroup].position as {
            args: {
                start: {
                    x: number;
                    y: number;}}
          }
          xEnd = position.args.start.x
        }
        sourceCell.portProp(sourcePort.id, 'args/x', xEnd-25)
        sourceCell.portProp(sourcePort.id, 'attrs/portBody/d', '')
      }
    }
    

    const found = this.diagramGraph.getLinks().find(l => JSON.stringify(l.attributes.source) === JSON.stringify(link.source) && JSON.stringify(l.attributes.target) === JSON.stringify(link.target))

    if (!found) jointLink.addTo(this.diagramGraph);
  }

  public printState() {
    const AllObjs = this.diagramGraph.getElements();
    const AllConnections = this.diagramGraph.getLinks();
    const paperData = {
      elements: AllObjs,
      links: AllConnections,
      imports: this.usedPackages,
    };
    return paperData;
  }

  public onShowSubDiagramClicked(e) {
    this.subPaper.onShowButton();
    this.activePaperElement = null;
    const menuItem = document.getElementById('contextMenu');
    menuItem.style.display = 'none';
  }

  public getGraph() {
    return JSON.stringify(this.diagramGraph.toJSON());
  }

  public loadDiagramToGraph(data) {
    // FIRST we want to add the elements only
    data.cells.forEach(cell => {
      if (cell.elType === 'module') {
        const identifiedModule: Module = new Module({
          id: cell.id,
          name: cell.name,
          instance: cell.instance,
          position: cell.position
        });
        const paperModule = this.jointJSModuleEl.createModuleElement(identifiedModule,false);
        paperModule.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          let bandwidth = 1;
          let bit = true;
          let struct = null;
          if (port.bandwidth > 1) {
            bandwidth = port.bandwidth;
            bit = false;
          } else if (port.bandwidth === null && port.struct !== null) {
            bandwidth = null;
            bit = false;
            struct = port.struct;
          }
          if (port.group === 'in') {
            port.direction = 'in';
          }
          if (port.group === 'out') {
            port.direction = 'out';
          }
          this.activePaperElement = paperModule;
          this.addPortToModule(port.name, port.direction, bandwidth, 'loadDiagram', struct);
          if(port.args.x == 0 && port.group == 'in'){
            var xEnd = port.args.xEnd
            //this.activePaperElement.portProp(port.id, 'args/x', xEnd+30)
            //this.activePaperElement.portProp(port.id, 'attrs/portBody/d', '')
          }
          
        });
      } else if (cell.elType === 'standalonePort') {
        if (typeof cell.ports.items[0].bandiwdth === 'string') {
          cell.ports.items[0].bandwidth = +cell.ports.items[0].bandwidth;
        }
        let bit = true;
        if (cell.ports.items[0].bandwidth !== 1) {
          bit = false;
        }
        const port: Port = {
          parentElementId: cell.id,
          parentElementPosition: cell.position,
          id: cell.ports.items[0].id,
          name: cell.ports.items[0].name,
          bandwidth: +cell.ports.items[0].bandwidth,
          direction: cell.ports.items[0].group,
          standalone: cell.ports.items[0].standalone,
          bit,
          struct: cell.ports.items[0].struct
        };
        this.addNewPort(port);
      } else if (cell.elType === 'duplicator') {
        const duplicatorClass: Duplicator = {
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          struct: cell.struct,
          duplicatedPort: cell.duplicatedPort,
          wasDuplicatedStandalone: cell.ogStandalone
        };
        const duplicator = this.jointJSDuplicatorEl.createDuplicatorElement(duplicatorClass);
        duplicator.addTo(this.diagramGraph);
      } else if (cell.elType === 'Or') {
        const newOrGate: Or = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth
        };
        this.addNewOrGate(newOrGate);
      } else if (cell.elType === 'And') {
        const newAndGate: And = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth
        };
        this.addNewAndGate(newAndGate);
      } else if (cell.elType === 'Nor') {
        const newNorGate: Nor = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth
        };
        this.addNewNorGate(newNorGate);
      } else if (cell.elType === 'Nand') {
        const newNandGate: Nand = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth
        };
        this.addNewNandGate(newNandGate);
      } else if (cell.elType === 'Xor') {
        const newXorGate: Xor = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth
        };
        this.addNewXorGate(newXorGate);
      } else if (cell.elType === 'Xnor') {
        const newXnorGate: Xnor = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth
        };
        this.addNewXnorGate(newXnorGate);
      }else if (cell.elType === 'CustomOr') {
        const newOrGate: OrCustomPorts = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          inPorts: cell.inPorts,
          addingFromParsedCode: false,
        };
        const CustomLogicOr = this.jointJSOrCustomPorts.createOrCustomPortsGate(newOrGate);
          CustomLogicOr.addTo(this.diagramGraph);
          cell.ports.items.forEach(port => {
            CustomLogicOr.addPort(port);
          });
      }/*else if (cell.elType === 'CustomOr2') {
          const newOrGate: OrCustomPorts2 = {
            name: cell.name,
            id: cell.id,
            position: cell.position,
            bandwidth: cell.bandwidth,
            inPortsAmount: cell.inPortsAmount,
            inPorts: cell.inPorts
          };
          const CustomLogicOr2 = this.jointJSOrCustomPorts2.createOrCustomPortsGate(newOrGate);
          CustomLogicOr2.addTo(this.diagramGraph);
          cell.ports.items.forEach(port => {
            CustomLogicOr2.addPort(port);
          });
      }*/else if (cell.elType === 'CustomAnd') {
        const newAndGate: AndCustomPorts = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          inPorts: cell.inPorts,
          addingFromParsedCode: false,
        };
        const CustomLogicAnd = this.jointJSAndCustomPorts.createAndCustomPortsGate(newAndGate);
        CustomLogicAnd.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          CustomLogicAnd.addPort(port);
        });
      } else if (cell.elType === 'CustomNor') {
        const newNorGate: NorCustomPorts = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          inPorts: cell.inPorts,
          addingFromParsedCode: false,
        };
        const CustomLogicNor = this.jointJSNorCustomPorts.createNorCustomPortsGate(newNorGate);
          CustomLogicNor.addTo(this.diagramGraph);
          cell.ports.items.forEach(port => {
            CustomLogicNor.addPort(port);
          });
      } else if (cell.elType === 'CustomNand') {
        const newNandGate: NandCustomPorts = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          inPorts: cell.inPorts,
          addingFromParsedCode: false,
        };
        const CustomLogicNand = this.jointJSNandCustomPorts.createNandCustomPortsGate(newNandGate);
          CustomLogicNand.addTo(this.diagramGraph);
          cell.ports.items.forEach(port => {
            CustomLogicNand.addPort(port);
          });
      } else if (cell.elType === 'CustomXor') {
        const newXorGate: XorCustomPorts = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          inPorts: cell.inPorts,
          addingFromParsedCode: false,
        };
        const CustomLogicXor = this.jointJSXorCustomPorts.createXorCustomPortsGate(newXorGate);
          CustomLogicXor.addTo(this.diagramGraph);
          cell.ports.items.forEach(port => {
            CustomLogicXor.addPort(port);
          });
      } else if (cell.elType === 'CustomXnor') {
        const newXnorGate: XnorCustomPorts = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          inPorts: cell.inPorts,
          addingFromParsedCode: false,
        };
        const CustomLogicXnor = this.jointJSXnorCustomPorts.createXnorCustomPortsGate(newXnorGate);
          CustomLogicXnor.addTo(this.diagramGraph);
          cell.ports.items.forEach(port => {
            CustomLogicXnor.addPort(port);
          });
      }else if (cell.elType === 'CustomNot') {
        const newNotGate: Not = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth,
          addingFromParsedCode: false,
        };
        const CustomLogicNot = this.jointJSNotCustomPorts.createNotCustomPortsGate(newNotGate);
          CustomLogicNot.addTo(this.diagramGraph);
          cell.ports.items.forEach(port => {
            CustomLogicNot.addPort(port);
          });
      }/*else if (cell.elType === 'Not') {
        const newNotGate: Xnor = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          bandwidth: cell.bandwidth
        };
        this.addNewNotGate(newNotGate);
      }*/ else if (cell.elType === 'multiplexor') {
        const identifiedMultiplexer: Multiplexor = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          selPorts: cell.selPorts,
          struct: cell.struct,
          dataPorts: cell.ports.items.length,
          dataBandwidth: cell.bandwidth,
          selBandwidth: Number(cell.selBandwidth),
          keyIndex: cell.keyIndex
        };
        const multiplexorLogic = this.jointJSMultiplexor.createMultiplexor(identifiedMultiplexer);
        multiplexorLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          multiplexorLogic.addPort(port);
        });
      } else if (cell.elType === 'decoder') {
        const identifiedDecoder: Decoder = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          dataBandwidth: cell.bandwidth,
          outSingle: cell.outSingle,
          enable: cell.enable
        };
        const decoderLogic = this.jointJSDecoder.createDecoder(identifiedDecoder);
        decoderLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          decoderLogic.addPort(port);
        });
      } else if (cell.elType === 'adder') {
        const identifiedAdder: Adder = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          dataBandwidth: cell.bandwidth,
          half: cell.half,
          addingFromParsedCode:false
        };
        const adderLogic = this.jointJSAdder.createAdder(identifiedAdder);
        adderLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          adderLogic.addPort(port);
        });
      } else if (cell.elType === 'subtractor') {
        const identifiedSubtractor: Subtractor = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          dataBandwidth: cell.bandwidth,
          addingFromParsedCode:false
        };
        const subtractorLogic = this.jointJSSubtractor.createSubtractor(identifiedSubtractor);
        subtractorLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          subtractorLogic.addPort(port);
        });
      } else if (cell.elType === 'comparator') {
        const identifiedComparator: Comparator = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          dataBandwidth: cell.bandwidth,
          type: cell.comparatorType,
          addingFromParsedCode:false
        };
        const comparatorLogic = this.jointJSComparator.createComparator(identifiedComparator);
        comparatorLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          comparatorLogic.addPort(port);
        });
      } else if (cell.elType === 'register') {
        const identifiedRegister: Register = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          dataBandwidth: cell.bandwidth,
          struct: cell.struct,
          enablePort: cell.enablePort,
          resetPort: cell.resetPort
        };
        const registerLogic = this.jointJSRegister.createRegister(identifiedRegister);
        registerLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          registerLogic.addPort(port);
        });
      }else if (cell.elType === 'ram') {
        const identifiedRam: Ram = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          addressBandwidth: cell.addressBandwidth,
          dataBandwidth: cell.dataBandwidth,
          isDataStruct: cell.usingDataStruct,
          dataStruct: cell.struct
        };
        const ramLogic = this.jointJSRam.createRam(identifiedRam);
        ramLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          ramLogic.addPort(port);
        });
      } else if (cell.elType === 'encoder') {
        const identifiedEncoder: Encoder = {
          name: cell.name,
          id: cell.id,
          position: cell.position,
          dataBandwidth: cell.bandwidth
        };
        const encoderLogic = this.jointJSEncoder.createEncoder(identifiedEncoder);
        encoderLogic.addTo(this.diagramGraph);
        cell.ports.items.forEach(port => {
          encoderLogic.addPort(port);
        });
      }
    });

    // THEN we want add the connections when there is what to connect
    data.cells.forEach(cell => {
      if (cell.type === 'standard.Link') {
        const link: Link = {
          id: cell.id,
          source: cell.source,
          target: cell.target
        }; 
        this.addNewLink(link,false);
      }
    });

    const allLinks = this.paper.model.getLinks();
    allLinks.forEach(link =>{
      const linkView:any = this.paper.findViewByModel(link); 
      if(linkView.targetView.model.attributes.elType == "module"){
        var targetElement = linkView.targetView.model;
        var targetPortId = linkView.model.get('target').port;
        var targetPort = targetElement.getPort(targetPortId);
        var targetElement = linkView.targetView.model 
        
        targetElement.portProp(targetPort.id, 'attrs/portBody/d', '')
        var labelX = targetElement.portProp(targetPort.id, 'attrs/text/x')
        var xEndTarget = targetPort.args.x
        if(isNaN(xEndTarget)){
          xEndTarget = 0
        }
        targetElement.portProp(targetPort.id, 'args/x', xEndTarget)
        targetElement.portProp(targetPort.id, 'attrs/text/x', labelX-30)
      }
      if(linkView.sourceView.model.attributes.elType == "module"){
        var sourceElement = linkView.sourceView.model;
        var sourcePortId = linkView.model.get('source').port;
        var sourcePort = sourceElement.getPort(sourcePortId);
        var sourceElement = linkView.sourceView.model 
        
        sourceElement.portProp(sourcePort.id, 'attrs/portBody/d', '')
        var labelX = sourceElement.portProp(sourcePort.id, 'attrs/text/x')
        var xEndsource = sourcePort.args.x
        if(isNaN(xEndsource)){
          xEndsource = 0
        }
        sourceElement.portProp(sourcePort.id, 'args/x', xEndsource+180)
        sourceElement.portProp(sourcePort.id, 'attrs/text/x', labelX+25)
      }
      
    })
  }

  public loadSubdiagramFromCode(moduleData: ParsedDiagram) {
    // FIRST WE ADD MODULES
    moduleData.modules.forEach(module => {
      const identifiedModule: Module = new Module({
        id: module.id,
        name: module.name,
        instance: module.instance,
        position: {x: module.x, y: module.y}
      });
      const paperModule = this.jointJSModuleEl.createModuleElement(identifiedModule,false);
      paperModule.addTo(this.diagramGraph);
      module.modulePorts.forEach(port => {
        let bandwidth = 1;
        let bit = true;
        let struct = null;
        if (port.bandwidth !== 'bit' && port.bandwidth !== 'null') {
          bandwidth = +port.bandwidth.charAt(0);
          bit = false;
        } else if (port.bandwidth === 'null' && port.dataType !== 'logic') {
          bandwidth = null;
          bit = false;
          struct = port.dataType;
        }
        if (port.direction === 'input') {
          port.direction = 'in';
        }
        if (port.direction === 'output') {
          port.direction = 'out';
        }
        this.activePaperElement = paperModule;
        this.addPortToModule(port.name, port.direction, bandwidth, 'loadDiagram', struct);
      });
    });
    // NEXT ADD THE PARENTPORTS
    moduleData.mainPorts.forEach(mainPort => {
      let bit = true;
      let bandwidth = null;
      let struct;
      if (mainPort.bandwidth !== 'bit') {
        bit = false;
      }
      if (mainPort.bandwidth !== null && mainPort.bandwidth !== 'bit') {
        bandwidth = +mainPort.bandwidth.charAt(0);
      }
      if (mainPort.dataType === 'logic') {
        struct = null;
      } else {
        struct = mainPort.dataType;
      }
      if (mainPort.direction === 'input') {
        mainPort.direction = 'out';
      }
      if (mainPort.direction === 'output') {
        mainPort.direction = 'in';
      }
      const port: Port = {
        parentElementId: mainPort.id,
        parentElementPosition: {x: mainPort.x, y: mainPort.y},
        id: mainPort.id,
        name: mainPort.name,
        bandwidth,
        direction: mainPort.direction,
        standalone: true,
        bit,
        struct
      };
      this.addNewPort(port);
    });
    // LASTLY TRY TO ADD CONNECTIONS
    moduleData.allConnections.forEach(connection => {
      let sourcePort = null;
      let sourceElement = null;
      const destPort: DestPortAndElement[] = [];
      let sourceStandalone = false;
      const diagramElements = this.diagramGraph.getElements();
      diagramElements.forEach(element => {
        if (element.attributes.elType === 'module' || element.attributes.elType === 'standalonePort') {
          if (element.getPort(connection.from.id)) {
            sourcePort = element.getPort(connection.from.id);
            sourceElement = element;
            if (element.attributes.elType === 'standalonePort') {
              sourceStandalone = true;
            }
          }
          connection.to.forEach(connDestPort => {
            if (element.getPort(connDestPort.id)) {
              destPort.push({port: element.getPort(connDestPort.id), element});
            }
          });
        }
      });
      if (sourcePort !== null && destPort.length > 1) {
        if (connection.to.length >= 2) {
          const xPos = (sourceElement.attributes.position.x + destPort[0].element.attributes.position.x) / 2;
          const yPos = (sourceElement.attributes.position.y + destPort[0].element.attributes.position.y) / 2;
          let bandwidth = null;
          if (connection.bandwidth !== null && connection.bandwidth !== 'null') {
            bandwidth = +connection.bandwidth.charAt(0);
          }
          const duplicatorClass: Duplicator = {
            id: null,
            position: {x: xPos, y: yPos},
            bandwidth,
            struct: connection.from.dataType,
            duplicatedPort: connection.from.id,
            wasDuplicatedStandalone: sourceStandalone
          };
          const duplicator = this.jointJSDuplicatorEl.createDuplicatorElement(duplicatorClass);
          duplicator.addTo(this.diagramGraph);
          const linkFromSource = new joint.shapes.standard.Link();
          linkFromSource.source(sourceElement, {
            selector: sourcePort,
            anchor: {
              name: 'right',
              args: {
                dy: -12.5,
                dx: -10
              }
            }
          });
          linkFromSource.target(duplicator);
          linkFromSource.addTo(this.diagramGraph);
          destPort.forEach(target => {
            const stdLink = new joint.shapes.standard.Link();
            stdLink.source(duplicator);
            stdLink.target({id: target.element.id, port: target.port.id});
            stdLink.addTo(this.diagramGraph);
          });
        }
      } else if (sourcePort !== null && destPort.length === 1) {
        const link: Link = {
          source: {
            id: sourceElement.id,
            port: sourcePort.id,
          },
          target: {
            id: destPort[0].element.id,
            port: destPort[0].port.id
          }
        };
        this.addNewLink(link,false);
      }
    });
  }

  public setPackages(availablePackages: ParsedPackages) {
    this.availablePackages = availablePackages;
    this.packageDefines = availablePackages.items[0].package.dataTypes;
  }

  public onInnerPortSelectChanged(event) {
    this.availablePackages.items.forEach(item => {
      if (item.package.name === event) {
        this.packageDefines = item.package.dataTypes;
      }
    });
  }

  public drawPortsSystemVerilog(parsedPort) {

    const port: Port = {
      parentElementId: parsedPort.id,
      parentElementPosition: {x: parsedPort.parentElementPosition.x, y: parsedPort.parentElementPosition.y},
      id: parsedPort.id,
      name: parsedPort.name,
      bandwidth: parsedPort.bandwidth,
      direction: parsedPort.direction === 'input' ? 'out' : 'in',
      standalone: true,
      bit: parsedPort.bit,
      struct: parsedPort.struct
    };
    this.addNewPort(port);
  }

  public drawSystemVerilogLogicGates(ands,ors,nors,nands,xors,xnors,nots){
    ands.forEach(element => {
      this.addNewAndCustomPortsGate(element)
    });
    ors.forEach(element => {
      this.addNewOrCustomPortsGate(element)
    });
    nors.forEach(element => {
      this.addNewNorCustomPortsGate(element)
    });
    nands.forEach(element => {
      this.addNewNandCustomPortsGate(element)
    });
    xors.forEach(element => {
      this.addNewXorCustomPortsGate(element)
    });
    xnors.forEach(element => {
      this.addNewXnorCustomPortsGate(element)
    });
    nots.forEach(element => {
      this.addNewNotGate(element)
    });
  }

  public drawSystemVerilogDiagram(data) {
    const g = new dagre.graphlib.Graph();

    g.setGraph({
      nodesep: 90,
      ranksep:150,
      rankdir:'LR'
    })

    g.setDefaultEdgeLabel(function() { return {}; });

    for (const inPort of data.inPorts) {
      g.setNode(inPort.name,{width:55,height:20})
    }

    for (const outPort of data.outPorts) {
      g.setNode(outPort.name,{width:55,height:20})
    }

    for (const and of data.ands) {
      g.setNode(and.name,{width:and.inPorts*20,height:and.inPorts*20})
    }

    for (const or of data.ors) {
      g.setNode(or.name,{width:or.inPorts*20,height:or.inPorts*20})
    }

    for (const nand of data.nands) {
      g.setNode(nand.name,{width:nand.inPorts*20,height:nand.inPorts*20})
    }

    for (const nor of data.nors) {
      g.setNode(nor.name,{width:nor.inPorts*20,height:nor.inPorts*20})
    }

    for (const xor of data.xors) {
      g.setNode(xor.name,{width:xor.inPorts*20,height:xor.inPorts*20})
    }

    for (const xnor of data.xnors) {
      g.setNode(xnor.name,{width:xnor.inPorts*20,height:xnor.inPorts*20})
    }

    for (const not of data.nots) {
      g.setNode(not.name,{width:not.inPorts*20,height:not.inPorts*20})
    }

    for (const mux of data.multiplexors) {
      if(mux.selBandwidth == 1){
        g.setNode(mux.name,{width:50,height:100})
      }
      else if(mux.selBandwidth == 2){
        g.setNode(mux.name,{width:80,height:160})
      }
      else{
        g.setNode(mux.name,{width:160,height:320})
      }
    }

    for (const decoder of data.decoders) {
      g.setNode(decoder.name,{width:50,height:100})
    }

    for (const encoder of data.encoders) {
      g.setNode(encoder.name,{width:50,height:100})
    }

    for (const adder of data.adders) {
      g.setNode(adder.name,{width:50,height:100})
    }

    for (const subtractor of data.subtractors) {
      g.setNode(subtractor.name,{width:50,height:100})
    }

    for (const comparator of data.comparators) {
      g.setNode(comparator.name,{width:50,height:100})
    }

    for(const register of data.registers){
      g.setNode(register.name,{width:70,height:140})
    }

    for(const ram of data.rams){
      g.setNode(ram.name,{width:50,height:100})
    }

    for(const module of data.modules){
      var height = 120
      var width = 180
      var inPortsCounter = 0
      var outPortsCounter = 0
      var heightIncrease
      module.mainPorts.forEach(port =>{
        if(port.direction == "in"){
          inPortsCounter++
        }
        else{
          outPortsCounter++
        }
      })

      if(inPortsCounter>outPortsCounter){
        heightIncrease = inPortsCounter
      }
      else{
        heightIncrease = outPortsCounter
      }

      if(heightIncrease >=3){
        heightIncrease-=2
        height = height+40*heightIncrease
      }

      g.setNode(module.mainModuleInstance,{width:180,height:height})
    }

    for(const link of data.links){
      g.setEdge(link.source.id,link.target.id)
    }

    dagre.layout(g);
    var nodes: any [] = []
    
    g.nodes().forEach((node) => {
      
      const pos = g.node(node);
      nodes.push({name:node,pos:g.node(node)})
    });


  for (const inPort of data.inPorts) {
    nodes.forEach(node =>{if(node.name == inPort.name){inPort.parentElementPosition.x = node.pos.x
      inPort.parentElementPosition.y = node.pos.y
    }})
  }

  for (const outPort of data.outPorts) {
    nodes.forEach(node =>{if(node.name == outPort.name){outPort.parentElementPosition.x = node.pos.x
      outPort.parentElementPosition.y = node.pos.y
    }})
  }

  for (const and of data.ands) {
    nodes.forEach(node =>{if(node.name == and.name){and.position.x = node.pos.x
      and.position.y = node.pos.y
    }})
  }

  for (const or of data.ors) {
    nodes.forEach(node =>{if(node.name == or.name){or.position.x = node.pos.x
      or.position.y = node.pos.y
    }})
  }

  for (const nand of data.nands) {
    nodes.forEach(node =>{if(node.name == nand.name){nand.position.x = node.pos.x
      nand.position.y = node.pos.y
    }})
  }

  for (const nor of data.nors) {
    nodes.forEach(node =>{if(node.name == nor.name){nor.position.x = node.pos.x
      nor.position.y = node.pos.y
    }})
  }

  for (const xor of data.xors) {
    nodes.forEach(node =>{if(node.name == xor.name){xor.position.x = node.pos.x
      xor.position.y = node.pos.y
    }})
  }

  for (const xnor of data.xnors) {
    nodes.forEach(node =>{if(node.name == xnor.name){xnor.position.x = node.pos.x
      xnor.position.y = node.pos.y
    }})
  }

  for (const not of data.nots) {
    nodes.forEach(node =>{if(node.name == not.name){not.position.x = node.pos.x
      not.position.y = node.pos.y
    }})
  }

  for (const mux of data.multiplexors) {
    nodes.forEach(node =>{if(node.name == mux.name){mux.position.x = node.pos.x
      mux.position.y = node.pos.y
    }})
  }

  for (const decoder of data.decoders) {
    nodes.forEach(node =>{if(node.name == decoder.name){decoder.position.x = node.pos.x
      decoder.position.y = node.pos.y
    }})
  }

  for (const encoder of data.encoders) {
    nodes.forEach(node =>{if(node.name == encoder.name){encoder.position.x = node.pos.x
      encoder.position.y = node.pos.y
    }})
  }

  for (const adder of data.adders) {
    nodes.forEach(node =>{if(node.name == adder.name){adder.position.x = node.pos.x
      adder.position.y = node.pos.y
    }})
  }

  for (const subtractor of data.subtractors) {
    nodes.forEach(node =>{if(node.name == subtractor.name){subtractor.position.x = node.pos.x
      subtractor.position.y = node.pos.y
    }})
  }

  for (const comparator of data.comparators) {
    nodes.forEach(node =>{if(node.name == comparator.name){comparator.position.x = node.pos.x
      comparator.position.y = node.pos.y
    }})
  }

  for(const register of data.registers){
    nodes.forEach(node =>{if(node.name == register.name){register.position.x = node.pos.x
      register.position.y = node.pos.y
    }})
  }

  for(const ram of data.rams){
    nodes.forEach(node =>{if(node.name == ram.name){ram.position.x = node.pos.x
      ram.position.y = node.pos.y
    }})
  }

  for(const module of data.modules){
    nodes.forEach(node =>{if(node.name == module.mainModuleInstance){
      var height = 120
      var width = 180
      var inPortsCounter = 0
      var outPortsCounter = 0
      var heightIncrease
      module.mainPorts.forEach(port =>{
        if(port.direction == "in"){
          inPortsCounter++
        }
        else{
          outPortsCounter++
        }
      })

      if(inPortsCounter>outPortsCounter){
        heightIncrease = inPortsCounter
      }
      else{
        heightIncrease = outPortsCounter
      }

      if(heightIncrease >=3){
        heightIncrease-=2
        height = height+40*heightIncrease
      }
      module.position
      this.addExistingModule(module, true, node.pos.x,node.pos.y)
    }})
    
  }


    // create input ports
    for (const inPort of data.inPorts) {
      this.drawPortsSystemVerilog(inPort)
    }

    // create output ports
    for (const outPort of data.outPorts) {
      this.drawPortsSystemVerilog(outPort)
    }

    this.drawSystemVerilogLogicGates(data.ands, data.ors, data.nors, data.nands, data.xors, data.xnors, data.nots)

    for (const mux of data.multiplexors) {
      this.addNewMultiplexor(mux)
    }

    for (const decoder of data.decoders) {
      this.addNewDecoder(decoder)
    }

    for (const encoder of data.encoders) {
      this.addNewEncoder(encoder)
    }

    for (const adder of data.adders) {
      this.addNewAdder(adder)
    }

    for (const subtractor of data.subtractors) {
      this.addNewSubtractor(subtractor)
    }

    for (const comparator of data.comparators) {
      this.addNewComparator(comparator)
    }

    for(const register of data.registers){
      this.addNewRegister(register)
    }

    for(const ram of data.rams){
      this.addNewRam(ram)
    }


    for(const link of data.links){
      this.addNewLink(link,true)
    }


  }

  


  public drawVhdlDiagram(data) {
    //console.log(data)
    this.handlePosition(data);

    // first create elements - logic, ..
    for (const element of data.elements) {
      this.drawElement(element);
    }

    // create input ports
    for (const inPort of data.inPorts) {
      this.drawPorts(inPort)
    }

    // create output ports
    for (const outPort of data.outPorts) {
      this.drawPorts(outPort)
    }

    // create connections
    for (const connection of data.connections) {
      this.drawLinks(connection);
    }

  }

  public handlePosition(data) {

    const nodes = [];

    /*for (const e of data.elements) {
      const newE = {id: null, size: {width: null, height: null}, type: null};
      newE.id = e.id;
      newE.size.width = e.size.width;
      newE.size.height = e.size.height;
      newE.type = 'element';

      nodes.push(newE);
    }*/

    for (const e of data.inPorts) {
      const newE = {id: '', size: {width: null, height: null}, type: null};
      newE.id = e.id;
      newE.size.width = 55;
      newE.size.height = 20;
      newE.type = 'inPort';

      nodes.push(newE);
    }

    for (const e of data.outPorts) {
      const newE = {id: '', size: {width: null, height: null}, type: null};
      newE.id = e.id;
      newE.size.width = 55;
      newE.size.height = 20;
      newE.type = 'outPort';

      nodes.push(newE);
    }

    const g = new dagre.graphlib.Graph();
    g.setGraph({
      marginx: 150,
      marginy: 150,
      rankdir: "LR"
    });

    g.setDefaultEdgeLabel(function () {
      return {};
    });
    //console.log(nodes)
    for (let node of nodes) {
      // you need to know dimension of every node
      g.setNode(node.id.toString(), {width: node.size.width, height: node.size.height});
    }

    /*for (let k of data.connections) {
      g.setEdge(k.from.id, k.to.id);
    }*/

    dagre.layout(g);

    // to do zobrat z tohto pre kazdy g.node(id).x a .y a prilepit ich k mojim
    for (let node of nodes) {
      if (node.type === 'element') {
        for (const obj of data.elements) {
          if (obj.id === node.id) {
            obj.position.x = g.node(node.id.toString()).x - 200 / 2;
            obj.position.y = g.node(node.id.toString()).y - 100 / 2;
            break;
          }
        }
      } else if (node.type === 'inPort') {
        for (const obj of data.inPorts) {
          if (obj.id === node.id) {
            obj.position.x = g.node(node.id.toString()).x - 200 / 2;
            obj.position.y = g.node(node.id.toString()).y - 100 / 2;
            break;
          }
        }
      } else if (node.type === 'outPort') {
        for (const obj of data.outPorts) {
          if (obj.id === node.id) {
            obj.position.x = g.node(node.id.toString()).x - 200 / 2;
            obj.position.y = g.node(node.id.toString()).y - 100 / 2;
            break;
          }
        }
      }
    }
  }

  public drawLinks(connection) {
    let sourcePort = '';
    let targetPort = '';

    let doNotAdd = false;

    if (connection.fromType === 'standalonePort_in') {
      sourcePort = connection.from.id;
    } else if (connection.fromType === 'multiplexor') {
      sourcePort = connection.from.name;
    } else if (connection.fromType === 'encoder') {
      sourcePort = connection.from.name + '_out';
    } else if (connection.fromType === 'decoder') {
      sourcePort = connection.from.name;
    } else if (connection.fromType === 'register') {
      sourcePort = connection.from.name + '_out';
    } else if (connection.fromType === 'module') {
      if (connection.toType === 'module') {

        // connection id token between : and * => sourceport
        var mySubString = connection.id?.substring(
          connection.id.indexOf(":") + 1,
          connection.id.lastIndexOf("*")
        );
        const moduleCon = connection.from.moduleConnection.find(c => c.toId === connection.to.instance && c.from === mySubString);

        if (moduleCon)
          sourcePort = connection.from.instance + '_' + moduleCon.from;
      } else {
        //const moduleCon = connection.from.moduleConnection.find(c => c.to === connection.to.name);
        //sourcePort = connection.from.instance + '_' + moduleCon.from;

        const moduleConName = connection.from.moduleConnection.find(c => c.to === connection.to.name);
        const moduleConId = connection.from.moduleConnection.find(c => c.toId === connection.to.id);

        if (moduleConName) {
          sourcePort = connection.from.instance + '_' + moduleConName.from;
        } else {
          sourcePort = connection.from.instance + '_' + moduleConId.from;
        }
      }
    } else {
      sourcePort = 'out1'
    }

    if (connection.toType === 'standalonePort_out') {
      targetPort = connection.to.id;
    } else if (connection.toType === 'multiplexor') {
      let mux = this.diagramGraph.getElements().find(el => el.attributes.elType === 'multiplexor' && el.attributes.id === connection.to.id);

      if (connection.to.selPorts.some(p => p.id === connection.from.id)) {
        let selIds = mux.getPorts().filter(p => p.group === 'sel');
        targetPort = selIds[0].id;
      }
      if (mux) {
        let muxPorts = mux.getPorts().filter(p => p.group === 'in');
        for (const muxPort of muxPorts) {
          const used = this.diagramGraph.getLinks().find(link => link.attributes.target.port === muxPort.id);
          if (typeof used === 'undefined') {
            targetPort = muxPort.id
          }
        }

        if (!targetPort) doNotAdd = true
      }
    } else if (connection.toType === 'encoder') {
      targetPort = connection.to.name + '_in';
    } else if (connection.toType === 'decoder') {
      targetPort = connection.to.name + '_in_' + connection.to.bandwidth;
    } else if (connection.toType === 'register') {
      if (connection.to.clkPorts.some(p => p.id === connection.from.id)) {
        targetPort = connection.to.name + '_clk';
      } else if (connection.to.rstPorts.some(p => p.id === connection.from.id)) {
        targetPort = connection.to.name + '_rst';
      } else if (connection.to.enPorts.some(p => p.id === connection.from.id)) {
        targetPort = connection.to.name + '_en';
      } else {
        targetPort = connection.to.name + '_in';
      }

    } else if (connection.toType === 'module') {
      if (connection.fromType === 'module') {
        //const moduleCon = connection.to.moduleConnection.find(c => c.fromId === connection.from.instance);
        //targetPort = connection.to.instance + '_' + moduleCon.to;

        // connection id token after * => targetport

        var mySubString = connection.id?.substring(connection.id?.indexOf('*') + 1);
        const moduleCon = connection.to.moduleConnection.find(c => c.fromId === connection.from.instance && c.from === mySubString);

        if (moduleCon)
          targetPort = connection.to.instance + '_' + moduleCon.to;

      } else {
        const moduleConName = connection.to.moduleConnection.find(c => c.from === connection.from.name);
        const moduleConId = connection.to.moduleConnection.find(c => c.fromId === connection.from.id);

        if (moduleConName) {
          targetPort = connection.to.instance + '_' + moduleConName.to;
        } else {
          targetPort = connection.to.instance + '_' + moduleConId.to;
        }
      }
    } else {
      // search links and if in1 is already taken for that element, then use in2 //this statment was valid for default gates with only 2 ports
      const used = this.diagramGraph.getLinks().filter(link => link.getTargetElement().id === connection.to.id)
      
     
      if(Object.values(GATETYPES).includes(connection.to.type)){
      }
      if (used.length > 0) {

        if (used.length === connection.to.inPorts.length) {
          doNotAdd = true;
        } else {
          targetPort = 'in' + (used.length + 1) 
        }
      } else {
        targetPort = 'in1'
      }
    }

    const link: Link = {
      source: {
        id: connection.from.id,
        port: sourcePort
      },
      target: {
        id: connection.to.id,
        port: targetPort
      }
    };
    
    if (!doNotAdd){
      this.addNewLink(link,true);
       
      } 
  }

  public drawPorts(inPort) {
    let bandwidth = 1;
    let struct = null;

    if (inPort.datatype !== 'std_logic') {
      // potom zmen bandwidth
      bandwidth = inPort.width;
    }

    const port: Port = {
      parentElementId: inPort.id,
      parentElementPosition: {x: inPort.position.x, y: inPort.position.y},
      id: inPort.id,
      name: inPort.name,
      bandwidth,
      direction: inPort.direction === 'in' ? 'out' : 'in',
      standalone: true,
      bit: inPort.datatype === 'std_logic' ? true : false,
      struct: struct
    };
    this.addNewPort(port);
  }

  public drawElement(element: Logic) {
    if (element.type.toLowerCase() === 'and') {
      const newAndGate: AndCustomPorts = {  //CustomPorts
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        bandwidth: element.bandwidth,
        inPorts: element.inPorts.length,
        addingFromParsedCode: true,
      };
      this.addNewAndCustomPortsGate(newAndGate);
      //this.addNewAndGate(newAndGate);
    } else if (element.type.toLowerCase() === 'or') {
      const newOrGate: OrCustomPorts = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        bandwidth: element.bandwidth,
        inPorts: element.inPorts.length,
        addingFromParsedCode: true,
      };
      this.addNewOrCustomPortsGate(newOrGate);
    } else if (element.type.toLowerCase() === 'nand') {
      const newNandGate: NandCustomPorts = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        bandwidth: element.bandwidth,
        inPorts: element.inPorts.length,
        addingFromParsedCode: true,
      };
      this.addNewNandCustomPortsGate(newNandGate);
    } else if (element.type.toLowerCase() === 'nor') {
      const newNorGate: NorCustomPorts = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        bandwidth: element.bandwidth,
        inPorts: element.inPorts.length,
        addingFromParsedCode: true,
      };
      this.addNewNorCustomPortsGate(newNorGate);
    } else if (element.type.toLowerCase() === 'xor') {
      const newXorGate: XorCustomPorts = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        bandwidth: element.bandwidth,
        inPorts: element.inPorts.length,
        addingFromParsedCode: true,
      };
      this.addNewXorCustomPortsGate(newXorGate);
    } else if (element.type.toLowerCase() === 'xnor') {
      const newXnorGate: XnorCustomPorts = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        bandwidth: element.bandwidth,
        inPorts: element.inPorts.length,
        addingFromParsedCode: true,
      };
      this.addNewXnorCustomPortsGate(newXnorGate);
    } 
    else if (element.type.toLowerCase() === 'not') {
      const newNotGate: Not = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        bandwidth: element.bandwidth,
        //inPorts: element.inPorts.length,
        addingFromParsedCode: true,
      };
      this.addNewNotGate(newNotGate);
    }else if (element.type.toLowerCase() === 'encoder') {
      const newEncoder: Encoder = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        dataBandwidth: element.bandwidth
      };
      this.addNewEncoder(newEncoder);
    } else if (element.type.toLowerCase() === 'decoder') {
      const newDecoder: Decoder = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        dataBandwidth: element.bandwidth,
        enable: false,
        outSingle: true
      };
      this.addNewDecoder(newDecoder);
    } else if (element.type.toLowerCase() === 'multiplexor') {
      this.addCustomMux(element)
    } else if (element.type.toLowerCase() === 'register') {
      const newRegister: Register = {
        name: element.name,
        id: element.id,
        position: {x: element.position.x, y: element.position.y},
        dataBandwidth: element.bandwidth,
        struct: element.struct,
        enablePort: element.enPorts.length > 0 ? true : false,
        resetPort: element.rstPorts.length > 0 ? true : false
      };
      this.addNewRegister(newRegister);
    } else if (element.type.toLowerCase() === 'module') {

      const identifiedModule: Module = new Module({
        id: element.id,
        name: element.name,
        instance: element.instance,
        position: element.position
      });
      const paperModule = this.jointJSModuleEl.createModuleElement(identifiedModule,false);
      paperModule.addTo(this.diagramGraph);

      for (const inPort of element.modulePorts) {
        let bandwidth = 1;
        let bit = true;
        let struct = null;

        if (inPort.width > 1) {
          bandwidth = inPort.width;
          bit = false;
        }

        this.activePaperElement = paperModule;
        this.addPortToModule(inPort.name, inPort.direction, bandwidth, 'loadDiagram', struct);
      }
    }
  }

  addCustomMux(element) {
    let keyIndex = null;
    const selPorts: Port[] = [];
    const dataPorts: Port[] = [];
    const dataPort: Port = {
      parentElementId: null,
      parentElementPosition: null,
      id: null,
      name: null,
      bandwidth: null,
      direction: null,
      standalone: null,
      bit: null,
      struct: null
    };
    const selPort: Port = {
      parentElementId: null,
      parentElementPosition: null,
      id: null,
      name: null,
      bandwidth: null,
      direction: null,
      standalone: null,
      bit: null,
      struct: null
    };

    if (element.selPorts[0].width === 1) {
      selPort.bit = true;
      selPort.bandwidth = 1;
    } else {
      selPort.bit = false;
      selPort.bandwidth = element.selPorts[0].width;
    }

    selPort.direction = 'sel';
    selPort.id = null;
    selPort.standalone = false;
    selPort.parentElementId = null;
    selPorts.push(selPort);

    if (element.inPorts[0].width) {
      dataPort.bit = true;
      dataPort.bandwidth = 1;
      dataPort.struct = null;
    } else {
      dataPort.bit = false;
      dataPort.bandwidth = element.inPorts[0].width;
      dataPort.struct = null;
    }

    dataPort.direction = 'in';
    dataPort.id = null;
    dataPort.standalone = false;
    dataPort.parentElementId = null;

    for (let j = 0; j < element.inPorts.length; j++) {
      dataPorts.push(dataPort);
    }

    const newMultiplexor: Multiplexor = {
      name: element.name,
      id: element.id,
      struct: element.struct,
      position: {x: element.position.x, y: element.position.y},
      selPorts,
      dataPorts,
      dataBandwidth: element.bandwidth,
      selBandwidth: element.selPorts[0].width,
      keyIndex
    };

    this.addNewMultiplexor(newMultiplexor);
  }

  private setupCollaboration(): void {
    this.visualizationsDoc = this.collabService
      .createVisualisations(this.repo.uuid.toString(), undefined, (doc) => {
        doc.subscribe((err) => {
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
                      const cellId: string = this.visualizationsDoc
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

  private setupPresence(): void {
    this.presence = this.collabService
      .getFilePresence(getVisualizationPresenceId(this.repo.uuid, this.branch, this.activeBoard));
    this.presence.subscribe((err) => {
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
                         lockedElementId?: any, unlockedElementId?: any): void {
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
  }
}
