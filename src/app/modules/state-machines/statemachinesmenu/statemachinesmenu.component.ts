import {Component, OnInit, ViewChild} from '@angular/core';
import {DiagramPaperComponent} from '../diagram-paper/diagram-paper.component';
import {FormsComponent} from '../formsandwindows/forms.component';
import {
  SystemVerilogCodeGeneratorComponent
} from '../generate-systemverilog-code/systemverilog-code-generator.component';
import {State} from '../other-classes/state';
import {InputOutputTables} from '../input-output-tables/input-output-tables';
import {MatTableDataSource} from '@angular/material/table';
import {Outputs} from '../other-classes/Outputs';
import {Inputs} from '../other-classes/Inputs';
import {OutputAssignments} from '../other-classes/OutputAssignments';
import {FilesService} from '../../../core/fileSystem/Filer/files.service';
import {CollabService, documentTitle, getFileNameFromDocID} from '../../../core/service/collab.service';
import {RepositoryService} from '../../../core/service/repository.service';
import {ModalAlertComponent} from '../../../modal/modal-alert/modal-alert.component';
import {MatDialog} from '@angular/material/dialog';
import {RepoFileReference} from '../other-classes/repoFileReference';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {GenerateCodeFormsComponent} from '../generate-code-forms/generate-code-forms.component';
import {SystemVerilogGenData} from '../other-classes/systemVerilogGenData';
import {VhdlGenData} from '../other-classes/vhdlGenData';
import {VhdlCodeGeneratorComponent} from '../generate-vhdl-code/vhdl-code-generator';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {FileDialogModel, ModalFileNameComponent} from '../../../modal/modal-file-name/modal-file-name.component';
import {ModalConfirmComponent} from '../../../modal/modal-confirm/modal-confirm.component';
import {LoadXmlFileComponent} from '../load-xml-file/load-xml-file';
import {Signals} from '../other-classes/Signals';
import {Parameters} from '../other-classes/Parameters';
import {SignalAssignments} from '../other-classes/SignalAssignments';
import {
  GenerateDiagramFromSystemVerilogComponent
} from '../generate-diagram-from-code/generate-diagram-from-systemverilog';
import {GenerateDiagramFromVerilogComponent} from '../generate-diagram-from-code/generate-diagram-from-verilog';
import {GenerateDiagramFromVhdlComponent} from '../generate-diagram-from-code/generate-diagram-from-vhdl';
import {GenerateDiagramSchema} from '../other-classes/GenerateDiagramSchema';
import {GenerateStatePositionsComponent} from '../other-classes/generate-state-positions.component';
import {CollabState} from '../other-classes/collabState';
import {CollabTransition} from '../other-classes/collabTransition';
import * as joint from 'jointjs';
import {CollabJointJSTransition} from '../other-classes/collabJointJSTransition';
import {Repository} from '../../../api/models/repository';
import {Router} from '@angular/router';


@Component({
  selector: 'app-statemachinesmenu',
  templateUrl: './statemachinesmenu.component.html',
  styleUrls: ['./statemachinesmenu.component.scss'],
  providers: [FilesService, CollabJointJSTransition]
})

export class StateMachinesMenuComponent implements OnInit {

  @ViewChild(DiagramPaperComponent) public readonly paper: DiagramPaperComponent;
  @ViewChild(FormsComponent) public readonly forms: FormsComponent;
  @ViewChild(InputOutputTables) public readonly inputsAndOutputs: InputOutputTables;
  @ViewChild(SystemVerilogCodeGeneratorComponent)
  public readonly systemVerilogCodeGenerator: SystemVerilogCodeGeneratorComponent;
  @ViewChild(VhdlCodeGeneratorComponent)
  public readonly vhdlCodeGenerator: VhdlCodeGeneratorComponent;
  @ViewChild(GenerateCodeFormsComponent) public readonly codeGenForms: GenerateCodeFormsComponent;
  @ViewChild(LoadXmlFileComponent) public readonly loadXmlFile: LoadXmlFileComponent;
  @ViewChild(GenerateDiagramFromSystemVerilogComponent)
  public readonly generateDiagramFromSystemVerilog: GenerateDiagramFromSystemVerilogComponent;
  @ViewChild(GenerateDiagramFromVerilogComponent)
  public readonly generateDiagramFromVerilog: GenerateDiagramFromVerilogComponent;
  @ViewChild(GenerateDiagramFromVhdlComponent)
  public readonly generateDiagramFromVHDL: GenerateDiagramFromVhdlComponent;
  @ViewChild(GenerateStatePositionsComponent)
  public readonly generateStatePositions: GenerateStatePositionsComponent;

