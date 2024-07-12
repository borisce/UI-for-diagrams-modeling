import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {State} from '../other-classes/state';
import {MatTableDataSource} from '@angular/material/table';
import {OutputAssignments} from '../other-classes/OutputAssignments';
import {FilesService} from '../../../core/fileSystem/Filer/files.service';
import {RepositoryService} from '../../../core/service/repository.service';
import {RepoFileReference} from '../other-classes/repoFileReference';
import {Outputs} from '../other-classes/Outputs';
import {Inputs} from '../other-classes/Inputs';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ɵFormGroupRawValue,
  ɵGetProperty,
  ɵTypedOrUntyped
} from '@angular/forms';
import {CollabService, getFileNameFromDocID} from '../../../core/service/collab.service';
import {SignalAssignments} from '../other-classes/SignalAssignments';
import {Keywords} from '../other-classes/Keywords';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Signals} from '../other-classes/Signals';
import {Parameters} from '../other-classes/Parameters';
import {TestCondition, TestConditionVHDL} from '../other-classes/TestCondition';
import {ANTLRErrorListener, ANTLRInputStream, CommonTokenStream, Recognizer} from 'antlr4ts';
import {SystemVerilogLexer} from '../generate-diagram-from-code/systemverilog/ANTLR/SystemVerilogLexer';
import {SystemVerilogParser} from '../generate-diagram-from-code/systemverilog/ANTLR/SystemVerilogParser';
import {Token} from 'antlr4ts/Token';
import {vhdlLexer} from '../../visualization/components/diagram-generation/vhdl/ANTLR/vhdlLexer';
import {vhdlParser} from '../../visualization/components/diagram-generation/vhdl/ANTLR/vhdlParser';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  providers: [FilesService]
})

export class FormsComponent implements OnInit {

  public myControl: FormControl<string | null> = new FormControl('');
  @Input() public isInitialStateAddable: boolean;
  @Input() public isThisStateUnique: boolean;
  @Input() public dataOutputSource: MatTableDataSource<Outputs>;
  @Input() public dataInputSource: MatTableDataSource<Inputs>;
  @Input() public dataSignalSource: MatTableDataSource<Signals>;
  @Input() public dataParameterSource: MatTableDataSource<Parameters>;
  @Input() public isLanguageVHDL: boolean;
  @Output() public areAnyWindowsOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public newStateAdded: EventEmitter<State> = new EventEmitter<State>();
  @Output() public newStateName: EventEmitter<string> = new EventEmitter<string>();
  @Output() public newCondition: EventEmitter<string> = new EventEmitter<string>();
  @Output() public modifiedTransitionOutputValues: EventEmitter<OutputAssignments[]>
    = new EventEmitter<OutputAssignments[]>();
  @Output() public modifiedTransitionSignalValues: EventEmitter<SignalAssignments[]>
    = new EventEmitter<SignalAssignments[]>();
  @Output() public modifiedStateOutputValues: EventEmitter<OutputAssignments[]>
    = new EventEmitter<OutputAssignments[]>();
  @Output() public modifiedStateSignalValues: EventEmitter<SignalAssignments[]>
    = new EventEmitter<SignalAssignments[]>();
  @Output() public newSaveDiagramAs: EventEmitter<string> = new EventEmitter<string>();
  @Output() public diagramKey: EventEmitter<RepoFileReference>
    = new EventEmitter<RepoFileReference>();
  @Output() public sourceCodeFileKey: EventEmitter<RepoFileReference> =
    new EventEmitter<RepoFileReference>();
  @Output() public stateName: EventEmitter<string> = new EventEmitter<string>();
  @Output() public generateCodeInfo: EventEmitter<any> = new EventEmitter<any>();
  public repo: any;
  public xmlFiles: RepoFileReference[];
  public sourceCodeFiles: RepoFileReference[];
  public stateMachineType: string;
  /*State Form Data*/
  public stateType: string = '';
  public displayedStateName: string = '';
  public statePropertiesForm: FormGroup;
  public statePropertiesFormSubmitted: boolean = false;
  /*Transition Form Data*/
  public transitionCondition: string = '';
  public binaryNumber: string = '';
  public sourceState: string = '';
  public targetState: string = '';
  public transitionPropertiesForm: FormGroup;
  public transitionPropertiesFormSubmitted: boolean = false;
  /*Save/Load Forms*/
  public saveDiagramForm: FormGroup;
  /*State Form Data*/
  public loadDiagramForm: FormGroup;
  public generateDiagramFromCodeForm: FormGroup;
  public saveDiagramFormSubmitted: boolean = false;
  public loadDiagramFormSubmitted: boolean = false;
  public generateDiagramFromCodeFormSubmitted: boolean = false;
  /*Save/Load Forms */
  public errorMessage: string = '';
  public conditionErrorMessage: string = '';
  /*Transition Form Data*/
  public availableXmlFiles: string[] = [];
  public availableSourceCodeFiles: string[] = [];
  public availableColumns: string[] = ['name', 'bits', 'type', 'value'];
  public availableAssignmentTypes: string[] = ['Binary', 'Octal', 'Decimal', 'Hexadecimal'];
  public insertableElements: string[] = [];
  public filteredElements: Observable<string[]>;
  public title: string;
  public transitionOutputsData: MatTableDataSource<OutputAssignments> =
    new MatTableDataSource<OutputAssignments>([]);
  public transitionSignalsData: MatTableDataSource<SignalAssignments> =
    new MatTableDataSource<SignalAssignments>([]);
  public stateOutputsData: MatTableDataSource<OutputAssignments> =
    new MatTableDataSource<OutputAssignments>([]);
  public stateSignalsData: MatTableDataSource<SignalAssignments> =
    new MatTableDataSource<SignalAssignments>([]);
  public displayErrorMessage: boolean = false;
  private otherStateNames: string[] = [];
  private regularExpressions: {
    nameFormat: RegExp, containsBinaryValue: RegExp,
    containsOctalValue: RegExp, containsDecimalValue: RegExp, containsHexadecimalValue: RegExp
  } = {
    nameFormat: /^[A-Za-z][A-Za-z0-9_]*$/,
    containsBinaryValue: /^[0-1]*$/,
    containsOctalValue: /^[0-7]*$/,
    containsDecimalValue: /^[0-9]*$/,
    containsHexadecimalValue: /^[A-Fa-f0-9]*$/
  };

