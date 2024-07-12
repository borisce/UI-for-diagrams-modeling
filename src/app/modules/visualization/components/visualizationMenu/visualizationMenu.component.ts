import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ModalDialogWindowsComponent } from '../modal-dialog-windows/modal-dialog-windows.component';
import { DiagramPaperComponent } from '../diagram-paper/diagram-paper.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { CodeGenerationComponent } from '../codeGeneration/codeGeneration';
import { SystemVerilogDiagramGenerationComponent } from '../diagram-generation/systemverilog/SystemVerilogDiagramGeneration';
import { DiagramGenerationComponent } from '../diagram-generation/diagram-generation.component';
import { Module } from '../classes/module';
import { Port } from '../classes/port';
import { And } from '../classes/and';
import { AndCustomPorts } from '../classes/andCustomPorts' 
import { OrCustomPorts } from '../classes/orCustomPorts'
import { NorCustomPorts } from '../classes/norCustomPorts'
import { NandCustomPorts } from '../classes/nandCustomPorts' 
import { XorCustomPorts } from '../classes/xorCustomPorts'
import { XnorCustomPorts } from '../classes/xnorCustomPorts' 
import { Or } from '../classes/or';
import { Nor } from '../classes/logicGate';
import { Nand } from '../classes/logicGate';
import { Xor } from '../classes/logicGate';
import { Xnor } from '../classes/logicGate';
import { Not } from '../classes/logicGate';
import { SourceCode } from '../classes/sourceCode';
// tslint:disable-next-line:max-line-length
import { CodeToDiaExtractService } from '../../../../api/systemverilogparser/services/code-to-dia-extract.service';
import { ParsedModule } from '../classes/parsedModule';
import { Multiplexor } from '../classes/multiplexor';
import { RepoFileReference } from '../classes/repoFileReference';
import { ParsedDiagram } from '../classes/parsedDiagram';
import { jqxMenuComponent } from 'jqwidgets-ng/jqxmenu';
import { ParsedPackages } from '../classes/parsedPackages';
import { ParsedPackage } from '../classes/parsedPackages';
import { Decoder } from '../classes/decoder';
import { CollabService, getFileNameFromDocID } from '../../../../core/service/collab.service';
import { RepositoryService } from '../../../../core/service/repository.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  FileDialogModel,
  ModalFileNameComponent
} from '../../../../modal/modal-file-name/modal-file-name.component';
import { ModalConfirmComponent } from '../../../../modal/modal-confirm/modal-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VhdlCodeGenerationComponent } from '../codeGeneration/vhdlCodeGen';
import { VhdlDiagramGenerationComponent } from '../diagram-generation/vhdl/vhdlDiagramGen';
import { Adder } from '../classes/adder';
import { Subtractor } from '../classes/subtractor';
import { Comparator } from '../classes/comparator';
import { Register } from '../classes/register';
import { Ram} from '../classes/ram';
import { Encoder } from '../classes/encoder';

//for mux custom bandwidth
import { PackageItem } from 'src/app/api/systemverilogparser/models';
import { using } from 'cypress/types/bluebird';
import { element } from 'protractor';



@Component({
  selector: 'app-visualization-menu',
  templateUrl: './visualizationMenu.component.html',
  styleUrls: ['./visualizationMenu.component.css'],
  providers: [CodeGenerationComponent, VhdlCodeGenerationComponent, VhdlDiagramGenerationComponent]
})
export class VisualizationMenuComponent implements OnInit {
  @ViewChild(ModalDialogWindowsComponent) public readonly modalWindow: ModalDialogWindowsComponent;
  @ViewChild(DiagramPaperComponent) public readonly paper: DiagramPaperComponent;
  @ViewChild(TextAreaComponent) public readonly textArea: TextAreaComponent;
  @ViewChild(DiagramGenerationComponent) public readonly diaGenComponent:
    DiagramGenerationComponent;
  //@ViewChild(SystemVerilogDiagramGenerationComponent) public svDiaGenComponent:
    //SystemVerilogDiagramGenerationComponent;  
  @ViewChild('jqxMenu') public jqxMenu: jqxMenuComponent;

  public readonly title: string = 'Add element:';
  public packageInformation: ParsedPackages;
  public availableBoards: { id: string, title: string }[] = [];
  public currentBoard: { id: string; title: string; };
  public boardControl: UntypedFormControl = new UntypedFormControl('default');
  public boardSelection: UntypedFormGroup;
  private visualisationsDoc: any;
  public svDiaGenComponent;
  public textCheckNewModule = true;
  public textCheckNewPort = true;
  public name: string;
  public instance: string;
  public selectedComparatorType: string = '>';
  public bandwidth: string;
  public input: boolean;
  public availableJSONFiles: RepoFileReference[] = [];
  public availablePackageFiles : RepoFileReference [] = []



  //for mux custom bandwitdh
  public availablePackages: ParsedPackages = {};
  public packageDefines: PackageItem[] = [];
  public packageDatatypeSubtypes: string []

  constructor(private codeGen: CodeGenerationComponent,
              private vhdlCodeGeneration: VhdlCodeGenerationComponent,
              private vhdlDiagramGeneration: VhdlDiagramGenerationComponent,
              private codeToDiaService: CodeToDiaExtractService,
              private collabService: CollabService,
              private repoService: RepositoryService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              fb: UntypedFormBuilder) {
    //this.selectedComparatorType = ">"            
    this.boardSelection = fb.group({
      boardControl: this.boardControl
    });

    const repo = this.repoService.currentRepo;
    this.visualisationsDoc = collabService.getVisualisations(repo.uuid.toString());
    this.visualisationsDoc.subscribe((err) => {
      this.updateBoardSelection();
      this.visualisationsDoc.on('op', () => {
        this.updateBoardSelection();
      });
    });
  }

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  public get currentBoardTitle(): string {
    return this.availableBoards.find((board) => {
      return board.id === this.boardControl.value;
    }).title;
  }

  public onBoardSelected($event: any): void {
    this.paper.changeActiveBoard($event);
  }

  public addNewBoard(): void {
    const dialogData: FileDialogModel = {
      title: 'New visualization board',
      message: 'Enter the name of new visualization board',
      showAddedExtension: false,
      name: '',
      path: '',
      validator: () => true
    };
    this.dialog.open(ModalFileNameComponent, {
      data: dialogData
    }).afterClosed().subscribe(value => {
      if (value) {
        this.collabService.addVisualisationBoard(this.visualisationsDoc, value, this.branch);
      }
    });
  }

  public ngOnInit() {
    this.svDiaGenComponent = new SystemVerilogDiagramGenerationComponent();
  }

  public ngAfterViewInit() {
    this.centerItems();
    this.topLevelArrowsOnChange();
    this.loadPackagesFromRepository();
  }

  public centerItems(): void {
    const firstItem = this.jqxMenu.elementRef.nativeElement.firstElementChild.children[0].firstElementChild;
    let width = 0;
    const borderOffset = 2;
    const allLiElements = this.jqxMenu.elementRef.nativeElement.firstElementChild.children[0].children;
    for (let i = 0; i < allLiElements.length; i++) {
      const currentLi = allLiElements[i];
      width += currentLi.offsetWidth + borderOffset;
    }

    const menuWidth = this.jqxMenu.elementRef.nativeElement.firstElementChild.offsetWidth;
    const calculatedOffset = (menuWidth / 2) - (width / 2);
    firstItem.style.margin = '0 0 0 ' + (calculatedOffset).toString() + 'px';
  }

  public onResize(event: any): void {
    this.centerItems();
  }

  public topLevelArrowsOnChange(): void {
    this.jqxMenu.showTopLevelArrows(true);
  }

  public onAddNewModuleClicked() {
    this.modalWindow.displayNewModuleDialogWindow();
  }

  public onAddNewStandAlonePortInClicked() {
    this.modalWindow.displayNewStandalonePortDialogWindowIn();
  }

  public onAddNewStandAlonePortOutClicked() {
    this.modalWindow.displayNewStandalonePortDialogWindowOut();
  }

  public async onAddExistingModuleClicked() {
    const availableFiles = await this.diaGenComponent.loadAvailableSourceFiles('.sv');
    const availableFilesVhd = await this.diaGenComponent.loadAvailableSourceFiles('.vhd');
    const files = availableFiles.concat(availableFilesVhd);
    this.modalWindow.displayExistingModuleDialogWindow(files);
  }

  public onSubmittedNewModule(module: Module) {
    this.paper.addNewModule(module,false);
  }

  public onSubmittedNewPort(port: Port) {
    this.paper.addNewPort(port);
  }

  public onDuplicatorModeChange() {
    this.paper.duplicatorMoveChangeTo(((document.getElementById('duplicatorMoveCheckbox')) as HTMLInputElement).checked);
  }

  public onAddNewOrGateClicked() {
    this.modalWindow.displayNewOrGateDialogWindow();
  }

  public onAddNewOrGateCustomPortsClicked() {
    this.modalWindow.displayNewOrGateCustomPortsDialogWindow();
  }

  /*public onAddNewOrGateCustomPortsClicked2() {
    this.modalWindow.displayNewOrGateCustomPortsDialogWindow2();
  }*/

  public async onAddPortToModuleClicked(e) {
    this.availablePackageFiles = await this.diaGenComponent.loadAvailableSourceFiles('_package.sv');
    const menuItem = document.getElementById('contextMenu');

    menuItem.style.display = 'none';
    
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }
    