  public drawingMode: boolean = false;
  public isAnyWindowOpen: boolean = false;
  public repo: any;
  public dataSourceInputs: MatTableDataSource<Inputs> = new MatTableDataSource<Inputs>([]);
  public dataSourceOutputs: MatTableDataSource<Outputs> = new MatTableDataSource<Outputs>([]);
  public dataSourceSignals: MatTableDataSource<Signals> = new MatTableDataSource<Signals>([]);
  public dataSourceParameters: MatTableDataSource<Parameters>
    = new MatTableDataSource<Parameters>([]);
  public xmlFilename: string = '';
  public isStateUnique: boolean = false;
  public statesData: any;
  public transitionsData: any;
  public machineType: string;
  public isMachineTypeMoore: boolean = false;
  public isCodeToBeGeneratedVHDL: boolean = false;
  public availableBoards: { id: string, title: string }[] = [];
  public currentBoard: { id: string, title: string };
  public boardControl: FormControl = new FormControl('default');
  public boardSelection: FormGroup;
  private boardTitle: string = 'default';
  private fileName: string = '';
  private language: string = '';
  private stateID: number;
  private readonly visualisationDoc: any;

  constructor(
    public repoService: RepositoryService,
    private collabService: CollabService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private collabJointJSTransition: CollabJointJSTransition,
    private router: Router
  ) {
    this.stateID = 2;
    this.machineType = 'Mealy';
    this.boardSelection = formBuilder.group({
      boardControl: this.boardControl
    });

    const repo: Repository = this.repoService.currentRepo;
    this.visualisationDoc = collabService.getVisualisations(repo.uuid.toString());
    this.visualisationDoc.subscribe(() => {
      this.updateBoardSelection();
      this.visualisationDoc.on('op', () => {
        this.updateBoardSelection();
      });
    });
  }

  public get currentBoardTitle(): string {
    return this.availableBoards.find((board) => {
      return board.id === this.boardControl.value;
    }).title;
  }

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  public redirect(pagename: string): any {
    this.router.navigate(['/' + pagename]);
  }

  public onBoardSelected($event: any): void {
    this.dataSourceInputs = new MatTableDataSource<Inputs>([]);
    this.dataSourceOutputs = new MatTableDataSource<Outputs>([]);
    this.dataSourceSignals = new MatTableDataSource<Signals>([]);
    this.dataSourceParameters = new MatTableDataSource<Parameters>([]);
    for (const board of this.availableBoards) {
      if (board.id === $event) {
        this.boardTitle = board.title;
      }
    }
    this.paper.changeActiveBoard($event);
  }

  public addNewBoard(): void {
    this.isAnyWindowOpen = true;
    const dialogData: FileDialogModel = {
      title: 'New State Machines Board',
      message: 'Enter the name of the new state machines board',
      showAddedExtension: false,
      name: '',
      path: '',
      validator: () => true
    };
    this.dialog.open(ModalFileNameComponent, {
      data: dialogData
    }).afterClosed().subscribe(value => {
      if (value) {
        this.collabService.addVisualisationBoard(this.visualisationDoc,
          value, this.branch);
      }
      this.isAnyWindowOpen = false;
    });
  }

  public ngOnInit(): void {
    this.repo = this.repoService.currentRepo;
  }

  public onAddNewStateClicked(): void {
    const state: State = {name: 'State', id: this.stateID++, initial: false};
    this.paper.addNewState(state, this.drawingMode);
  }

  public onAddNewInitialStateClicked(): void {
    const state: State = {name: 'Initial_State', id: 1, initial: true};
    this.paper.addNewState(state, this.drawingMode);
  }

  public onSubmittedNewState(state: State): void {
    this.paper.addNewState(state, this.drawingMode);
  }

  public onDisplayInputTableClicked(): void {
    this.isAnyWindowOpen = true;
    this.inputsAndOutputs.displayInputTable();
  }

  public onDisplayOutputTableClicked(): void {
    this.isAnyWindowOpen = true;
    this.inputsAndOutputs.displayOutputTable();
  }