  constructor(
    public repoService: RepositoryService,
    private collabService: CollabService,
    private formBuilder: FormBuilder
  ) {}

  public get branch(): string {
    return localStorage.getItem('currentBranch') || 'master';
  }

  get statePropertiesControls(): ɵTypedOrUntyped<any, any,
    { [p: string]: AbstractControl<any> }> {
    return this.statePropertiesForm.controls;
  }

  get saveDiagramControls(): ɵTypedOrUntyped<any, any,
    { [p: string]: AbstractControl<any> }> {
    return this.saveDiagramForm.controls;
  }

  get xmlFile()
    : AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, 'xmlFile'>> {
    return this.loadDiagramForm.get('xmlFile');
  }

  get file()
    : AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, 'file'>> {
    return this.generateDiagramFromCodeForm.get('file');
  }

  public ngOnInit(): void {
    this.createForms();
    this.filteredElements = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this._filter(val || '')),
      );
  }

  public displayStatePropertiesWindow(state: any, machineType: string, stateNames: string[]): void {
    this.statePropertiesFormSubmitted = false;
    this.stateMachineType = machineType;
    this.statePropertiesForm.patchValue({displayedStateName: state.name});
    this.displayedStateName = state.name;
    this.otherStateNames = stateNames;
    this.statePropertiesForm.get('displayedStateName').setValue(this.displayedStateName);
    if (state.initial) {
      this.stateType = 'Initial State';
    } else {
      this.stateType = 'Regular State';
    }
    for (const output of state.outputs) {
      this.stateOutputsData.data.push({
        name: output.name,
        bits: output.bits,
        type: output.type,
        value: output.value
      });
      this.stateOutputsData._updateChangeSubscription();
    }
    for (const signal of state.signals) {
      this.stateSignalsData.data.push({
        name: signal.name,
        bits: signal.bits,
        type: signal.type,
        value: signal.value
      });
      this.stateSignalsData._updateChangeSubscription();
    }
    const statePropertiesForm: HTMLElement = document.getElementById('state-properties-form');
    statePropertiesForm.style.display = 'block';
  }

  public submitStateProperties(e: any): void {
    this.statePropertiesFormSubmitted = true;
    if (this.statePropertiesForm.invalid || !this.validateAssignments()) {
      return;
    } else {
      const statePropertiesForm: HTMLElement = document.getElementById('state-properties-form');
      statePropertiesForm.style.display = 'none';
      this.areAnyWindowsOpen.emit(false);
      this.newStateName.emit(e.target[0].value);
      this.modifiedStateOutputValues.emit(this.stateOutputsData.data);
      this.modifiedStateSignalValues.emit(this.stateSignalsData.data);
      this.stateOutputsData = new MatTableDataSource<OutputAssignments>([]);
      this.stateSignalsData = new MatTableDataSource<SignalAssignments>([]);
    }
  }

  public submitSaveDiagramData(e: any): void {
    this.saveDiagramFormSubmitted = true;
    if (this.saveDiagramForm.invalid) {
      return;
    } else {
      const saveDiagramForm: HTMLElement = document.getElementById('saveDiagram');
      saveDiagramForm.style.display = 'none';
      this.areAnyWindowsOpen.emit(false);
      this.newSaveDiagramAs.emit(e.target[0].value);
      this.saveDiagramForm.reset();
    }
  }

  public onCloseSaveDiagramButtonClicked(): void {
    const saveDiagramForm: HTMLElement = document.getElementById('saveDiagram');
    saveDiagramForm.style.display = 'none';
    this.areAnyWindowsOpen.emit(false);
    this.saveDiagramForm.reset();
  }

  public onCloseLoadDiagramWindowClicked(): void {
    const window: HTMLElement = document.getElementById('loadDiagram');
    window.style.display = 'none';
    this.areAnyWindowsOpen.emit(false);
    this.loadDiagramForm.reset();
  }

  public onCloseGenerateDiagramFromCodeWindowClicked(): void {
    const window: HTMLElement = document.getElementById('generateDiagramFromCode');
    window.style.display = 'none';
    this.areAnyWindowsOpen.emit(false);
    this.generateDiagramFromCodeForm.reset();
  }

  public submitLoadDiagramData(): void {
    this.loadDiagramFormSubmitted = true;
    if (this.loadDiagramForm.invalid) {
      return;
    } else {
      let chosenFile: any;
      for (const file of this.xmlFiles) {
        if (file.displayName === this.loadDiagramForm.value.xmlFile) {
          chosenFile = file;
          break;
        }
      }
      this.diagramKey.emit(chosenFile);
      const modal: HTMLElement = document.getElementById('loadDiagram');
      modal.style.display = 'none';
      this.areAnyWindowsOpen.emit(false);
      this.availableXmlFiles = [];
      this.loadDiagramForm.reset();
    }
  }

  public submitGenerateDiagramFromCodeData(): void {
    this.generateDiagramFromCodeFormSubmitted = true;
    if (this.generateDiagramFromCodeForm.invalid) {
      return;
    } else {
      let chosenFile: any;
      for (const file of this.sourceCodeFiles) {
        if (file.displayName === this.generateDiagramFromCodeForm.value.file) {
          chosenFile = file;
          break;
        }
      }
      this.sourceCodeFileKey.emit(chosenFile);
      const modal: HTMLElement = document.getElementById('generateDiagramFromCode');
      modal.style.display = 'none';
      this.areAnyWindowsOpen.emit(false);
      this.availableSourceCodeFiles = [];
      this.generateDiagramFromCodeForm.reset();
    }
  }

  public closeStatePropertiesWindow(): void {
    const statePropertiesForm: HTMLElement = document.getElementById('state-properties-form');
    statePropertiesForm.style.display = 'none';
    this.areAnyWindowsOpen.emit(false);
    this.stateOutputsData = new MatTableDataSource<OutputAssignments>([]);
    this.stateSignalsData = new MatTableDataSource<SignalAssignments>([]);
    this.errorMessage = '';
  }

  public closeTransitionPropertiesWindow(): void {
    const transitionPropertiesForm: HTMLElement = document.getElementById('transition-properties-form');
    transitionPropertiesForm.style.display = 'none';
    this.areAnyWindowsOpen.emit(false);
    this.sourceState = '';
    this.targetState = '';
    this.transitionCondition = '';
    this.transitionOutputsData = new MatTableDataSource<OutputAssignments>([]);
    this.transitionSignalsData = new MatTableDataSource<SignalAssignments>([]);
    this.errorMessage = '';
  }

  public validateStateName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isStateNameValid: boolean = !this.regularExpressions.nameFormat
        .test(control.value); // true na error
      return isStateNameValid ? {forbiddenName: {value: control.value}} : null;
    };
  }

  public validateStateExistence(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isStateNameUnique: boolean = false;
      for (const name of this.otherStateNames) {
        if (control.value === name) {
          isStateNameUnique = true;
        }
      }
      return isStateNameUnique ? {existence: {value: control.value}} : null;
    };
  }

  public validateKeywordExistence(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isKeyword: boolean = false;
      const reservedWords: Keywords = new Keywords();
      for (const keyword of reservedWords.keywords) {
        if (keyword.toLowerCase() === control.value.toLowerCase()) {
          isKeyword = true;
          break;
        }
      }
      for (const keyword of reservedWords.vhdlKeywords) {
        if (keyword.toLowerCase() === control.value.toLowerCase()) {
          isKeyword = true;
          break;
        }
      }
      return isKeyword ? {keywordExistence: {value: control.value}} : null;
    };
  }

  public validateCondition(condition: string): boolean {
    this.conditionErrorMessage = '';
    this.displayErrorMessage = false;
    let isValid: boolean = true;
    // tslint:disable-next-line:no-this-assignment
    const parent: any = this;
    // tslint:disable-next-line:new-parens
    const listener: ANTLRErrorListener<Token> = new class implements ANTLRErrorListener<Token> {
      public syntaxError<T>(
        recognizer: Recognizer<T, any>,
        offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
      ): void {
        parent.conditionErrorMessage = `column ${charPositionInLine - 8}: ${msg}`;
      }
    };
    if (this.isLanguageVHDL) {
      const object: TestConditionVHDL = new TestConditionVHDL(condition);
      const code: string = object.getCode();
      const inputStream: ANTLRInputStream = new ANTLRInputStream(code);
      const lexer: vhdlLexer = new vhdlLexer(inputStream);
      const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
      const parser: vhdlParser = new vhdlParser(tokenStream);
      parser.removeErrorListeners();
      parser.addErrorListener(listener);
      parser.design_file();
      if (this.conditionErrorMessage.length !== 0) {
        this.displayErrorMessage = true;
        isValid = false;
      }
    } else if (!this.isLanguageVHDL) {
      const object: TestCondition = new TestCondition(condition);
      const code: string = object.getCode();
      const inputStream: ANTLRInputStream = new ANTLRInputStream(code);
      const lexer: SystemVerilogLexer = new SystemVerilogLexer(inputStream);
      const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
      const parser: SystemVerilogParser = new SystemVerilogParser(tokenStream);
      parser.removeErrorListeners();
      parser.addErrorListener(listener);
      parser.source_text();
      if (this.conditionErrorMessage.length !== 0) {
        this.displayErrorMessage = true;
        isValid = false;
      }
    }
    return isValid;
  }

  public displayTransitionPropertiesWindow(
    activeTransition: any,
    sourceStateName: string,
    targetStateName: string,
    machineType: string
  ): void {
    this.transitionPropertiesFormSubmitted = false;
    this.stateMachineType = machineType;
    this.insertableElements = [];
    this.sourceState = sourceStateName;
    this.targetState = targetStateName;
    this.transitionCondition = activeTransition.equation;
    this.transitionOutputsData = new MatTableDataSource<OutputAssignments>([]);
    this.transitionSignalsData = new MatTableDataSource<SignalAssignments>([]);
    this.displayErrorMessage = false;
    this.errorMessage = '';
    this.conditionErrorMessage = '';
    for (const input of this.dataInputSource.data) {
      this.insertableElements.push(input.name);
    }
    for (const output of this.dataOutputSource.data) {
      this.insertableElements.push(output.name);
    }
    for (const signal of this.dataSignalSource.data) {
      this.insertableElements.push(signal.name);
    }
    for (const parameter of this.dataParameterSource.data) {
      this.insertableElements.push(parameter.name);
    }
    for (const output of activeTransition.outputs) {
      this.transitionOutputsData.data.push({
        name: output.name,
        bits: output.bits,
        type: output.type,
        value: output.value
      });
      this.transitionOutputsData._updateChangeSubscription();
    }
    for (const signal of activeTransition.signals) {
      this.transitionSignalsData.data.push({
        name: signal.name,
        bits: signal.bits,
        type: signal.type,
        value: signal.value
      });
      this.transitionSignalsData._updateChangeSubscription();
    }
    const modal: HTMLElement = document.getElementById('transition-properties-form');
    modal.style.display = 'block';
  }

  public submitTransitionProperties(e: any): void {
    this.transitionPropertiesFormSubmitted = true;
    if (this.transitionPropertiesForm.invalid
      || !this.validateCondition(this.transitionCondition)
      || !this.validateAssignments()) {
      return;
    } else {
      const transitionPropertiesForm: HTMLElement = document.getElementById('transition-properties-form');
      transitionPropertiesForm.style.display = 'none';
      this.areAnyWindowsOpen.emit(false);
      this.newCondition.emit(e.target[0].value);
      this.modifiedTransitionOutputValues.emit(this.transitionOutputsData.data);
      this.modifiedTransitionSignalValues.emit(this.transitionSignalsData.data);
      this.transitionOutputsData = new MatTableDataSource<OutputAssignments>([]);
      this.transitionSignalsData = new MatTableDataSource<SignalAssignments>([]);
      this.transitionCondition = '';
      this.displayErrorMessage = false;
      this.conditionErrorMessage = '';
      this.createForms();
    }
  }

  public insertInputIntoEquation(selectedInput: string): void {
    this.transitionCondition = this.transitionCondition + selectedInput;
  }

  public displaySaveWindow(title: string): void {
    this.title = title;
    this.saveDiagramForm.get('filename').setValue(this.title);
    this.saveDiagramFormSubmitted = false;
    const modal: HTMLElement = document.getElementById('saveDiagram');
    modal.style.display = 'block';
  }

  public displayLoadWindow(): void {
    this.loadDiagramFormSubmitted = false;
    this.getAvailableXMLFiles().then(() => {
    });
    const modal: HTMLElement = document.getElementById('loadDiagram');
    modal.style.display = 'block';
  }

  public displayGenerateDiagramFromWindow(): void {
    this.generateDiagramFromCodeFormSubmitted = false;
    this.getAvailableSourceCodeFiles().then(() => {
    });
    const modal: HTMLElement = document.getElementById('generateDiagramFromCode');
    modal.style.display = 'block';
  }

  public async getListOfRelevantFilesBySuffix(suffix: string): Promise<RepoFileReference[]> {
    const getFiles: any = async () => {
      this.repo = this.repoService.currentRepo;
      return (await this.collabService.getFilesBySuffix(
        suffix, this.repo.uuid, this.branch)).map(value => {
        return {
          name: value,
          displayName: getFileNameFromDocID(value),
          parentModuleInstance: null,
          length: value.split('/').length
        };
      });
    };
    getFiles();
    if (this.repo) {
      return getFiles();
    }
  }

  public clear(inputType: string): void {
    if (inputType === 'binary') {
      this.binaryNumber = '';
    } else {
      this.transitionCondition = '';
    }
  }

  public delete(inputType: string): void {
    if (inputType === 'binary') {
      this.binaryNumber = this.binaryNumber.slice(0, -1);
    } else {
      const splitCondition: string[] = this.transitionCondition.split(' ');
      this.transitionCondition = '';
      const removedLastElementOfSplitCondition: string[] = splitCondition.slice(0, -2);
      for (const element of removedLastElementOfSplitCondition) {
        this.transitionCondition = this.transitionCondition + element + ' ';
      }
    }
  }

  public changeXmlFileToDisplay(e: any): void {
    this.xmlFile.setValue(e.target.value, {onlySelf: true});
  }

  public changeFileToDisplay(e: any): void {
    this.file.setValue(e.target.value, {onlySelf: true});
  }

  private _filter(value: string): string[] {
    const filterValue: string = value.toLowerCase();
    return this.insertableElements.filter(option => option.toLowerCase().includes(filterValue));
  }

  private createForms(): void {
    this.statePropertiesForm = this.formBuilder.group({
      displayedStateName: ['', [Validators.required, this.validateStateName(),
        this.validateStateExistence(),
        this.validateKeywordExistence()]]
    });
    this.transitionPropertiesForm = this.formBuilder.group({
      displayedCondition: [''],
      inputValue: ['']
    });
    this.saveDiagramForm = this.formBuilder.group({
      filename: ['', [Validators.required]]
    });
    this.loadDiagramForm = this.formBuilder.group({
      xmlFile: ['', [Validators.required]]
    });
    this.generateDiagramFromCodeForm = this.formBuilder.group({
      file: ['', [Validators.required]]
    });
  }

  private validateAssignments(): boolean {
    if (this.stateMachineType === 'Mealy') {
      for (const output of this.transitionOutputsData.data) {
        if (output.value !== '') {
          if (output.type === 'Binary'
            && !this.regularExpressions.containsBinaryValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not binary.';
            return false;
          } else if (output.type === 'Octal'
            && !this.regularExpressions.containsOctalValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not octal.';
            return false;
          } else if (output.type === 'Decimal'
            && !this.regularExpressions.containsDecimalValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not decimal.';
            return false;
          } else if (output.type === 'Hexadecimal'
            && !this.regularExpressions.containsHexadecimalValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not hexadecimal.';
            return false;
          }
        }
      }
      for (const signal of this.transitionSignalsData.data) {
        if (signal.value !== '') {
          if (signal.type === 'Binary'
            && !this.regularExpressions.containsBinaryValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not binary.';
            return false;
          } else if (signal.type === 'Octal'
            && !this.regularExpressions.containsOctalValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not octal.';
            return false;
          } else if (signal.type === 'Decimal'
            && !this.regularExpressions.containsDecimalValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not decimal.';
            return false;
          } else if (signal.type === 'Hexadecimal'
            && !this.regularExpressions.containsHexadecimalValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not hexadecimal.';
            return false;
          }
        }
      }
    } else {
      for (const output of this.stateOutputsData.data) {
        if (output.value !== '') {
          if (output.type === 'Binary'
            && !this.regularExpressions.containsBinaryValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not binary.';
            return false;
          } else if (output.type === 'Octal'
            && !this.regularExpressions.containsOctalValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not octal.';
            return false;
          } else if (output.type === 'Decimal'
            && !this.regularExpressions.containsDecimalValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not decimal.';
            return false;
          } else if (output.type === 'Hexadecimal'
            && !this.regularExpressions.containsHexadecimalValue.test(output.value)) {
            this.errorMessage = 'Output \'' + output.name + '\' assigned value is not hexadecimal.';
            return false;
          }
        }
      }
      for (const signal of this.stateSignalsData.data) {
        if (signal.value !== '') {
          if (signal.type === 'Binary'
            && !this.regularExpressions.containsBinaryValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not binary.';
            return false;
          } else if (signal.type === 'Octal'
            && !this.regularExpressions.containsOctalValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not octal.';
            return false;
          } else if (signal.type === 'Decimal'
            && !this.regularExpressions.containsDecimalValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not decimal.';
            return false;
          } else if (signal.type === 'Hexadecimal'
            && !this.regularExpressions.containsHexadecimalValue.test(signal.value)) {
            this.errorMessage = 'Signal \'' + signal.name + '\' assigned value is not hexadecimal.';
            return false;
          }
        }
      }
    }
    this.errorMessage = '';
    return true;
  }

  private async getAvailableSourceCodeFiles(): Promise<void> {
    this.availableSourceCodeFiles = [];
    this.sourceCodeFiles = await this.getListOfRelevantFilesBySuffix('.v');
    for (const file of this.sourceCodeFiles) {
      this.availableSourceCodeFiles.push(file.displayName);
    }
    const systemVerilogFiles: RepoFileReference[] =
      await this.getListOfRelevantFilesBySuffix('.sv');
    for (const file of systemVerilogFiles) {
      this.availableSourceCodeFiles.push(file.displayName);
      this.sourceCodeFiles.push(file);
    }
    const vhdlFiles: RepoFileReference[] = await this.getListOfRelevantFilesBySuffix('.vhd');
    for (const file of vhdlFiles) {
      this.availableSourceCodeFiles.push(file.displayName);
      this.sourceCodeFiles.push(file);
    }
  }

  private async getAvailableXMLFiles(): Promise<void> {
    this.availableXmlFiles = [];
    this.xmlFiles = await this.getListOfRelevantFilesBySuffix('.fsm');
    for (const file of this.xmlFiles) {
      this.availableXmlFiles.push(file.displayName);
    }
  }
}