    const modal = document.getElementById('NewPortProperties');
    this.name = '';
    this.bandwidth = '';
    this.textCheckNewPort = true;
    modal.style.display = 'block';
  }

  public onAddNewAndGateClicked() {
    this.modalWindow.displayNewAndGateDialogWindow();
  }

  public onAddNewAndGateCustomPortsClicked() {
    this.modalWindow.displayNewAndGateCustomPortsDialogWindow();
  }

  public onAddNewNorGateClicked() {
    this.modalWindow.displayNewNorGateDialogWindow();
  }

  public onAddNewNorGateCustomPortsClicked() {
    this.modalWindow.displayNewNorGateCustomPortsDialogWindow();
  }

  public onAddNewNandGateClicked() {
    this.modalWindow.displayNewNandGateDialogWindow();
  }

  public onAddNewNandGateCustomPortsClicked() {
    this.modalWindow.displayNewNandGateCustomPortsDialogWindow();
  }

  public onAddNewXorGateClicked() {
    this.modalWindow.displayNewXorGateDialogWindow();
  }

  public onAddNewXorGateCustomPortsClicked() {
    this.modalWindow.displayNewXorGateCustomPortsDialogWindow();
  }

  public onAddNewXnorGateClicked() {
    this.modalWindow.displayNewXnorGateDialogWindow();
  }

  public onAddNewXnorGateCustomPortsClicked() {
    this.modalWindow.displayNewXnorGateCustomPortsDialogWindow();
  }

  public onAddNewNotGateClicked() {
    this.modalWindow.displayNewNotGateDialogWindow();
  }

  public onAddNewMultiplexorClicked() {
    this.modalWindow.displayNewMultiplexorDialogWindow();
  }

  public onAddNewDecoderClicked() {
    this.modalWindow.displayNewDecoderDialogWindow();
  }

  public onAddNewEncoderClicked() {
    this.modalWindow.displayNewEncoderDialogWindow();
  }

  public onAddNewAdderClicked() {
    this.modalWindow.displayNewAdderDialogWindow();
  }

  public onAddNewRegisterClicked() {
    this.modalWindow.displayNewRegisterDialogWindow();
  }

  public onSubmittedNewOr(or: Or) {
    this.paper.addNewOrGate(or);
  }

  public onSubmittedNewOrCustomPorts(orCustomPorts: OrCustomPorts) {
    this.paper.addNewOrCustomPortsGate(orCustomPorts);
  }

  /*public onSubmittedNewOrCustomPorts2(orCustomPorts: OrCustomPorts2) {
    this.paper.addNewOrCustomPortsGate2(orCustomPorts);
  }*/

  public onSubmittedNewAnd(and: And) {
    this.paper.addNewAndGate(and);
  }

  public onSubmittedNewAndCustomPorts(andCustomPorts: AndCustomPorts) {
    this.paper.addNewAndCustomPortsGate(andCustomPorts);
  }

  public onSubmittedNewNor(nor: Nor) {
    this.paper.addNewNorGate(nor);
  }

  public onSubmittedNewNorCustomPorts(norCustomPorts: NorCustomPorts) {
    this.paper.addNewNorCustomPortsGate(norCustomPorts);
  }

  public onSubmittedNewNand(nand: Nand) {
    this.paper.addNewNandGate(nand);
  }

  public onSubmittedNewNandCustomPorts(nandCustomPorts: NandCustomPorts) {
    this.paper.addNewNandCustomPortsGate(nandCustomPorts);
  }

  public onSubmittedNewXor(xor: Xor) {
    this.paper.addNewXorGate(xor);
  }

  public onSubmittedNewXorCustomPorts(xorCustomPorts: XorCustomPorts) {
    this.paper.addNewXorCustomPortsGate(xorCustomPorts);
  }

  public onSubmittedNewXnor(xnor: Xnor) {
    this.paper.addNewXnorGate(xnor);
  }

  public onSubmittedNewXnorCustomPorts(xnorCustomPorts: XnorCustomPorts) {
    this.paper.addNewXnorCustomPortsGate(xnorCustomPorts);
  }

  public onSubmittedNewNot(not: Not) {
    this.paper.addNewNotGate(not);
  }

  public onSubmittedNewMultiplexor(multiplexor: Multiplexor) {
    this.paper.addNewMultiplexor(multiplexor);
  }

  public onSubmittedNewDecoder(decoder: Decoder) {
    this.paper.addNewDecoder(decoder);
  }

  public onSubmittedNewEncoder(encoder: Encoder) {
    this.paper.addNewEncoder(encoder);
  }

  public onSubmittedNewAdder(adder: Adder) {
    this.paper.addNewAdder(adder);
  }

  public onSubmittedNewSubtractor(subtractor: Subtractor) {
    this.paper.addNewSubtractor(subtractor);
  }

  public onSubmittedNewComparator(comparator: Comparator) {
    this.paper.addNewComparator(comparator);
  }

  public onSubmittedNewRegister(register: Register) {
    this.paper.addNewRegister(register);
  }

  public onSubmittedNewRam(ram: Ram) {
    this.paper.addNewRam(ram);
  }

  /*public onPrintPaperStateClicked() {
    const data = this.paper.printState();
    const response = this.codeGen.generateSourceCode(data);
    this.textArea.showCode(response);
    //this.modalWindow.displaySaveSystemVerilogSourceFileDialogWindow();
  }*/

  /*public onPrintPaperStateClickedVhdl() {
    const data = this.paper.printState();
    const response =  this.vhdlCodeGeneration.generateVhdlCode(data);
    this.textArea.showCode(response);
    //this.modalWindow.displaySaveVhdlSourceFileDialogWindow();
  }*/

  public onSaveDiagramClicked() {
    this.modalWindow.displaySaveFileDialogWindow();
  }

  public onSaveVhdlCodeClicked() {
    this.modalWindow.displaySaveVhdlSourceFileDialogWindow();
  }

  public onSaveSystemVerilogCodeClicked() {
    this.modalWindow.displaySaveSystemVerilogSourceFileDialogWindow();
  }

  public onSubmittedNewSaveName(newName: string) {
    const data = this.paper.getGraph();
    this.diaGenComponent.saveFile(newName, data);
  }

  public onSubmittedNewVhdlSourceCodeName(newName: string) {
    const paperData = this.paper.printState();
    const generatedCode =  this.vhdlCodeGeneration.generateVhdlCode(paperData,newName.slice(0,-4));
    //this.modalWindow.displaySaveVhdlSourceFileDialogWindow();
    this.diaGenComponent.saveFile(newName, generatedCode);
  }

  public onSubmittedNewSystemVerilogSourceCodeName(newName: string) {
    const paperData = this.paper.printState();
    const generatedCode =  this.codeGen.generateSourceCode(paperData,newName.slice(0,-3));
    //this.modalWindow.displaySaveVhdlSourceFileDialogWindow();
    this.diaGenComponent.saveFile(newName, generatedCode);
  }

  public async onLoadDiagramFromJSONClicked() {
    const availableFiles = await this.diaGenComponent.loadAvailableSourceFiles('.json');
    this.modalWindow.displayLoadDiagramDialogWindow(availableFiles);
  }

  public async onLoadDiagramFromSVClicked() {
    const availableSvFiles = await this.diaGenComponent.loadAvailableSourceFiles('.sv');
    const availableVhdFiles = await this.diaGenComponent.loadAvailableSourceFiles('.vhd');
    const availableFiles = availableSvFiles.concat(availableVhdFiles);
    this.modalWindow.displayLoadDiagramDialogWindow(availableFiles);
  }

  public async onSubmittedExistingModule(module: Module) {
    const fileRef: RepoFileReference = {
      name: module.docId || module.name,
      length: null,
      parentModuleInstance: module.instance
    };
    const code = await this.diaGenComponent.getFileBody(fileRef);
    const sourceCode: SourceCode = {
      body: {
        sourceCode: code
      }
    };
    this.onSubmittedExistingModuleCode(sourceCode, module);
  }

  public onSubmittedExistingModuleCode(sourceCode: SourceCode, module: Module) {
    var parsedModule: ParsedModule= {
      mainModuleName: "",
      mainModuleInstance: module.instance,
      mainPorts: [{
          bandwidth: "",
          dataType: "",
          name: "",
          id: "",
          direction: ""
      }],
      modules: [
        {
            id: "",
            name: "",
            instance: "",
            modulePorts: [
                {
                    bandwidth: "",
                    dataType: "",
                    name: "",
                    id: "",
                    direction: ""
                }
            ]
        }
      ]
    };

    var sourceCodeString = sourceCode.body.sourceCode
    var port = {
        bandwidth:null,
        dataType: null,
        name: null,
        id: null,
        direction: null
  
    }


    if(module.docId.includes('.vhd')){
      
      var entity = "entity "
      var entityNameStart = sourceCodeString.indexOf(entity)
      entityNameStart +=entity.length
      var sourceCodeStringSubstring = sourceCodeString.substring(entityNameStart)
      var portDeclarationsStart = " is\n      port ("
      var entityNameEnd =  sourceCodeStringSubstring.indexOf(portDeclarationsStart)
      
      var entityName = sourceCodeStringSubstring.substring(0,entityNameEnd)
      parsedModule.mainModuleName = entityName
      //parsedModule.mainModuleInstance = entityName
      var portDeclarationsEnd = "end " + entityName +";\n"
      var portDeclarationsEndIndex = sourceCodeStringSubstring.indexOf(portDeclarationsEnd)
      var portDeclarationsStartIndex = portDeclarationsStart.length + entityName.length
      var portDeclarations = sourceCodeStringSubstring.substring(portDeclarationsStartIndex,portDeclarationsEndIndex)
      var portDeclarations = portDeclarations.substring(0, portDeclarations.length-3) + ";"

      var ports = []
      var types = []
      var bandwidths = [] 
      var portNameEndIndex
      var portTypeDeclarationEndIndex
      var semicolonIndex
      var vectorWidthEndIndex
      var vectorBandwidth

      
      while(portDeclarations.length > 0){
        
        portNameEndIndex = portDeclarations.indexOf(": ")
        port.name =portDeclarations.substring(0,portNameEndIndex)
        port.id = port.name 
        //ports.push(portDeclarations.substring(0,portNameEndIndex))
        portDeclarations = portDeclarations.substring(portNameEndIndex+2)
  
        portTypeDeclarationEndIndex = portDeclarations.indexOf(" ")
        port.direction = portDeclarations.substring(0,portTypeDeclarationEndIndex)+'put' 
        //types.push(portDeclarations.substring(0,portTypeDeclarationEndIndex))
        //if(types[types.length-1] == "out")
        portDeclarations = portDeclarations.substring(portTypeDeclarationEndIndex+1)
        if(portDeclarations.substring(0,10) == "std_logic;"){
          port.dataType = "logic"
          port.bandwidth = "bit"
          //bandwidths.push(1)
          semicolonIndex = portDeclarations.indexOf(";")
          semicolonIndex += 2
          while(portDeclarations[semicolonIndex] == ' '){
            semicolonIndex++;
          }
          portDeclarations = portDeclarations.substring(semicolonIndex)
        }
        else if (portDeclarations.substring(0,17) == "std_logic_vector(") {
          vectorWidthEndIndex =  portDeclarations.indexOf(' ')
          port.dataType = "logic"
          port.bandwidth = (parseInt(portDeclarations.substring(17,vectorWidthEndIndex)) + 1)
          //bandwidths.push(parseInt(portDeclarations.substring(17,vectorWidthEndIndex)) + 1)
          semicolonIndex = portDeclarations.indexOf(";")
          semicolonIndex += 2
          while(portDeclarations[semicolonIndex] == ' '){
            semicolonIndex++;
          }
          portDeclarations = portDeclarations.substring(semicolonIndex)
        }
        //if(portDeclarations.substring(0,8))
        parsedModule.mainPorts.push(port)
        port = {
          bandwidth:null,
          dataType: null,
          name: null,
          id: null,
          direction: null
    
        }
        /*if(ports.length == 2){
          break
        }*/
      }
    }

    if(module.docId.includes('.sv')){

      var moduleNameStartIndex = sourceCodeString.indexOf("module ")+7
      sourceCodeString = sourceCodeString.substring(moduleNameStartIndex)
      var moduleNameEndIndex = sourceCodeString.indexOf(" ")
      var moduleName = sourceCodeString.substring(0, moduleNameEndIndex)
      parsedModule.mainModuleName = moduleName
      //parsedModule.mainModuleInstance = moduleName
      var portDeclarationsStartIndex = sourceCodeString.indexOf("\n")
      var portDeclarationsEndIndex = sourceCodeString.indexOf(");")
      var portDeclarations = sourceCodeString.substring(portDeclarationsStartIndex+1,portDeclarationsEndIndex+2)
      var ramParams: [string,string][] = []
      if(portDeclarations.includes("parameter ADDR_WIDTH_")){
        var parameters = portDeclarations.substring(0, portDeclarations.indexOf(") (\n") +4)
        portDeclarations = portDeclarations.substring(portDeclarations.indexOf(") (\n") +5)
        var paramValue = parameters.indexOf("=")
        var paramName;
        var paramBandwidth;
        while(paramValue !=-1){
          paramName = parameters.substring(0,paramValue)
          parameters = parameters.substring(paramValue+2)
          if(!parameters.startsWith("1 <<")){
            paramName = paramName.substring(paramName.indexOf("parameter ")+10)
            paramName = paramName.slice(0,-1)
            
            var paramBandwidthEnd = parameters.indexOf(",")
            if(paramBandwidthEnd == -1){
              paramBandwidthEnd = parameters.indexOf("\n")
            }
            paramBandwidth = parameters.substring(0,paramBandwidthEnd)
            ramParams.push([paramName,paramBandwidth])
          }

          parameters = parameters.substring(parameters.indexOf("\n"))
          paramValue = parameters.indexOf("=")
        }
      }
      
      var j = 1
      var i
      var portDirectionDeclarationEndIndex
      var logicEndIndex
      var vectorWidthDeclarationEndIndex
      var vectorArrayDeclarationEndIndex
      while(!(portDeclarations.startsWith(");"))){
        i = 0
        while(portDeclarations[i] == ' '){
          i++
        }
        portDeclarations = portDeclarations.substring(i)
        portDirectionDeclarationEndIndex = portDeclarations.indexOf(" ")
        port.direction = portDeclarations.substring(0,portDirectionDeclarationEndIndex)
        portDeclarations = portDeclarations.substring(portDirectionDeclarationEndIndex+1)
        
        if(portDeclarations.startsWith("logic [")){
          vectorWidthDeclarationEndIndex = portDeclarations.indexOf(":")
          port.dataType = "logic"
          port.bandwidth = (parseInt(portDeclarations.substring(7,vectorWidthDeclarationEndIndex)) + 1)
          if(isNaN(port.bandwidth)){
            var paramToFind = portDeclarations.substring(7,vectorWidthDeclarationEndIndex).slice(0,-2)
            let foundParam = ramParams.find(tuple => tuple[0] === paramToFind)
            port.bandwidth = parseInt(foundParam[1])
          }
          vectorArrayDeclarationEndIndex = portDeclarations.indexOf("]")
          portDeclarations = portDeclarations.substring(vectorArrayDeclarationEndIndex+1)
        }
        else if (portDeclarations.startsWith("logic  ")){
          port.dataType = "logic"
          port.bandwidth = "bit"

          logicEndIndex = portDeclarations.indexOf("logic")+5
          portDeclarations = portDeclarations.substring(logicEndIndex)
        }
        else{
          var structPortEnd = portDeclarations.indexOf("\n")
          var structPort = portDeclarations.substring(0,structPortEnd)
          //portDeclarations = portDeclarations.substring(structPortEnd+1)
          var structPortType = structPort.substring(0,structPort.indexOf(" "))
          portDeclarations = portDeclarations.substring(structPort.indexOf(" ")+1)
          port.dataType = structPortType
          port.bandwidth = null
        }
        i = 0

        while(portDeclarations[i] == ' '|| portDeclarations[i] == '\t'){
          i++
        }
        if(portDeclarations.indexOf(",") != -1){
          port.name = portDeclarations.substring(i,portDeclarations.indexOf(","))
          portDeclarations = portDeclarations.substring(portDeclarations.indexOf(",")+2)
        }
        else{
          port.name = portDeclarations.substring(i,portDeclarations.indexOf("\n"))
          portDeclarations = portDeclarations.substring(portDeclarations.indexOf("\n")+1)
        }
        

        /*if(j == 10){
        break
        }

        j++*/

        parsedModule.mainPorts.push(port)
        port = {
          bandwidth:null,
          dataType: null,
          name: null,
          id: null,
          direction: null
    
        }
      }
      
    }
    

    /*this.codeToDiaService.parseForVisualization(sourceCode).subscribe(
      response => {
        const moduleData: ParsedModule = JSON.parse(response[0].json);
        moduleData.mainModuleInstance = module.instance;
        moduleData.mainModuleName = module.name;
        this.addExistingModule(moduleData);
      }
    );*/
    parsedModule.mainPorts.splice(0,1)
    this.addExistingModule(parsedModule);
  }

  public addExistingModule(module: ParsedModule) {
    this.paper.addExistingModule(module,false,null,null);
  }

  public async onSubmittedFileName(fileReference: RepoFileReference) {
    fileReference.displayName = getFileNameFromDocID(fileReference.name);
    if (fileReference.displayName.endsWith('.json')) {
      const code = await this.diaGenComponent.getFileBody(fileReference);
      const wholeJson = JSON.parse(code);
      this.paper.loadDiagramToGraph(wholeJson);
    } else if (fileReference.displayName.endsWith('.sv')) {
      const code = await this.diaGenComponent.getFileBody(fileReference);
      const parsedElements = await this.svDiaGenComponent.parseSystemVerilogCode(code)
      this.paper.drawSystemVerilogDiagram(parsedElements)
    } else if (fileReference.displayName.endsWith('.vhd')) {
      const code = await this.diaGenComponent.getFileBody(fileReference);
      const parsedCode = this.vhdlDiagramGeneration.parseAndGetASTRoot(code);
      this.paper.drawVhdlDiagram(parsedCode);
    }
  }

  public onVisualizeSubdiagramDataSubmitted(moduleData: ParsedDiagram) {
    this.paper.loadSubdiagramFromCode(moduleData);
  }

  public async loadPackagesFromRepository() {
    await this.diaGenComponent.getAvailablePackages();
  }

  public onPackageDataSubmitted(packagesData: ParsedPackages) {
    this.packageInformation = packagesData;
    this.paper.setPackages(packagesData);
    this.modalWindow.setPackages(packagesData);
  }

  public renameBoard(): void {
    const dialogData: FileDialogModel = {
      title: 'Rename visualization board',
      message: 'Enter the name of new visualization board',
      showAddedExtension: false,
      name: this.currentBoardTitle,
      path: '',
      validator: () => true
    };
    this.dialog.open(ModalFileNameComponent, {
      data: dialogData
    }).afterClosed().subscribe(value => {
      if (value) {
        this.collabService.renameVisualisationBoard(this.visualisationsDoc,
          this.boardControl.value, this.branch, value);
      }
    });
  }

  public removeBoard(): void {
    this.dialog.open(ModalConfirmComponent, {
      data: {
        message: `Are you sure you want to delete ${this.currentBoardTitle}?
         Any unsaved diagram will be lost!`
      }
    }).afterClosed().subscribe(value => {
      if (value) {
        this.collabService.removeVisualisationBoard(this.visualisationsDoc,
          this.boardControl.value, this.branch);
      }
    });
  }

  private updateBoardSelection(): void {
    let currentWasDeleted: boolean = true;
    try {
      this.availableBoards = [];
      for (const [key, board] of Object.entries(this.visualisationsDoc.data[this.branch])) {
        this.availableBoards.push({ id: key, title: board['title'] });
        if (key === this.boardControl.value) {
          currentWasDeleted = false;
        }
      }
      if (currentWasDeleted) {
        this.snackBar.open('This board has been deleted. Redirecting to default board.',
          'OK', { duration: 3000 });
        this.boardControl.setValue('default');
        this.boardSelection.updateValueAndValidity();
      }
      this.currentBoard = this.currentBoard || this.availableBoards[0];
    } catch (e) {
      this.availableBoards = this.availableBoards || [];
    }
  }

  public async displayNewPackageImportProperties() {
    this.availablePackageFiles = await this.diaGenComponent.loadAvailableSourceFiles('_package.sv');
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    this.name = '';
    this.instance = '';
    this.textCheckNewModule = true;
    const elementProperties = document.getElementById('PackageImportProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewOrGateCustomPortsProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewOrCustomPortsProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewAndGateCustomPortsProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewAndCustomPortsProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewNorGateCustomPortsProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewNorCustomPortsProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewNandGateCustomPortsProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewNandCustomPortsProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewXorGateCustomPortsProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewXorCustomPortsProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewXnorGateCustomPortsProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewXnorCustomPortsProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewNotGateProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewNotProperties');
    elementProperties.style.display = 'block';
  }

  public async displayNewMultiplexorProperties() {
    this.availablePackageFiles = await this.diaGenComponent.loadAvailableSourceFiles('_package.sv');
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewMultiplexorProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewDecoderProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewDecoderProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewEncoderProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewEncoderProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewAdderProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewAdderProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewSubtractorProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewSubtractorProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewComparatorProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewComparatorProperties');
    elementProperties.style.display = 'block';
  }

  public async displayNewRegisterProperties() {
    this.availablePackageFiles = await this.diaGenComponent.loadAvailableSourceFiles('_package.sv');
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewRegisterProperties');
    elementProperties.style.display = 'block';
  }

  public async displayNewRamProperties() {
    this.availablePackageFiles = await this.diaGenComponent.loadAvailableSourceFiles('_package.sv');
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    const elementProperties = document.getElementById('NewRamProperties');
    elementProperties.style.display = 'block';
  }

  public async displayNewStandalonePortInProperties() {
    this.availablePackageFiles = await this.diaGenComponent.loadAvailableSourceFiles('_package.sv');
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    this.name = '';
    this.bandwidth = '';
    this.textCheckNewPort = true;
    
    const elementProperties = document.getElementById('NewStandalonePortInProperties');
    elementProperties.style.display = 'block';
  }

  public async displayNewStandalonePortOutProperties() {
    this.availablePackageFiles = await this.diaGenComponent.loadAvailableSourceFiles('_package.sv');
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    this.name = '';
    this.bandwidth = '';
    this.textCheckNewPort = true;
    
    const elementProperties = document.getElementById('NewStandalonePortOutProperties');
    elementProperties.style.display = 'block';
  }

  public displayNewModuleProperties() {
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    this.name = '';
    this.instance = '';
    this.textCheckNewModule = true;
    const elementProperties = document.getElementById('NewModuleProperties');
    elementProperties.style.display = 'block';
  }

  public async displayExistingModuleProperties() {
    const availableSvFiles = await this.diaGenComponent.loadAvailableSourceFiles('.sv');
    const availableVhdFiles = await this.diaGenComponent.loadAvailableSourceFiles('.vhd');
    const availableFiles = availableSvFiles.concat(availableVhdFiles);
    this.availableJSONFiles = availableFiles
    const elements = document.getElementsByClassName('modal-content');

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.display = 'none';
    }

    this.name = '';
    this.instance = '';
    this.textCheckNewModule = true;
    const elementProperties = document.getElementById('ExistingModuleProperties');
    elementProperties.style.display = 'block';
  }

  

  public orCustomPortsPropertiesBitChecked() {
    const orBandwidthInputElement = document.getElementById('panelOrCustomPortsBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('panelOrCustomPortsBandwidthInputLabel');
    //const orStructSelectElement = document.getElementById('panelOrCustomPortsStruct');
    //const orStructSelectElementLab = document.getElementById('panelOrCustomPortsStructLabel');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    //orStructSelectElement.style.display = 'none';
    //orStructSelectElementLab.style.display = 'none';
  }

  public orCustomPortsPropertiesVectorChecked() {
    const orBandwidthInputElement = document.getElementById('panelOrCustomPortsBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('panelOrCustomPortsBandwidthInputLabel');
    //const orStructSelectElement = document.getElementById('panelOrCustomPortsStruct');
    //const orStructSelectElementLab = document.getElementById('panelOrCustomPortsStructLabel');
    orBandwidthInputElement.style.display = 'inline-block';
    orBandwidthInputElementLab.style.display = 'inline-block';
    //orStructSelectElement.style.display = 'none';
    //orStructSelectElementLab.style.display = 'none';
  }

  public orCustomPortsPropertiesCustomChecked() {
    const orBandwidthInputElement = document.getElementById('panelOrCustomPortsBandwidthInput');
    const orBandwidthInputElementLab = document.getElementById('panelOrCustomPortsBandwidthInputLabel');
    const orStructSelectElement = document.getElementById('panelOrCustomPortsStruct');
    const orStructSelectElementLab = document.getElementById('panelOrCustomPortsStructLabel');
    orBandwidthInputElement.style.display = 'none';
    orBandwidthInputElementLab.style.display = 'none';
    orStructSelectElement.style.display = 'inline-block';
    orStructSelectElementLab.style.display = 'inline-block';
  }

  public norCustomPortsPropertiesBitChecked() {
    const norBandwidthInputElement = document.getElementById('panelNorCustomPortsBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('panelNorCustomPortsBandwidthInputLabel');
    //const norStructSelectElement = document.getElementById('panelNorCustomPortsStruct');
    //const norStructSelectElementLab = document.getElementById('panelNorCustomPortsStructLabel');
    norBandwidthInputElement.style.display = 'none';
    norBandwidthInputElementLab.style.display = 'none';
    //norStructSelectElement.style.display = 'none';
    //norStructSelectElementLab.style.display = 'none';
  }

  public norCustomPortsPropertiesVectorChecked() {
    const norBandwidthInputElement = document.getElementById('panelNorCustomPortsBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('panelNorCustomPortsBandwidthInputLabel');
    //const norStructSelectElement = document.getElementById('panelNorCustomPortsStruct');
    //const norStructSelectElementLab = document.getElementById('panelNorCustomPortsStructLabel');
    norBandwidthInputElement.style.display = 'inline-block';
    norBandwidthInputElementLab.style.display = 'inline-block';
    //norStructSelectElement.style.display = 'none';
    //norStructSelectElementLab.style.display = 'none';
  }

  public norCustomPortsPropertiesCustomChecked() {
    const norBandwidthInputElement = document.getElementById('panelNorCustomPortsBandwidthInput');
    const norBandwidthInputElementLab = document.getElementById('panelNorCustomPortsBandwidthInputLabel');
    //const norStructSelectElement = document.getElementById('panelNorCustomPortsStruct');
    //const norStructSelectElementLab = document.getElementById('panelNorCustomPortsStructLabel');
    norBandwidthInputElement.style.display = 'none';
    norBandwidthInputElementLab.style.display = 'none';
    //norStructSelectElement.style.display = 'inline-block';
    //norStructSelectElementLab.style.display = 'inline-block';
  }

  public andCustomPortsPropertiesBitChecked() {
    const andBandwidthInputElement = document.getElementById('panelAndCustomPortsBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('panelAndCustomPortsBandwidthInputLabel');
    //const andStructSelectElement = document.getElementById('panelAndCustomPortsStruct');
    //const andStructSelectElementLab = document.getElementById('panelAndCustomPortsStructLabel');
    andBandwidthInputElement.style.display = 'none';
    andBandwidthInputElementLab.style.display = 'none';
    //andStructSelectElement.style.display = 'none';
    //andStructSelectElementLab.style.display = 'none';
  }

  public andCustomPortsPropertiesVectorChecked() {
    const andBandwidthInputElement = document.getElementById('panelAndCustomPortsBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('panelAndCustomPortsBandwidthInputLabel');
    //const andStructSelectElement = document.getElementById('panelAndCustomPortsStruct');
    //const andStructSelectElementLab = document.getElementById('panelAndCustomPortsStructLabel');
    andBandwidthInputElement.style.display = 'inline-block';
    andBandwidthInputElementLab.style.display = 'inline-block';
    //andStructSelectElement.style.display = 'none';
    //andStructSelectElementLab.style.display = 'none';
  }

  public andCustomPortsPropertiesCustomChecked() {
    const andBandwidthInputElement = document.getElementById('panelAndCustomPortsBandwidthInput');
    const andBandwidthInputElementLab = document.getElementById('panelAndCustomPortsBandwidthInputLabel');
    //const andStructSelectElement = document.getElementById('panelAndCustomPortsStruct');
    //const andStructSelectElementLab = document.getElementById('panelAndCustomPortsStructLabel');
    andBandwidthInputElement.style.display = 'none';
    andBandwidthInputElementLab.style.display = 'none';
    //andStructSelectElement.style.display = 'inline-block';
    //andStructSelectElementLab.style.display = 'inline-block';
  }

  public nandCustomPortsPropertiesBitChecked() {
    const nandBandwidthInputElement = document.getElementById('panelNandCustomPortsBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('panelNandCustomPortsBandwidthInputLabel');
    //const nandStructSelectElement = document.getElementById('panelNandCustomPortsStruct');
    //const nandStructSelectElementLab = document.getElementById('panelNandCustomPortsStructLabel');
    nandBandwidthInputElement.style.display = 'none';
    nandBandwidthInputElementLab.style.display = 'none';
    //nandStructSelectElement.style.display = 'none';
    //nandStructSelectElementLab.style.display = 'none';
  }

  public nandCustomPortsPropertiesVectorChecked() {
    const nandBandwidthInputElement = document.getElementById('panelNandCustomPortsBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('panelNandCustomPortsBandwidthInputLabel');
    //const nandStructSelectElement = document.getElementById('panelNandCustomPortsStruct');
    //const nandStructSelectElementLab = document.getElementById('panelNandCustomPortsStructLabel');
    nandBandwidthInputElement.style.display = 'inline-block';
    nandBandwidthInputElementLab.style.display = 'inline-block';
    //nandStructSelectElement.style.display = 'none';
    //nandStructSelectElementLab.style.display = 'none';
  }

  public nandCustomPortsPropertiesCustomChecked() {
    const nandBandwidthInputElement = document.getElementById('panelNandCustomPortsBandwidthInput');
    const nandBandwidthInputElementLab = document.getElementById('panelNandCustomPortsBandwidthInputLabel');
    //const nandStructSelectElement = document.getElementById('panelNandCustomPortsStruct');
    //const nandStructSelectElementLab = document.getElementById('panelNandCustomPortsStructLabel');
    nandBandwidthInputElement.style.display = 'none';
    nandBandwidthInputElementLab.style.display = 'none';
    //nandStructSelectElement.style.display = 'inline-block';
    //nandStructSelectElementLab.style.display = 'inline-block';
  }

  public xorCustomPortsPropertiesBitChecked() {
    const xorBandwidthInputElement = document.getElementById('panelXorCustomPortsBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('panelXorCustomPortsBandwidthInputLabel');
    //const xorStructSelectElement = document.getElementById('panelXorCustomPortsStruct');
    //const xorStructSelectElementLab = document.getElementById('panelXorCustomPortsStructLabel');
    xorBandwidthInputElement.style.display = 'none';
    xorBandwidthInputElementLab.style.display = 'none';
    //xorStructSelectElement.style.display = 'none';
    //xorStructSelectElementLab.style.display = 'none';
  }

  public xorCustomPortsPropertiesVectorChecked() {
    const xorBandwidthInputElement = document.getElementById('panelXorCustomPortsBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('panelXorCustomPortsBandwidthInputLabel');
    //const xorStructSelectElement = document.getElementById('panelXorCustomPortsStruct');
    //const xorStructSelectElementLab = document.getElementById('panelXorCustomPortsStructLabel');
    xorBandwidthInputElement.style.display = 'inline-block';
    xorBandwidthInputElementLab.style.display = 'inline-block';
    //xorStructSelectElement.style.display = 'none';
    //xorStructSelectElementLab.style.display = 'none';
  }

  public xorCustomPortsPropertiesCustomChecked() {
    const xorBandwidthInputElement = document.getElementById('panelXorCustomPortsBandwidthInput');
    const xorBandwidthInputElementLab = document.getElementById('panelXorCustomPortsBandwidthInputLabel');
    //const xorStructSelectElement = document.getElementById('panelXorCustomPortsStruct');
    //const xorStructSelectElementLab = document.getElementById('panelXorCustomPortsStructLabel');
    xorBandwidthInputElement.style.display = 'none';
    xorBandwidthInputElementLab.style.display = 'none';
    //xorStructSelectElement.style.display = 'inline-block';
    //xorStructSelectElementLab.style.display = 'inline-block';
  }

  public xnorCustomPortsPropertiesBitChecked() {
    const xnorBandwidthInputElement = document.getElementById('panelXnorCustomPortsBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('panelXnorCustomPortsBandwidthInputLabel');
    //const xnorStructSelectElement = document.getElementById('panelXnorCustomPortsStruct');
    //const xnorStructSelectElementLab = document.getElementById('panelXnorCustomPortsStructLabel');
    xnorBandwidthInputElement.style.display = 'none';
    xnorBandwidthInputElementLab.style.display = 'none';
    //xnorStructSelectElement.style.display = 'none';
    //xnorStructSelectElementLab.style.display = 'none';
  }

  public xnorCustomPortsPropertiesVectorChecked() {
    const xnorBandwidthInputElement = document.getElementById('panelXnorCustomPortsBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('panelXnorCustomPortsBandwidthInputLabel');
    //const xnorStructSelectElement = document.getElementById('panelXnorCustomPortsStruct');
    //const xnorStructSelectElementLab = document.getElementById('panelXnorCustomPortsStructLabel');
    xnorBandwidthInputElement.style.display = 'inline-block';
    xnorBandwidthInputElementLab.style.display = 'inline-block';
    //xnorStructSelectElement.style.display = 'none';
    //xnorStructSelectElementLab.style.display = 'none';
  }

  public xnorCustomPortsPropertiesCustomChecked() {
    const xnorBandwidthInputElement = document.getElementById('panelXnorCustomPortsBandwidthInput');
    const xnorBandwidthInputElementLab = document.getElementById('panelXnorCustomPortsBandwidthInputLabel');
    //const xnorStructSelectElement = document.getElementById('panelXnorCustomPortsStruct');
    //const xnorStructSelectElementLab = document.getElementById('panelXnorCustomPortsStructLabel');
    xnorBandwidthInputElement.style.display = 'none';
    xnorBandwidthInputElementLab.style.display = 'none';
    //xnorStructSelectElement.style.display = 'inline-block';
    //xnorStructSelectElementLab.style.display = 'inline-block';
  }

  public notPropertiesBitChecked() {
    const notBandwidthInputElement = document.getElementById('panelNotBandwidthInput');
    const notBandwidthInputElementLab = document.getElementById('panelNotBandwidthInputLabel');
    //const notStructSelectElement = document.getElementById('panelNotStruct');
    //const notStructSelectElementLab = document.getElementById('panelNotStructLabel');
    notBandwidthInputElement.style.display = 'none';
    notBandwidthInputElementLab.style.display = 'none';
    //notStructSelectElement.style.display = 'none';
    //notStructSelectElementLab.style.display = 'none';
  }

  public notPropertiesVectorChecked() {
    const notBandwidthInputElement = document.getElementById('panelNotBandwidthInput');
    const notBandwidthInputElementLab = document.getElementById('panelNotBandwidthInputLabel');
    //const notStructSelectElement = document.getElementById('panelNotStruct');
    //const notStructSelectElementLab = document.getElementById('panelNotStructLabel');
    notBandwidthInputElement.style.display = 'inline-block';
    notBandwidthInputElementLab.style.display = 'inline-block';
    //notStructSelectElement.style.display = 'none';
    //notStructSelectElementLab.style.display = 'none';
  }

  public notPropertiesCustomChecked() {
    const notBandwidthInputElement = document.getElementById('panelNotBandwidthInput');
    const notBandwidthInputElementLab = document.getElementById('panelNotBandwidthInputLabel');
    //const notStructSelectElement = document.getElementById('panelNotStruct');
    //const notStructSelectElementLab = document.getElementById('panelNotStructLabel');
    notBandwidthInputElement.style.display = 'none';
    notBandwidthInputElementLab.style.display = 'none';
    //notStructSelectElement.style.display = 'inline-block';
    //notStructSelectElementLab.style.display = 'inline-block';
  }
  //

  //next 4 unused currently
  public multiplexorPropertiesSingleSelChecked() {
    const multiplexorBandwidthDiv = document.getElementById('singleSelSelected');
    const multiplexorMultiplicityDiv = document.getElementById('multipleSelsSelected');
    multiplexorBandwidthDiv.style.display = 'block';
    multiplexorMultiplicityDiv.style.display = 'none';
  }

  public multiplexorPropertiesMultipleSelChecked() {
    const multiplexorBandwidthDiv = document.getElementById('singleSelSelected');
    const multiplexorMultiplicityDiv = document.getElementById('multipleSelsSelected');
    multiplexorBandwidthDiv.style.display = 'none';
    multiplexorMultiplicityDiv.style.display = 'block';
  }

  public multiplexorPropertiesSelBitChecked() {
    const multiplexorBandwidthInputElement = document.getElementById('multiplexorBandwidthInput');
    const multiplexorBandwidthInputElementLab = document.getElementById('multiplexorBandwidthInputLabel');
    const multiplexorStructSelectElement = document.getElementById('multiplexorStruct');
    const multiplexorStructSelectElementLab = document.getElementById('multiplexorStructLabel');
    const multiplexorStructKeyIndexLab = document.getElementById('mulIndexInputLabel');
    const multiplexorStructKeyIndex = document.getElementById('mulIndexInput');
    multiplexorBandwidthInputElement.style.display = 'none';
    multiplexorBandwidthInputElementLab.style.display = 'none';
    //multiplexorStructSelectElement.style.display = 'none';
    //multiplexorStructSelectElementLab.style.display = 'none';
    multiplexorStructKeyIndexLab.style.display = 'none';
    multiplexorStructKeyIndex.style.display = 'none';
  }

  public multiplexorPropertiesSelVectorChecked() {
    const multiplexorBandwidthInputElement = document.getElementById('multiplexorBandwidthInput');
    const multiplexorBandwidthInputElementLab = document.getElementById('multiplexorBandwidthInputLabel');
    const multiplexorStructSelectElement = document.getElementById('multiplexorStruct');
    const multiplexorStructSelectElementLab = document.getElementById('multiplexorStructLabel');
    const multiplexorStructKeyIndexLab = document.getElementById('mulIndexInputLabel');
    const multiplexorStructKeyIndex = document.getElementById('mulIndexInput');
    multiplexorBandwidthInputElement.style.display = 'block';
    multiplexorBandwidthInputElementLab.style.display = 'block';
    multiplexorStructKeyIndexLab.style.display = 'block';
    multiplexorStructKeyIndex.style.display = 'block';
   // multiplexorStructSelectElement.style.display = 'block';
   // multiplexorStructSelectElementLab.style.display = 'block';
  }

  public mulDataPropertiesBitChecked() {
    const multiplexorDataBandwidthInputElement = document.getElementById('panelMulDataBandwidthInput');
    const multiplexorDataBandwidthInputElementLab = document.getElementById('panelMulDataBandwidthInputLabel');
    const multiplexorDataStructSelectElement = document.getElementById('panelMulDataStruct');
    const multiplexorDataStructSelectElementLab = document.getElementById('panelMulDataStructLabel');
    //const multiplexorDataStructPartsSelectElement = document.getElementById('panelMulDataStructParts');
    //const multiplexorDataStructPartsSelectElementLab = document.getElementById('panelMulDataStructPartsLabel');
    const multiplexorDataStructPackageSekectLab = document.getElementById('panelMulDataPackageLabel');
    const multiplexorDataStructPackageSekect = document.getElementById('panelMulDataPackage');
    multiplexorDataBandwidthInputElement.style.display = 'none';
    multiplexorDataBandwidthInputElementLab.style.display = 'none';
    multiplexorDataStructSelectElement.style.display = 'none';
    multiplexorDataStructSelectElementLab.style.display = 'none';
    multiplexorDataStructPackageSekectLab.style.display = 'none';
    multiplexorDataStructPackageSekect.style.display = 'none';
    //multiplexorDataStructPartsSelectElement.style.display = 'none'
    //multiplexorDataStructPartsSelectElementLab.style.display = 'none'
  }

  public mulDataPropertiesVectorChecked() {
    const multiplexorDataBandwidthInputElement = document.getElementById('panelMulDataBandwidthInput');
    const multiplexorDataBandwidthInputElementLab = document.getElementById('panelMulDataBandwidthInputLabel');
    const multiplexorDataStructSelectElement = document.getElementById('panelMulDataStruct');
    const multiplexorDataStructSelectElementLab = document.getElementById('panelMulDataStructLabel');
    //const multiplexorDataStructPartsSelectElement = document.getElementById('panelMulDataStructParts');
    //const multiplexorDataStructPartsSelectElementLab = document.getElementById('panelMulDataStructPartsLabel');
    const multiplexorDataStructPackageSekectLab = document.getElementById('panelMulDataPackageLabel');
    const multiplexorDataStructPackageSekect = document.getElementById('panelMulDataPackage');
    multiplexorDataBandwidthInputElement.style.display = 'inline-block';
    multiplexorDataBandwidthInputElementLab.style.display = 'inline-block';
    multiplexorDataStructSelectElement.style.display = 'none';
    multiplexorDataStructSelectElementLab.style.display = 'none';
    multiplexorDataStructPackageSekectLab.style.display = 'none';
    multiplexorDataStructPackageSekect.style.display = 'none';
    //multiplexorDataStructPartsSelectElement.style.display = 'none'
    //multiplexorDataStructPartsSelectElementLab.style.display = 'none'
  }

  public mulDataPropertiesCustomChecked() {
    const multiplexorDataBandwidthInputElement = document.getElementById('panelMulDataBandwidthInput');
    const multiplexorDataBandwidthInputElementLab = document.getElementById('panelMulDataBandwidthInputLabel');
    const multiplexorDataStructSelectElement = document.getElementById('panelMulDataStruct');
    const multiplexorDataStructSelectElementLab = document.getElementById('panelMulDataStructLabel');
    //const multiplexorDataStructPartsSelectElement = document.getElementById('panelMulDataStructParts');
    //const multiplexorDataStructPartsSelectElementLab = document.getElementById('panelMulDataStructPartsLabel');
    const multiplexorDataStructPackageSekectLab = document.getElementById('panelMulDataPackageLabel');
    const multiplexorDataStructPackageSekect = document.getElementById('panelMulDataPackage');
    multiplexorDataBandwidthInputElement.style.display = 'none';
    multiplexorDataBandwidthInputElementLab.style.display = 'none';
    multiplexorDataStructSelectElement.style.display = 'inline-block';
    multiplexorDataStructSelectElementLab.style.display = 'inline-block';
    multiplexorDataStructPackageSekectLab.style.display = 'inline-block';
    multiplexorDataStructPackageSekect.style.display = 'inline-block';
    //multiplexorDataStructPartsSelectElement.style.display = 'inline-block'
    //multiplexorDataStructPartsSelectElementLab.style.display = 'inline-block'
    this.packageDefines = []
    this.packageDatatypeSubtypes = []
  }

  public registerDataPropertiesBitChecked() {
    const registerDataBandwidthInputElement = document.getElementById('panelRegisterBandwidthInput');
    const registerDataBandwidthInputElementLab = document.getElementById('panelRegisterBandwidthInputLabel');
    const registerDataBandwidthPackageElement = document.getElementById('panelRegisterDataPackage');
    const registerDataBandwidthPackageElementLab = document.getElementById('panelRegisterDataPackageLabel');
    const registerDataBandwidthStructElement = document.getElementById('panelRegisterDataStruct');
    const registerDataBandwidthStructElementLab = document.getElementById('panelRegisterDataStructLabel');
    //const registerDataBandwidthStructPartsElement = document.getElementById('panelRegisterDataStructParts');
    //const registerDataBandwidthStructPartsElementLab = document.getElementById('panelRegisterDataStructPartsLabel');
    registerDataBandwidthInputElement.style.display = 'none';
    registerDataBandwidthInputElementLab.style.display = 'none';
    registerDataBandwidthPackageElement.style.display = 'none'
    registerDataBandwidthPackageElementLab.style.display = 'none'
    registerDataBandwidthStructElement.style.display = 'none'
    registerDataBandwidthStructElementLab.style.display = 'none'
    //registerDataBandwidthStructPartsElement.style.display = 'none'
    //registerDataBandwidthStructPartsElementLab.style.display = 'none'
  }

  public registerDataPropertiesVectorChecked() {
    const registerDataBandwidthInputElement = document.getElementById('panelRegisterBandwidthInput');
    const registerDataBandwidthInputElementLab = document.getElementById('panelRegisterBandwidthInputLabel');
    const registerDataBandwidthPackageElement = document.getElementById('panelRegisterDataPackage');
    const registerDataBandwidthPackageElementLab = document.getElementById('panelRegisterDataPackageLabel');
    const registerDataBandwidthStructElement = document.getElementById('panelRegisterDataStruct');
    const registerDataBandwidthStructElementLab = document.getElementById('panelRegisterDataStructLabel');
    //const registerDataBandwidthStructPartsElement = document.getElementById('panelRegisterDataStructParts');
    //const registerDataBandwidthStructPartsElementLab = document.getElementById('panelRegisterDataStructPartsLabel');
    registerDataBandwidthInputElement.style.display = 'inline-block';
    registerDataBandwidthInputElementLab.style.display = 'inline-block';
    registerDataBandwidthPackageElement.style.display = 'none'
    registerDataBandwidthPackageElementLab.style.display = 'none'
    registerDataBandwidthStructElement.style.display = 'none'
    registerDataBandwidthStructElementLab.style.display = 'none'
    //registerDataBandwidthStructPartsElement.style.display = 'none'
    //registerDataBandwidthStructPartsElementLab.style.display = 'none'
  }
  
  public registerDataPropertiesCustomChecked() {
    const registerDataBandwidthInputElement = document.getElementById('panelRegisterBandwidthInput');
    const registerDataBandwidthInputElementLab = document.getElementById('panelRegisterBandwidthInputLabel');
    const registerDataBandwidthPackageElement = document.getElementById('panelRegisterDataPackage');
    const registerDataBandwidthPackageElementLab = document.getElementById('panelRegisterDataPackageLabel');
    const registerDataBandwidthStructElement = document.getElementById('panelRegisterDataStruct');
    const registerDataBandwidthStructElementLab = document.getElementById('panelRegisterDataStructLabel');
    //const registerDataBandwidthStructPartsElement = document.getElementById('panelRegisterDataStructParts');
    //const registerDataBandwidthStructPartsElementLab = document.getElementById('panelRegisterDataStructPartsLabel');
    registerDataBandwidthInputElement.style.display = 'none';
    registerDataBandwidthInputElementLab.style.display = 'none';
    registerDataBandwidthPackageElement.style.display = 'inline-block'
    registerDataBandwidthPackageElementLab.style.display = 'inline-block'
    registerDataBandwidthStructElement.style.display = 'inline-block'
    registerDataBandwidthStructElementLab.style.display = 'inline-block'
    //registerDataBandwidthStructPartsElement.style.display = 'inline-block'
    //registerDataBandwidthStructPartsElementLab.style.display = 'inline-block'
    this.packageDefines = []
    this.packageDatatypeSubtypes = []
        
  }

  public ramDataPropertiesCustomChecked() {
    const ramDataBandwidthInputElement = document.getElementById('panelRamDataBandwidthInput');
    const ramDataBandwidthInputElementLab = document.getElementById('panelRamDataBandwidthInputLabel');
    const ramDataBandwidthPackageElement = document.getElementById('panelRamDataPackage');
    const ramDataBandwidthPackageElementLab = document.getElementById('panelRamDataPackageLabel');
    const ramDataBandwidthStructElement = document.getElementById('panelRamDataStruct');
    const ramDataBandwidthStructElementLab = document.getElementById('panelRamDataStructLabel');
    //const ramDataBandwidthStructPartsElement = document.getElementById('panelRamDataStructParts');
    //const ramDataBandwidthStructPartsElementLab = document.getElementById('panelRamDataStructPartsLabel');
    ramDataBandwidthInputElement.style.display = 'none';
    ramDataBandwidthInputElementLab.style.display = 'none';
    ramDataBandwidthPackageElement.style.display = 'inline-block'
    ramDataBandwidthPackageElementLab.style.display = 'inline-block'
    ramDataBandwidthStructElement.style.display = 'inline-block'
    ramDataBandwidthStructElementLab.style.display = 'inline-block'
    //ramDataBandwidthStructPartsElement.style.display = 'inline-block'
    //ramDataBandwidthStructPartsElementLab.style.display = 'inline-block'
    this.packageDefines = []
    this.packageDatatypeSubtypes = []
        
  }

  public ramDataPropertiesVectorChecked() {
    const ramDataBandwidthInputElement = document.getElementById('panelRamDataBandwidthInput');
    const ramDataBandwidthInputElementLab = document.getElementById('panelRamDataBandwidthInputLabel');
    const ramDataBandwidthPackageElement = document.getElementById('panelRamDataPackage');
    const ramDataBandwidthPackageElementLab = document.getElementById('panelRamDataPackageLabel');
    const ramDataBandwidthStructElement = document.getElementById('panelRamDataStruct');
    const ramDataBandwidthStructElementLab = document.getElementById('panelRamDataStructLabel');
    //const ramDataBandwidthStructPartsElement = document.getElementById('panelRamDataStructParts');
    //const ramDataBandwidthStructPartsElementLab = document.getElementById('panelRamDataStructPartsLabel');
    ramDataBandwidthInputElement.style.display = 'inline-block';
    ramDataBandwidthInputElementLab.style.display = 'inline-block';
    ramDataBandwidthPackageElement.style.display = 'none'
    ramDataBandwidthPackageElementLab.style.display = 'none'
    ramDataBandwidthStructElement.style.display = 'none'
    ramDataBandwidthStructElementLab.style.display = 'none'
    //ramDataBandwidthStructPartsElement.style.display = 'none'
    //ramDataBandwidthStructPartsElementLab.style.display = 'none'
  }

  public bitPortPropertiesChecked() {
    const portBandwidthInputElement = document.getElementById('panelPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('panelPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('panelPStruct');
    const portStructSelectElementLab = document.getElementById('panelPStructLabel');
    const portPackageSelectElement = document.getElementById('panelPPackage');
    const portPackageSelectElementLab = document.getElementById('panelPPackageLabel');
    //const portPackageSelectElementParts = document.getElementById('panelPStructParts');
    //const portPackageSelectElementPartsLab = document.getElementById('panelPStructPartsLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
    //portPackageSelectElementParts.style.display = 'none'
    //portPackageSelectElementPartsLab.style.display = 'none'
  }

  public vectorPortPropertiesChecked() {
    const portBandwidthInputElement = document.getElementById('panelPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('panelPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('panelPStruct');
    const portStructSelectElementLab = document.getElementById('panelPStructLabel');
    const portPackageSelectElement = document.getElementById('panelPPackage');
    const portPackageSelectElementLab = document.getElementById('panelPPackageLabel');
    //const portPackageSelectElementParts = document.getElementById('panelPStructParts');
    //const portPackageSelectElementPartsLab = document.getElementById('panelPStructPartsLabel');
    portBandwidthInputElement.style.display = 'inline-block';
    portBandwidthInputElementLab.style.display = 'inline-block';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
    //portPackageSelectElementParts.style.display = 'none'
    //portPackageSelectElementPartsLab.style.display = 'none'
  }

  public bitPortPropertiesCheckedOut() {
    const portBandwidthInputElement = document.getElementById('panelPBandwidthInputOut');
    const portBandwidthInputElementLab = document.getElementById('panelPBandwidthInputLabelOut');
    const portStructSelectElement = document.getElementById('panelPStructOut');
    const portStructSelectElementLab = document.getElementById('panelPStructLabelOut');
    const portPackageSelectElement = document.getElementById('panelPPackageOut');
    const portPackageSelectElementLab = document.getElementById('panelPPackageLabelOut');
    //const portPackageSelectElementParts = document.getElementById('panelPStructPartsOut');
    //const portPackageSelectElementPartsLab = document.getElementById('panelPStructPartsLabelOut');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
    //portPackageSelectElementParts.style.display = 'none';
    //portPackageSelectElementPartsLab.style.display = 'none';
  }

  public vectorPortPropertiesCheckedOut() {
    const portBandwidthInputElement = document.getElementById('panelPBandwidthInputOut');
    const portBandwidthInputElementLab = document.getElementById('panelPBandwidthInputLabelOut');
    const portStructSelectElement = document.getElementById('panelPStructOut');
    const portStructSelectElementLab = document.getElementById('panelPStructLabelOut');
    const portPackageSelectElement = document.getElementById('panelPPackageOut');
    const portPackageSelectElementLab = document.getElementById('panelPPackageLabelOut');
    //const portPackageSelectElementParts = document.getElementById('panelPStructPartsOut');
    //const portPackageSelectElementPartsLab = document.getElementById('panelPStructPartsLabelOut');
    portBandwidthInputElement.style.display = 'inline-block';
    portBandwidthInputElementLab.style.display = 'inline-block';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
    //portPackageSelectElementParts.style.display = 'none';
    //portPackageSelectElementPartsLab.style.display = 'none';
  }

  public customPortPropertiesChecked() {
    const portBandwidthInputElement = document.getElementById('panelPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('panelPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('panelPStruct');
    const portStructSelectElementLab = document.getElementById('panelPStructLabel');
    const portPackageSelectElement = document.getElementById('panelPPackage');
    const portPackageSelectElementLab = document.getElementById('panelPPackageLabel');
    //const portPackageSelectElementParts = document.getElementById('panelPStructParts');
    //const portPackageSelectElementPartsLab = document.getElementById('panelPStructPartsLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'inline-block';
    portStructSelectElementLab.style.display = 'inline-block';
    portPackageSelectElement.style.display = 'inline-block';
    portPackageSelectElementLab.style.display = 'inline-block';
    //portPackageSelectElementParts.style.display = 'inline-block'
    //portPackageSelectElementPartsLab.style.display = 'inline-block'
    this.packageDefines = []
    this.packageDatatypeSubtypes = []
  }


  public customPortPropertiesCheckedOut() {
    const portBandwidthInputElement = document.getElementById('panelPBandwidthInputOut');
    const portBandwidthInputElementLab = document.getElementById('panelPBandwidthInputLabelOut');
    const portStructSelectElement = document.getElementById('panelPStructOut');
    const portStructSelectElementLab = document.getElementById('panelPStructLabelOut');
    const portPackageSelectElement = document.getElementById('panelPPackageOut');
    const portPackageSelectElementLab = document.getElementById('panelPPackageLabelOut');
    //const portPackageSelectElementParts = document.getElementById('panelPStructPartsOut');
    //const portPackageSelectElementPartsLab = document.getElementById('panelPStructPartsLabelOut');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'inline-block';
    portStructSelectElementLab.style.display = 'inline-block';
    portPackageSelectElement.style.display = 'inline-block';
    portPackageSelectElementLab.style.display = 'inline-block';
    //portPackageSelectElementParts.style.display = 'inline-block';
    //portPackageSelectElementPartsLab.style.display = 'inline-block';
    this.packageDefines = []
    this.packageDatatypeSubtypes = []
  }

  public bitPortModulePropertiesChecked() {
    const portBandwidthInputElement = document.getElementById('panelInnerPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('panelInnerPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('panelInnerPStruct');
    const portStructSelectElementLab = document.getElementById('panelInnerPStructLabel');
    //const portStructSelectPartsElement = document.getElementById('panelInnerPStructParts');
    //const portStructSelectPartsElementLab = document.getElementById('panelInnerPStructPartsLabel');
    const portPackageSelectElement = document.getElementById('panelInnerPPackage');
    const portPackageSelectElementLab = document.getElementById('panelInnerPPackageLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
    //portStructSelectPartsElementLab.style.display = 'none';
    //portStructSelectPartsElement.style.display = 'none';
  }

  public vectorPortModulePropertiesChecked() {
    const portBandwidthInputElement = document.getElementById('panelInnerPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('panelInnerPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('panelInnerPStruct');
    const portStructSelectElementLab = document.getElementById('panelInnerPStructLabel');
    //const portStructSelectPartsElement = document.getElementById('panelInnerPStructParts');
    //const portStructSelectPartsElementLab = document.getElementById('panelInnerPStructPartsLabel');
    const portPackageSelectElement = document.getElementById('panelInnerPPackage');
    const portPackageSelectElementLab = document.getElementById('panelInnerPPackageLabel');
    portBandwidthInputElement.style.display = 'inline-block';
    portBandwidthInputElementLab.style.display = 'inline-block';
    portStructSelectElement.style.display = 'none';
    portStructSelectElementLab.style.display = 'none';
    portPackageSelectElement.style.display = 'none';
    portPackageSelectElementLab.style.display = 'none';
    //portStructSelectPartsElementLab.style.display = 'none';
    //portStructSelectPartsElement.style.display = 'none';
  }

  public customPortModulePropertiesChecked() {
    const portBandwidthInputElement = document.getElementById('panelInnerPBandwidthInput');
    const portBandwidthInputElementLab = document.getElementById('panelInnerPBandwidthInputLabel');
    const portStructSelectElement = document.getElementById('panelInnerPStruct');
    const portStructSelectElementLab = document.getElementById('panelInnerPStructLabel');
   //const portStructSelectPartsElement = document.getElementById('panelInnerPStructParts');
   //const portStructSelectPartsElementLab = document.getElementById('panelInnerPStructPartsLabel');
    const portPackageSelectElement = document.getElementById('panelInnerPPackage');
    const portPackageSelectElementLab = document.getElementById('panelInnerPPackageLabel');
    portBandwidthInputElement.style.display = 'none';
    portBandwidthInputElementLab.style.display = 'none';
    portStructSelectElement.style.display = 'inline-block';
    portStructSelectElementLab.style.display = 'inline-block';
    portPackageSelectElement.style.display = 'inline-block';
    portPackageSelectElementLab.style.display = 'inline-block';
    //portStructSelectPartsElementLab.style.display = 'inline-block';
    //portStructSelectPartsElement.style.display = 'inline-block';
  }

  /*public checkInputStateForNewModule(mName: string, iName: string): void {
    //this.textCheckNewModule = !(mName !== '' && iName !== '');
  }*/

  /*public checkInputStateFowNewPort(pName: string, pBandwidth: string): void {
    //this.textCheckNewPort = !(pName !== '' && pBandwidth !== '');
  }*/

  public onModalWindowSubmitClickedNewModule(mName: string, iName: string) {
    const newModule: Module = new Module({
      id: null,
      name: mName,
      instance: iName,
      position: null,
    });
    
    this.onSubmittedNewModule(newModule);
  }

  public onModalWindowSubmitClickedLoadModuleFromCode(goalFileName: string, moduleInstance: string) {
    const newModule: Module = new Module({
      id: null,
      name: goalFileName,
      docId: goalFileName,
      instance: moduleInstance,
      position: null
    });
    this.onSubmittedExistingModule(newModule);
  }

  public async onModalWindowSubmitClickedImportPackage(goalFileName: string) {
    //this.onSubmittedExistingModule(newModule);
    const fileRef: RepoFileReference = {
      name: goalFileName,
      length: null,
      parentModuleInstance: "abc"
    };
    const code = await this.diaGenComponent.getFileBody(fileRef);
    const sourceCode: SourceCode = {
      body: {
        sourceCode: code
      }
    };
  }

  public onModalWindowSubmitClickedNewPort(pName: string, pBandwidth: number, pDirection: string, pDataPackage: string, pDataType: string, pDataTypeSubtype: string,) {
    /*let modal;
    
    if (pDirection === 'in')
      modal = document.getElementById('modalNewStandalonePortIn');
    else
      modal = document.getElementById('modalNewStandalonePortOut');
    
      modal.style.display = 'none';
    */
    let bandwidth = 1;
    let struct = null;
    let bitChecked = pDirection === 'in' ? (document.getElementById('panelStandAlonePBitRadio') as HTMLInputElement).checked : (document.getElementById('panelStandAlonePBitRadioOut') as HTMLInputElement).checked;
    let structChecked = pDirection === 'in' ? (document.getElementById('panelStandAlonePStructRadio') as HTMLInputElement).checked : (document.getElementById('panelStandAlonePStructRadioOut') as HTMLInputElement).checked;

    if (bitChecked) {
      bandwidth = 1;
    } else if (structChecked) {
      if(pDataTypeSubtype != "All parts"){
        struct = pDataTypeSubtype
      }
      else{
        struct = pDataType;
        console.log(pDataPackage)
        var foundPackage = this.availablePackageFiles.find(element => element.name == pDataPackage)
        var isImported = this.paper.usedPackages.find(element => element == foundPackage.displayName)
        if(isImported == undefined){
          console.log(foundPackage)
          this.paper.usedPackages.push(foundPackage.displayName)
        }
      }
      bandwidth = null;
    } else {
      bandwidth = pBandwidth;
    }

    if (pDirection === 'in') {
      pDirection = 'out';
    } else {
      pDirection = 'in';
    }

    const newPort: Port = {
      parentElementId: null,
      parentElementPosition: null,
      id: pName,
      name: pName,
      bandwidth,
      direction: pDirection,
      standalone: true,
      bit: bitChecked,
      struct
    };

    this.onSubmittedNewPort(newPort)
  }
  //



  public onModalWindowSubmitClickedNewOrCustomPorts(orBandwidth: number, orName: string, orNumberOfInPorts: number) {
    let bandwidth;
    if ((document.getElementById('panelORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = orBandwidth;
    }
    const newOrCustomPorts: OrCustomPorts = {
      name: orName,
      id: null,
      position: null,
      bandwidth,
      inPorts: orNumberOfInPorts,
      addingFromParsedCode:false,
    };
    this.onSubmittedNewOrCustomPorts(newOrCustomPorts)
  }

  public onModalWindowSubmitClickedNewAndCustomPorts(andBandwidth: number, andName: string, andNumberOfInPorts: number) {
    let bandwidth;
    if ((document.getElementById('panelANDCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = andBandwidth;
    }
    const newAndCustomPorts: AndCustomPorts = {
      name: andName,
      id: null,
      position: null,
      bandwidth,
      inPorts: andNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.onSubmittedNewAndCustomPorts(newAndCustomPorts)
  }

  public onModalWindowSubmitClickedNewNorCustomPorts(norBandwidth: number, norName: string, norNumberOfInPorts: number) {
    let bandwidth;
    if ((document.getElementById('panelNORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = norBandwidth;
    }
    const newNorCustomPorts: NorCustomPorts = {
      name: norName,
      id: null,
      position: null,
      bandwidth,
      inPorts: norNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.onSubmittedNewNorCustomPorts(newNorCustomPorts)
  }

  public onModalWindowSubmitClickedNewNandCustomPorts(nandBandwidth: number, nandName: string, nandNumberOfInPorts: number) {
    let bandwidth;
    if ((document.getElementById('panelNANDCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = nandBandwidth;
    }
    const newNandCustomPorts: NandCustomPorts = {
      name: nandName,
      id: null,
      position: null,
      bandwidth,
      inPorts: nandNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.onSubmittedNewNandCustomPorts(newNandCustomPorts)
  }

  public onModalWindowSubmitClickedNewXorCustomPorts(xorBandwidth: number, xorName: string, xorNumberOfInPorts: number) {
    let bandwidth;
    if ((document.getElementById('panelXORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = xorBandwidth;
    }
    const newXorCustomPorts: XorCustomPorts = {
      name: xorName,
      id: null,
      position: null,
      bandwidth,
      inPorts: xorNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.onSubmittedNewXorCustomPorts(newXorCustomPorts)
    }

  public onModalWindowSubmitClickedNewXnorCustomPorts(xnorBandwidth: number, xnorName: string, xnorNumberOfInPorts: number) {
    let bandwidth;
    if ((document.getElementById('panelXNORCustomPortsGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = xnorBandwidth;
    }
    const newXnorCustomPorts: XnorCustomPorts = {
      name: xnorName,
      id: null,
      position: null,
      bandwidth,
      inPorts: xnorNumberOfInPorts,
      addingFromParsedCode: false,
    };
    this.onSubmittedNewXnorCustomPorts(newXnorCustomPorts)
  }

  public onModalWindowSubmitClickedNewNot(notBandwidth: number, notName: string) {
    let bandwidth;
    if ((document.getElementById('panelNOTGBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else {
      bandwidth = notBandwidth;
    }
    const newNot: Not = {
      name: notName,
      id: null,
      position: null,
      bandwidth,
      addingFromParsedCode: false,
    };
    this.onSubmittedNewNot(newNot)
  }

  public onModalWindowSubmitClickedNewMULTIPLEXOR(
    mulDataBitRad: boolean, mulDatVectorRad: boolean, mulDatStructRad: boolean, mulDatBandwidth: number,mulDataPackage: string,
    mulDatStruct: string, mulDataStructParts: string,
    mulName: string, mulTypeTwo: boolean, mulTypeFour: boolean, mulTypeEight: boolean) {
    const modal = document.getElementById('modalNewMultiplexor');
    modal.style.display = 'none';
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

    if (mulTypeTwo) {
      // if it is supposed to be 2-to-1, create only one sel input
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
      //if (mulSelBitRad) {
        selPort.bit = true;
        selPort.bandwidth = 1;
        selPort.struct = null;
      /* } else if (mulSelVectorRad) {
        selPort.bit = false;
        selPort.bandwidth = mulSelBandiwdth;
        selPort.struct = null;
        keyIndex = 0;
      } */
      selPort.direction = 'sel';
      selPort.id = null;
      selPort.standalone = false;
      selPort.parentElementId = null;
      selPorts.push(selPort);
    } else if (mulTypeFour || mulTypeEight) {
      // multiple sel inputs for 4-to-1, 8-to-1
      const mulSelMultiplicity = mulTypeFour ? 2 : 3;
      //for (let i = 0; i < mulSelMultiplicity; i++) {
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
        selPort.bit = false;
        selPort.bandwidth = mulSelMultiplicity;
        selPort.struct = null;
        selPort.direction = 'sel';
        selPort.id = null;
        selPort.standalone = false;
        selPort.parentElementId = null;
        selPorts.push(selPort);
      //}
    }

    // datatype of input lines
    if (mulDataBitRad) {
      dataPort.bit = true;
      dataPort.bandwidth = 1;
      dataPort.struct = null;
    } else if (mulDatVectorRad) {
      dataPort.bit = false;
      dataPort.bandwidth = mulDatBandwidth;
      dataPort.struct = null;
    } else if (mulDatStructRad) {
      dataPort.bit = false;
      dataPort.bandwidth = null;
      if(mulDataStructParts == "All parts"){
        dataPort.struct = mulDatStruct;
        var foundPackage = this.availablePackageFiles.find(element => element.name == mulDataPackage)
        var isImported = this.paper.usedPackages.find(element => element == foundPackage.displayName)
        if(isImported == undefined){
          this.paper.usedPackages.push(foundPackage.displayName)
        }
      }
      else{
        dataPort.struct = mulDataStructParts
      }
      
    }

    // input lines
    dataPort.direction = 'in';
    dataPort.id = null;
    dataPort.standalone = false;
    dataPort.parentElementId = null;

    // the number of input lines
    let mulDataMultiplicity = 2;
    if (mulTypeFour) mulDataMultiplicity = 4
    if (mulTypeEight) mulDataMultiplicity = 8

    for (let j = 0; j < mulDataMultiplicity; j++) {
      dataPorts.push(dataPort);
    }

    const newMultiplexor: Multiplexor = {
      name: mulName,
      id: null,
      position: null,
      struct: dataPort.struct,
      selPorts,
      dataPorts,
      dataBandwidth: dataPort.bandwidth,
      selBandwidth: selPorts[0].bandwidth,
      keyIndex
    };

    this.onSubmittedNewMultiplexor(newMultiplexor);
  }

  public onModalWindowSubmitClickedNewDECODER(decoderDataBandwidth: number, decodEnable: boolean, decoderInstanceName: string) {
    var decoderOutSingle = true
    const decoder: Decoder = {
      id: null,
      name: decoderInstanceName,
      position: null,
      outSingle: decoderOutSingle ? decoderOutSingle : false,
      dataBandwidth: decoderDataBandwidth,
      enable: decodEnable
    };
    this.onSubmittedNewDecoder(decoder);
  }

  public onModalWindowSubmitClickedNewENCODER(encoderDataBandwidth: number, encoderInstanceName: string) {
    
    const encoder: Encoder = {
      id: null,
      name: encoderInstanceName,
      position: null,
      dataBandwidth: encoderDataBandwidth
    };
    this.onSubmittedNewEncoder(encoder);
  }

  public onModalWindowSubmitClickedNewAdder(adderDataBandwidth: number, adderInstanceName: string) {
    const adder: Adder = {
      id: null,
      name: adderInstanceName,
      position: null,
      dataBandwidth: adderDataBandwidth,
      half: true,
      addingFromParsedCode:false
    };
    this.onSubmittedNewAdder(adder);
  }

  public onModalWindowSubmitClickedNewSubtractor(subtractorDataBandwidth: number, subtractorInstanceName: string) {
    const subtractor: Subtractor = {
      id: null,
      name: subtractorInstanceName,
      position: null,
      dataBandwidth: subtractorDataBandwidth,
      addingFromParsedCode:false
    };
    this.onSubmittedNewSubtractor(subtractor);
  }

  public onModalWindowSubmitClickedNewComparator(comparatorDataBandwidth: number, comparatorInstanceName: string, comparatorType: string) {
    if(comparatorType == "="){
      comparatorType = "=="
    }
    const comparator: Comparator = {
      id: null,
      name: comparatorInstanceName,
      position: null,
      dataBandwidth: comparatorDataBandwidth,
      type: comparatorType,
      addingFromParsedCode:false
    };
    this.onSubmittedNewComparator(comparator);
  }

  public onModalWindowSubmitClickedNewRegister(registerDataBandwidth: number, registerInstanceName: string,
    registerDataPackage: string, registerStruct: string, registerStructParts : string, enableChecked: boolean, resetChecked: boolean) {
    //const modalReg = document.getElementById('modalNewRegister');
    let bandwidth = null;
    let structValue = null;
    console.log(registerStruct)
    console.log("ideeeeeeeeeeeee")
    if ((document.getElementById('panelRegisterDataBitRadio') as HTMLInputElement).checked) {
      bandwidth = 1;
    } else if (registerStruct == ""){
      bandwidth = registerDataBandwidth;
    }
    if(registerStruct !== ""){
      console.log("tuuuuu")
      if(registerStructParts == "All parts"){
        structValue = registerStruct
        var foundPackage = this.availablePackageFiles.find(element => element.name == registerDataPackage)
        var isImported = this.paper.usedPackages.find(element => element == foundPackage.displayName)
        if(isImported == undefined){
          this.paper.usedPackages.push(foundPackage.displayName)
        }
      }
      else{
        structValue = registerStructParts
      }
    }
    //modalReg.style.display = 'none';
    const register: Register = {
      id: null,
      name: registerInstanceName,
      position: null,
      dataBandwidth: bandwidth,
      struct: structValue,
      enablePort: enableChecked,
      resetPort: resetChecked
    };
    console.log(register)
    
    this.onSubmittedNewRegister(register);
  }

  public onModalWindowSubmitClickedNewRam(ramInstanceName: string, ramAddrBandwidth: number, ramDataBandwidth: number, ramPackageName: string, ramStruct: string, ramStructPart: string, vectorChecked: boolean, structChecked: boolean) {
    //const modalReg = document.getElementById('modalNewRegister');
    let dataBandwidth = null;
    let usingdataStruct = false
    let struct = null
    if (vectorChecked) {
      dataBandwidth = ramDataBandwidth;
    }
    if(structChecked){
      if(ramStructPart == "All parts"){
        struct = ramStruct
        usingdataStruct = true
        var foundPackage = this.availablePackageFiles.find(element => element.name == ramPackageName)
        var isImported = this.paper.usedPackages.find(element => element == foundPackage.displayName)
        if(isImported == undefined){
          this.paper.usedPackages.push(foundPackage.displayName)
        }
      }
      else{
        struct = ramStructPart
        usingdataStruct = true
      }
    }

    //modalReg.style.display = 'none';
    const ram: Ram = {
      id: null,
      name: ramInstanceName,
      position: null,
      dataBandwidth: dataBandwidth,
      addressBandwidth: ramAddrBandwidth,
      isDataStruct: usingdataStruct,
      dataStruct: struct
    };
    
    this.onSubmittedNewRam(ram);
  }

  //

  public checkInputStateForNewModule(mName: string, iName: string): void {
    this.textCheckNewModule = !(mName !== '' && iName !== '');
  }

  public checkInputStateFowNewPort(pName: string, pBandwidth: string): void {
    this.textCheckNewPort = !(pName !== '' && pBandwidth !== '');
  }

  //for multiplexor custom bandwidth
  public setPackages(availablePackages: ParsedPackages) {
    this.availablePackages = availablePackages;
    this.packageDefines = availablePackages.items[0].package.dataTypes;
  }

  public async onDatatypeSelectChanged(event){
    this.packageDefines.forEach(item =>{
      if(item.dataName == event){
        this.packageDatatypeSubtypes = item.dataSubtypeNames
        if(this.packageDatatypeSubtypes[0] != "All parts"){
          this.packageDatatypeSubtypes.unshift("All parts");
        }
        
      }
    })
    
  }

  public async onPackageSelectChanged(event) {
    if(this.availablePackages.items !=undefined){
      var found = false
      this.availablePackages.items.forEach( async item =>  {
        if (item.package.name === event) {
          this.packageDefines = item.package.dataTypes;
          this.packageDatatypeSubtypes = item.package.dataTypes[0].dataSubtypeNames
          if(this.packageDatatypeSubtypes[0] != "All parts"){
            this.packageDatatypeSubtypes.unshift("All parts");
          }
          found = true
        }
        if(!found){
          //this.onSubmittedExistingModule(newModule);
          const fileRef: RepoFileReference = {
            name: event,
            length: null,
            parentModuleInstance: "abc"
          };
          const code = await this.diaGenComponent.getFileBody(fileRef);
          const sourceCode: SourceCode = {
            body: {
              sourceCode: code
            }
          };
          var parsedPackage: ParsedPackage
          var parsedPackage: ParsedPackage = {
            package:{
              name:"",
              dataTypes: []
            }
          }
          parsedPackage.package.name = event
          var source = sourceCode.body.sourceCode

          var typedefStart =source.indexOf("typedef ")
          var dataTypeEndDeclaration
          var dataNameDeclarationStart
          var dataNameDeclarationEnd
          while(typedefStart != -1){
            var packageItem: PackageItem = {
              dataName:"",
              dataType:"",
              dataSubtypeNames:[],
            }
            var packageItem: PackageItem
            source = source.substring(typedefStart+8)
            dataTypeEndDeclaration = source.indexOf(" ")
            packageItem.dataType = source.substring(0,dataTypeEndDeclaration)
            source = source.substring(dataTypeEndDeclaration+1)
            dataNameDeclarationStart = source.indexOf("} ")+2
            
            var sourceForSubTypes = source.substring(0,dataNameDeclarationStart)
            var subtypesStart = sourceForSubTypes.indexOf("{\n") + 2
            var subtypesEnd = sourceForSubTypes.indexOf("}")
            
            source = source.substring(dataNameDeclarationStart)
            dataNameDeclarationEnd = source.indexOf(";")
            packageItem.dataName = source.substring(0,dataNameDeclarationEnd)
            
            sourceForSubTypes = sourceForSubTypes.substring(subtypesStart,subtypesEnd)
            var subtypeDeclarationEnd = sourceForSubTypes.indexOf("\n") 
            while(subtypeDeclarationEnd != -1){
              var subtypeDeclaration = sourceForSubTypes.substring(0,subtypeDeclarationEnd-1)
              var subtypeNameStart = subtypeDeclaration.lastIndexOf(" ") +1
              var subtypeName = subtypeDeclaration.substring(subtypeNameStart) 
              if(subtypeName.endsWith(";") || subtypeName.endsWith(",")){
                subtypeName.slice(0,-1)
              }
              packageItem.dataSubtypeNames.push(packageItem.dataName + "." +subtypeName)
              sourceForSubTypes = sourceForSubTypes.substring(subtypeDeclarationEnd+1)
              subtypeDeclarationEnd = sourceForSubTypes.indexOf("\n")
            }

            var typedefStart =source.indexOf("typedef ")
            parsedPackage.package.dataTypes.push(packageItem)
          }
          this.availablePackages.items.push(parsedPackage)
          this.packageDefines = parsedPackage.package.dataTypes;
          this.packageDatatypeSubtypes = parsedPackage.package.dataTypes[0].dataSubtypeNames
          if(this.packageDatatypeSubtypes[0] != "All parts"){
            this.packageDatatypeSubtypes.unshift("All parts");
          }
        }

      });
    }
    else{
    const fileRef: RepoFileReference = {
      name: event,
      length: null,
      parentModuleInstance: "abc"
    };
    const code = await this.diaGenComponent.getFileBody(fileRef);
    const sourceCode: SourceCode = {
      body: {
        sourceCode: code
      }
    };
    var parsedPackage: ParsedPackage = {
      package:{
        name:"",
        dataTypes: []
      }
    }
    parsedPackage.package.name = event
    var source = sourceCode.body.sourceCode

    var typedefStart =source.indexOf("typedef ")
    var dataTypeEndDeclaration
    var dataNameDeclarationStart
    var dataNameDeclarationEnd
    while(typedefStart != -1){
      var packageItem: PackageItem = {
        dataName:"",
        dataType:"",
        dataSubtypeNames:[],
      }
      source = source.substring(typedefStart+8)
      dataTypeEndDeclaration = source.indexOf(" ")
      packageItem.dataType = source.substring(0,dataTypeEndDeclaration)
      source = source.substring(dataTypeEndDeclaration+1)
      dataNameDeclarationStart = source.indexOf("} ")+2

      var sourceForSubTypes = source.substring(0,dataNameDeclarationStart)
      var subtypesStart = sourceForSubTypes.indexOf("{\n") + 2
      var subtypesEnd = sourceForSubTypes.indexOf("}")


      source = source.substring(dataNameDeclarationStart)
      dataNameDeclarationEnd = source.indexOf(";")
      packageItem.dataName = source.substring(0,dataNameDeclarationEnd)

      sourceForSubTypes = sourceForSubTypes.substring(subtypesStart,subtypesEnd)
      var subtypeDeclarationEnd = sourceForSubTypes.indexOf("\n") 
      while(subtypeDeclarationEnd != -1){
        var subtypeDeclaration = sourceForSubTypes.substring(0,subtypeDeclarationEnd-1)
        var subtypeNameStart = subtypeDeclaration.lastIndexOf(" ") +1
        var subtypeName = subtypeDeclaration.substring(subtypeNameStart) 
        if(subtypeName.endsWith(";") || subtypeName.endsWith(",")){
          subtypeName.slice(0,-1)
        }
        packageItem.dataSubtypeNames.push(packageItem.dataName + "." +subtypeName)
        sourceForSubTypes = sourceForSubTypes.substring(subtypeDeclarationEnd+1)
        subtypeDeclarationEnd = sourceForSubTypes.indexOf("\n")
      }

      var typedefStart =source.indexOf("typedef ")
      parsedPackage.package.dataTypes.push(packageItem)
    }
    this.availablePackages = {
      items: []
    }
    this.availablePackages.items.push(parsedPackage)
    this.packageDefines = parsedPackage.package.dataTypes;
    this.packageDatatypeSubtypes = parsedPackage.package.dataTypes[0].dataSubtypeNames
    if(this.packageDatatypeSubtypes[0] != "All parts"){
      this.packageDatatypeSubtypes.unshift("All parts");
    }

    }
    
  }

  public onInnerPortSelectChanged(event) {
    this.availablePackages.items.forEach(item => {
      if (item.package.name === event) {
        this.packageDefines = item.package.dataTypes;
      }
    });
  }

  public addPortToModule(pName: string, portDirection: string, pBandwidth: number, callType: string, pPackageName: string, pStruct: string, pStructParts: string) {
    console.log(pStruct)
    console.log(pStructParts)
    if(pStruct != ""){
      if(pStructParts != "" && pStructParts != "All parts"){
        pStruct = pStructParts
      }
      else if(pStructParts != "" && pStructParts == "All parts"){
        var foundPackage = this.availablePackageFiles.find(element => element.name == pPackageName)
        var isImported = this.paper.usedPackages.find(element => element == foundPackage.displayName)
        if(isImported == undefined){
          this.paper.usedPackages.push(foundPackage.displayName)
        }  
      }
    }
    this.paper.addPortToModule(pName, portDirection, pBandwidth, callType, pStruct)
    var panel = document.getElementById('NewPortProperties')
    panel.style.display = 'none'
  }

}