  public onDisplaySignalsTableClicked(): void {
    this.isAnyWindowOpen = true;
    this.inputsAndOutputs.displaySignalTable();
  }

  public onDisplayParametersTableClicked(): void {
    this.isAnyWindowOpen = true;
    this.inputsAndOutputs.displayParameterTable();
  }

  public onModeChange($event: MatSlideToggleChange): void {
    this.drawingMode = $event.checked;
    this.paper.changeMode($event.checked);
    const movingModeText: HTMLElement = document.getElementById('moving-mode');
    const movingModeIcon: HTMLElement = document.getElementById('moving-mode-icon');
    const drawingModeText: HTMLElement = document.getElementById('drawing-mode');
    const drawingModeIcon: HTMLElement = document.getElementById('drawing-mode-icon');
    if (!this.drawingMode) {
      movingModeText.style.fontWeight = 'bold';
      movingModeIcon.style.color = 'black';
      drawingModeText.style.fontWeight = 'normal';
      drawingModeIcon.style.color = 'grey';
    } else {
      movingModeText.style.fontWeight = 'normal';
      movingModeIcon.style.color = 'grey';
      drawingModeText.style.fontWeight = 'bold';
      drawingModeIcon.style.color = 'black';
    }
  }

  public showStatePropertiesWindow(state: any): void {
    const stateNames: string[] = this.paper.getAllStateNames(state.id);
    this.isAnyWindowOpen = true;
    this.forms.displayStatePropertiesWindow(state, this.machineType, stateNames);
  }

  public showTransitionPropertiesWindow(activeTransition: any): void {
    const sourceStateName: string = this.paper.getStateNameById(activeTransition.source.id);
    const targetStateName: string = this.paper.getStateNameById(activeTransition.target.id);
    this.isAnyWindowOpen = true;
    this.forms.displayTransitionPropertiesWindow(
      activeTransition,
      sourceStateName,
      targetStateName,
      this.machineType
    );
  }

  public onModifiedStateName(modifiedStateName: string): void {
    this.paper.updateStateName(modifiedStateName);
  }

  public onModifiedCondition(modifiedCondition: string): void {
    this.paper.updateCondition(modifiedCondition);
  }

  public onModifiedTransitionOutputs(outputAssignments: OutputAssignments[]): void {
    this.paper.updateTransitionOutputs(outputAssignments);
  }

  public onModifiedStateOutputs(outputAssignments: OutputAssignments[]): void {
    this.paper.updateStateOutputs(outputAssignments);
  }

  public onModifiedOutputSource(newOutputs: Outputs[]): void {
    this.paper.updateAllTransitionOutputs(newOutputs);
    this.paper.updateAllStateOutputs(newOutputs);
  }

  public onModifiedSignalSource(newSignals: Signals[]): void {
    this.paper.updateAllTransitionSignals(newSignals);
    this.paper.updateAllStateSignals(newSignals);
  }

  public onDisplaySaveWindowClicked(): void {
    this.isAnyWindowOpen = true;
    this.forms.displaySaveWindow(this.boardTitle);
  }

  public onConfirmedSaveOfDiagram(filename: string): void {
    this.xmlFilename = filename;
    let language: string;
    if (this.isCodeToBeGeneratedVHDL) {
      language = 'VHDL';
    } else {
      language = 'SystemVerilog';
    }
    this.paper.saveDiagramAsXML(filename, this.machineType, language);
  }

  public saveXmlFile(fileContent: string): void {
    this.collabService.resetConnection();
    const filePath: string = documentTitle(
      this.repo.uuid,
      'fsm/' + this.xmlFilename + '.fsm',
      this.repo.authorUUID,
      this.branch
    );
    this.collabService.createOrUpdateDocument(filePath, fileContent, this.repo.uuid, this.branch);
  }


  public onDisplayLoadWindowClicked(): void {
    this.isAnyWindowOpen = true;
    this.forms.displayLoadWindow();
  }

  public onDisplayGenerateDiagramClicked(): void {
    this.isAnyWindowOpen = true;
    this.forms.displayGenerateDiagramFromWindow();
  }

  public async onGivenDiagramKey(key: RepoFileReference): Promise<void> {
    const xmlContent: string = await this.getFileBody(key);
    this.paper.clearGraph();
    this.dataSourceInputs = new MatTableDataSource<Inputs>([]);
    this.dataSourceOutputs = new MatTableDataSource<Outputs>([]);
    this.dataSourceSignals = new MatTableDataSource<Signals>([]);
    this.dataSourceParameters = new MatTableDataSource<Parameters>([]);
    this.loadXmlFile.loadDiagramFromXml(xmlContent, this.drawingMode);
  }

  public async onGivenSourceCodeFileKey(key: RepoFileReference): Promise<void> {
    const fileContent: string = await this.getFileBody(key);
    let parsedCode: GenerateDiagramSchema;
    this.paper.clearGraph();
    this.dataSourceInputs = new MatTableDataSource<Inputs>([]);
    this.dataSourceOutputs = new MatTableDataSource<Outputs>([]);
    this.dataSourceSignals = new MatTableDataSource<Signals>([]);
    this.dataSourceParameters = new MatTableDataSource<Parameters>([]);
    if (key.displayName.endsWith('.sv')) {
      parsedCode = this.generateDiagramFromSystemVerilog.generateDiagramData(fileContent);
    } else if (key.displayName.endsWith('.v')) {
      parsedCode = this.generateDiagramFromVerilog.generateDiagramData(fileContent);
    } else if (key.displayName.endsWith('.vhd') || key.displayName.endsWith('.vhdl')) {
      parsedCode = this.generateDiagramFromVHDL.generateDiagramData(fileContent);
    }
    parsedCode = this.generateStatePositions.generatePositions(parsedCode);
    this.generateDiagramBasedOnParsedCode(parsedCode);
  }

  public onFilledStateNameValue(name: string): void {
    this.isStateUnique = this.paper.isThisStateUnique(name);
  }

  public onChangedMachineType($event: MatSlideToggleChange): void {
    const mealyText: HTMLElement = document.getElementById('mealy');
    const mooreText: HTMLElement = document.getElementById('moore');
    if ($event.checked) {
      this.isMachineTypeMoore = true;
      this.machineType = 'Moore';
      this.paper.changeMachineType('Moore');
      mealyText.style.fontWeight = 'normal';
      mooreText.style.fontWeight = 'bold';
    } else {
      this.isMachineTypeMoore = false;
      this.machineType = 'Mealy';
      this.paper.changeMachineType('Mealy');
      mealyText.style.fontWeight = 'bold';
      mooreText.style.fontWeight = 'normal';
    }
  }

  public onChangedCodeGenerateType($event: MatSlideToggleChange): void {
    const vorsvText: HTMLElement = document.getElementById('VorSV');
    const vhdlText: HTMLElement = document.getElementById('VHDL');
    if ($event.checked) {
      this.isCodeToBeGeneratedVHDL = true;
      vorsvText.style.fontWeight = 'normal';
      vhdlText.style.fontWeight = 'bold';
      this.paper.updateLanguage('VHDL');
    } else {
      this.isCodeToBeGeneratedVHDL = false;
      vorsvText.style.fontWeight = 'bold';
      vhdlText.style.fontWeight = 'normal';
      this.paper.updateLanguage('SystemVerilog');
    }
  }

  public onGenerateSystemVerilogCodeClicked(): void {
    this.statesData = this.paper.getAllStates();
    this.transitionsData = this.paper.getAllTransitions();
    this.isAnyWindowOpen = true;
    this.codeGenForms.displayGenerateSystemVerilogCodeForm(this.machineType, this.boardTitle);
  }

  public onGenerateVhdlCodeClicked(): void {
    this.statesData = this.paper.getAllStates();
    this.transitionsData = this.paper.getAllTransitions();
    this.isAnyWindowOpen = true;
    this.codeGenForms.displayGenerateVhdlCodeForm(this.machineType, this.boardTitle);
  }

  public onGenerateVerilogCodeClicked(): void {
    this.statesData = this.paper.getAllStates();
    this.transitionsData = this.paper.getAllTransitions();
    this.isAnyWindowOpen = true;
    this.codeGenForms.displayGenerateVerilogCodeForm(this.machineType, this.boardTitle);
  }

  public onVhdlCodeFormSubmitted(codeProperties: VhdlGenData): void {
    this.language = 'VHDL';
    this.fileName = codeProperties.entityName;
    if (this.checkCodeGenerationConstraints()) {
      this.vhdlCodeGenerator.generateCode(
        codeProperties,
        this.statesData,
        this.transitionsData,
        this.dataSourceInputs,
        this.dataSourceOutputs,
        this.dataSourceSignals,
        this.dataSourceParameters,
        this.machineType
      );
    }
  }

  public displayGeneratedCode(code: string): void {
    this.collabService.resetConnection();
    let path: string;
    if (this.language === 'VHDL') {
      path = 'src/' + this.fileName + '.vhd';
    } else if (this.language === 'Verilog') {
      path = 'src/' + this.fileName + '.v';
    } else if (this.language === 'SystemVerilog') {
      path = 'src/' + this.fileName + '.sv';
    }
    const filePath: string = documentTitle(this.repo.uuid, path, this.repo.authorUUID, this.branch);
    this.collabService.createOrUpdateDocument(filePath, code, this.repo.uuid, this.branch);
  }

  public onSystemVerilogCodeFormSubmitted(codeProperties: SystemVerilogGenData): void {
    this.fileName = codeProperties.moduleName;
    if (codeProperties.language === 'Verilog') {
      this.language = 'Verilog';
    } else {
      this.language = 'SystemVerilog';
    }
    if (this.checkCodeGenerationConstraints()) {
      this.systemVerilogCodeGenerator.generateCode(
        codeProperties,
        this.statesData,
        this.transitionsData,
        this.dataSourceInputs,
        this.dataSourceOutputs,
        this.dataSourceSignals,
        this.dataSourceParameters,
        this.machineType
      );
    }
  }

  public renameBoard(): void {
    const dialogData: FileDialogModel = {
      title: 'Rename state machines board',
      message: 'Enter the name of the new state machines board',
      showAddedExtension: false,
      name: this.currentBoardTitle,
      path: '',
      validator: () => true
    };
    this.dialog.open(ModalFileNameComponent, {
      data: dialogData
    }).afterClosed().subscribe(value => {
      if (value) {
        this.collabService.renameVisualisationBoard(this.visualisationDoc,
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
        this.collabService.removeVisualisationBoard(this.visualisationDoc,
          this.boardControl.value, this.branch);
      }
    });
  }

  public loadLanguage(language: string): void {
    const vorsvText: HTMLElement = document.getElementById('VorSV');
    const vhdlText: HTMLElement = document.getElementById('VHDL');
    if (language === 'VHDL') {
      this.isCodeToBeGeneratedVHDL = true;
      vorsvText.style.fontWeight = 'normal';
      vhdlText.style.fontWeight = 'bold';
      this.paper.updateLanguage('VHDL');
    } else if (language === 'SystemVerilog') {
      this.isCodeToBeGeneratedVHDL = false;
      vorsvText.style.fontWeight = 'bold';
      vhdlText.style.fontWeight = 'normal';
      this.paper.updateLanguage('SystemVerilog');
    }
    this.paper.updateLanguage(language);
  }

  public onModifiedTableSources(tablesModified: boolean): void {
    if (tablesModified) {
      this.paper.findEmptyCell(
        this.machineType,
        this.drawingMode,
        this.isCodeToBeGeneratedVHDL ? 'VHDL' : 'SystemVerilog',
        this.dataSourceInputs.data,
        this.dataSourceOutputs.data,
        this.dataSourceSignals.data,
        this.dataSourceParameters.data
      );
    }
  }

  public loadInputs(inputs: any): void {
    this.dataSourceInputs.data = inputs;
  }

  public loadOutputs(outputs: any): void {
    this.dataSourceOutputs.data = outputs;
  }

  public loadSignals(signals: any): void {
    this.dataSourceSignals.data = signals;
  }

  public loadParameters(parameters: any): void {
    this.dataSourceParameters.data = parameters;
  }

  public loadMachineType(machineType: string): void {
    const mealyText: HTMLElement = document.getElementById('mealy');
    const mooreText: HTMLElement = document.getElementById('moore');
    if (machineType === 'Moore') {
      this.isMachineTypeMoore = true;
      this.machineType = 'Moore';
      this.paper.changeMachineType('Moore');
      mealyText.style.fontWeight = 'normal';
      mooreText.style.fontWeight = 'bold';
    } else {
      this.isMachineTypeMoore = false;
      this.machineType = 'Mealy';
      this.paper.changeMachineType('Mealy');
      mealyText.style.fontWeight = 'bold';
      mooreText.style.fontWeight = 'normal';
    }
  }

  public loadDrawingMode(drawingMode: boolean): void {
    this.drawingMode = drawingMode;
    const movingModeText: HTMLElement = document.getElementById('moving-mode');
    const movingModeIcon: HTMLElement = document.getElementById('moving-mode-icon');
    const drawingModeText: HTMLElement = document.getElementById('drawing-mode');
    const drawingModeIcon: HTMLElement = document.getElementById('drawing-mode-icon');
    if (!this.drawingMode) {
      movingModeText.style.fontWeight = 'bold';
      movingModeIcon.style.color = 'black';
      drawingModeText.style.fontWeight = 'normal';
      drawingModeIcon.style.color = 'grey';
    } else {
      movingModeText.style.fontWeight = 'normal';
      movingModeIcon.style.color = 'grey';
      drawingModeText.style.fontWeight = 'bold';
      drawingModeIcon.style.color = 'black';
    }
  }

  public onModifiedTransitionSignals(signalAssignments: SignalAssignments[]): void {
    this.paper.updateTransitionSignals(signalAssignments);
  }

  public onModifiedStateSignals(signalAssignments: SignalAssignments[]): void {
    this.paper.updateStateSignals(signalAssignments);
  }

  public changeWindowsOpenStatus(value: boolean): void {
    this.isAnyWindowOpen = value;
  }

  private checkCodeGenerationConstraints(): boolean {
    const config: MatSnackBarConfig<any> = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = ['snackbar'];
    if (this.dataSourceInputs.data.length < 1 || this.dataSourceOutputs.data.length < 1) {
      this.snackBar.open(
        'Cannot generate code with less than one input or output',
        'OK',
        config
      );
      return false;
    } else if (this.paper.isInitialStateInsertable()) {
      this.snackBar.open(
        'Cannot generate code without an initial state',
        'OK',
        config
      );
      return false;
    } else if (this.paper.countNumberOfStates() < 2) {
      this.snackBar.open(
        'Cannot generate code with less than 2 states',
        'OK',
        config
      );
      return false;
    } else if (!this.paper.areAllStateNamesUnique()) {
      this.snackBar.open(
        'All state names must be unique',
        'OK',
        config
      );
    } else if (this.paper.getAllTransitions().length === 0) {
      this.snackBar.open(
        'Cannot generate code because diagram is missing transitions',
        'OK',
        config
      );
    } else if (this.paper.findIsolatedState() !== '') {
      this.snackBar.open(
        'Cannot generate code because state ' + this.paper.findIsolatedState() + ' is isolated',
        'OK',
        config
      );
    } else if (!this.paper.findIncorrectConditionsBasedOnCode(this.language)) {
      this.snackBar.open(
        'Cannot generate code because transitions contain expressions that failed to meet syntax check of ' + this.language,
        'OK',
        config
      );
    } else {
      return true;
    }
  }

  public generateDiagramBasedOnDataGatheredFromXML(schema: GenerateDiagramSchema): void {
    this.paper.createNewEmptyCell(
      schema.machineType,
      this.drawingMode,
      schema.language,
      [],
      [],
      [],
      []
    );
    if (schema.inputs.length !== 0) {
      this.dataSourceInputs = new MatTableDataSource<Inputs>(schema.inputs);
      this.paper.updateEmptyCellInputs(schema.inputs);
    }
    if (schema.outputs.length !== 0) {
      this.dataSourceOutputs = new MatTableDataSource<Outputs>(schema.outputs);
      this.paper.updateEmptyCellOutputs(schema.outputs);
    }
    if (schema.signals.length !== 0) {
      this.dataSourceSignals = new MatTableDataSource<Signals>(schema.signals);
      this.paper.updateEmptyCellSignals(schema.signals);
    }
    if (schema.parameters.length !== 0) {
      this.dataSourceParameters = new MatTableDataSource<Parameters>(schema.parameters);
      this.paper.updateEmptyCellParameters(schema.parameters);
    }
    if (schema.states.length !== 0) {
      for (const state of schema.states) {
        const newState: CollabState = {
          name: state.name,
          uniqueId: state.uniqueId,
          id: state.id,
          initial: state.initial,
          outputs: state.outputs,
          signals: state.signals,
          position: state.position
        };
        this.paper.createNewStateWithSpecifiedAttributes(newState, this.drawingMode);
      }
    }
    if (schema.transitions.length !== 0) {
      for (const transition of schema.transitions) {
        if (transition.source !== null && transition.target !== null) {
          const newTransition: CollabTransition = {
            source: this.paper.getStateBasedOnId(transition.source),
            target: this.paper.getStateBasedOnId(transition.target),
            condition: transition.condition,
            id: transition.id,
            outputs: transition.outputs,
            signals: transition.signals,
            vertices: transition.vertices
          };
          const preparedTransition: joint.shapes.standard.Link =
            this.collabJointJSTransition.insertCollabTransition(newTransition);
          this.paper.addLinkToGraph(preparedTransition);
        }
      }
    }
    this.loadMachineType(schema.machineType);
    this.loadLanguage(schema.language);
  }

  private generateDiagramBasedOnParsedCode(parsedCode: GenerateDiagramSchema): void {
    this.paper.createNewEmptyCell(
      parsedCode.machineType,
      this.drawingMode,
      parsedCode.language,
      [],
      [],
      [],
      []
    );
    if (parsedCode.inputs.length !== 0) {
      this.dataSourceInputs = new MatTableDataSource<Inputs>(parsedCode.inputs);
      this.paper.updateEmptyCellInputs(parsedCode.inputs);
    }
    if (parsedCode.outputs.length !== 0) {
      this.dataSourceOutputs = new MatTableDataSource<Outputs>(parsedCode.outputs);
      this.paper.updateEmptyCellOutputs(parsedCode.outputs);
    }
    if (parsedCode.signals.length !== 0) {
      this.dataSourceSignals = new MatTableDataSource<Signals>(parsedCode.signals);
      this.paper.updateEmptyCellSignals(parsedCode.signals);
    }
    if (parsedCode.parameters.length !== 0) {
      this.dataSourceParameters = new MatTableDataSource<Parameters>(parsedCode.parameters);
      this.paper.updateEmptyCellParameters(parsedCode.parameters);
    }
    if (parsedCode.states.length !== 0) {
      for (const state of parsedCode.states) {
        const newState: CollabState = {
          name: state.name,
          uniqueId: state.uniqueId,
          id: state.id,
          initial: state.initial,
          outputs: state.outputs,
          signals: state.signals,
          position: state.position
        };
        this.paper.createNewStateWithSpecifiedAttributes(newState, this.drawingMode);
      }
    }
    if (parsedCode.transitions.length !== 0) {
      for (const transition of parsedCode.transitions) {
        const sourceID: joint.shapes.standard.Ellipse =
          this.paper.getStateBasedOnName(transition.source);
        const targetID: joint.shapes.standard.Ellipse =
          this.paper.getStateBasedOnName(transition.target);
        if (sourceID !== null && targetID !== null) {
          const newTransition: CollabTransition = {
            source: sourceID,
            target: targetID,
            condition: transition.condition,
            id: transition.id,
            outputs: transition.outputs,
            signals: transition.signals,
            vertices: transition.vertices
          };
          const preparedTransition: joint.shapes.standard.Link =
            this.collabJointJSTransition.insertCollabTransition(newTransition);
          this.paper.addLinkToGraph(preparedTransition);
        }
      }
    }
    this.loadMachineType(parsedCode.machineType);
    this.loadLanguage(parsedCode.language);
  }

  private async getFileBody(fileReference: RepoFileReference): Promise<string> {
    try {
      return await this.collabService.getDocContents(fileReference.name);
    } catch (e) {
      this.dialog.open(ModalAlertComponent, {
        data: {
          title: 'Diagram couldn\'t be loaded.',
          message: `Diagram could not be loaded, because a file is missing:
            ${getFileNameFromDocID(e)}`
        }
      });
    }
  }

  private updateBoardSelection(): void {
    let currentWasDeleted: boolean = true;
    try {
      this.availableBoards = [];
      for (const [key, board] of Object.entries(this.visualisationDoc.data[this.branch])) {
        this.availableBoards.push({id: key, title: board['title']});
        if (key === this.boardControl.value) {
          currentWasDeleted = false;
        }
      }
      if (currentWasDeleted) {
        this.snackBar.open('This board has been deleted. Redirecting to default board.',
        'OK', {duration: 3000});
        this.boardControl.setValue('default');
        this.boardSelection.updateValueAndValidity();
      }
      this.currentBoard = this.currentBoard || this.availableBoards[0];
    } catch (e) {
      console.warn(e);
      this.availableBoards = this.availableBoards || [];
    }
  }
}
