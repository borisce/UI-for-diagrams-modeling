import {Component, EventEmitter, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ɵFormGroupRawValue,
  ɵGetProperty,
  ɵTypedOrUntyped
} from '@angular/forms';
import {SystemVerilogGenData} from '../other-classes/systemVerilogGenData';
import {VhdlGenData} from '../other-classes/vhdlGenData';
import {Keywords} from '../other-classes/Keywords';

@Component({
  selector: 'app-generate-code-forms',
  templateUrl: './generate-code-forms.component.html',
  styleUrls: ['./generate-code-forms.component.scss']
})

export class GenerateCodeFormsComponent {

  @Output() public areAnyWindowsOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public vhdlDataPrepared: EventEmitter<VhdlGenData> = new EventEmitter<VhdlGenData>();
  @Output() public systemVerilogDataPrepared: EventEmitter<SystemVerilogGenData> =
    new EventEmitter<SystemVerilogGenData>();

  public vhdlSubmitForm: FormGroup;
  public systemVerilogSubmitForm: FormGroup;
  public vhdlFormSubmitted: boolean = false;
  public systemVerilogFormSubmitted: boolean = false;
  public chosenStateEncoding: string;
  public systemVerilogHeader: string;
  public title: string;
  public encodings: any = ['Binary', 'One-hot', 'One-cold', 'Gray', 'Hamming distance'];
  public alwaysBlocks: any = ['1 always block', '2 always blocks', '3 always blocks'];
  public processes: any = ['1 process', '2 processes', '3 processes'];
  private regularExpressions: { format: RegExp, distanceFormat: RegExp } = {
    format: /^[A-Za-z][A-Za-z0-9_]*$/,
    distanceFormat: /^[1-4]$/
  };

  constructor(private formBuilder: FormBuilder) {
    this.chosenStateEncoding = 'other';
    this.title = '';
    this.createForms();
  }

  get vhdlControls(): ɵTypedOrUntyped<any, any,
    { [p: string]: AbstractControl<any> }> {
    return this.vhdlSubmitForm.controls;
  }

  get systemVerilogControls(): ɵTypedOrUntyped<any, any,
    { [p: string]: AbstractControl<any> }> {
    return this.systemVerilogSubmitForm.controls;
  }

  get stateEncoding()
    : AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, 'stateEncoding'>> {
    return this.systemVerilogSubmitForm.get('stateEncoding');
  }

  get alwaysBlocksNumber()
    : AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, 'alwaysBlocksNumber'>> {
    return this.systemVerilogSubmitForm.get('alwaysBlocksNumber');
  }

  get processesNumber()
    : AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, 'processesNumber'>> {
    return this.vhdlSubmitForm.get('processesNumber');
  }

  public ngOnInit = (): void => {
    this.setHammingDistanceValidations();
  }

  public setHammingDistanceValidations(): void {
    const hammingDistanceControl: AbstractControl<any, any> = this.systemVerilogSubmitForm.get('hammingDistance');
    if (this.chosenStateEncoding === 'Hamming distance') {
      hammingDistanceControl.setValidators([Validators.required, this.validateDistanceValue()]);
    } else {
      hammingDistanceControl.setValidators(null);
    }
    hammingDistanceControl.updateValueAndValidity();
  }

  public submitVhdlFormData(): void {
    this.vhdlFormSubmitted = true;
    if (this.vhdlSubmitForm.invalid) {
      return;
    } else {
      const vhdlCodeGenForm: HTMLElement = document.getElementById('vhdl-code-gen-form');
      vhdlCodeGenForm.style.display = 'none';
      this.areAnyWindowsOpen.emit(false);
      const vhdlCodeProperties: VhdlGenData = new VhdlGenData(
        this.vhdlSubmitForm.value.entityName,
        this.vhdlSubmitForm.value.architectureName,
        this.vhdlSubmitForm.value.processesNumber
      );
      this.vhdlDataPrepared.emit(vhdlCodeProperties);
      this.createForms();
    }
  }

  public submitSystemVerilogFormData(): void {
    this.systemVerilogFormSubmitted = true;
    if (this.systemVerilogSubmitForm.invalid) {
      return;
    } else {
      const systemVerilogCodeGenForm: HTMLElement = document.getElementById('system-verilog-code-gen-form');
      systemVerilogCodeGenForm.style.display = 'none';
      this.areAnyWindowsOpen.emit(false);
      let systemVerilogCodeProperties: any;
      if (this.systemVerilogHeader.startsWith('SystemVerilog')) {
        systemVerilogCodeProperties = new SystemVerilogGenData(
          this.systemVerilogSubmitForm.value.moduleName,
          this.systemVerilogSubmitForm.value.stateEncoding,
          this.systemVerilogSubmitForm.value.alwaysBlocksNumber,
          'SystemVerilog',
          this.systemVerilogSubmitForm.value.hammingDistance
        );
      } else {
        systemVerilogCodeProperties = new SystemVerilogGenData(
          this.systemVerilogSubmitForm.value.moduleName,
          this.systemVerilogSubmitForm.value.stateEncoding,
          this.systemVerilogSubmitForm.value.alwaysBlocksNumber,
          'Verilog',
          this.systemVerilogSubmitForm.value.hammingDistance
        );
      }
      this.systemVerilogDataPrepared.emit(systemVerilogCodeProperties);
      this.createForms();
    }
  }

  public changeStateEncodingValue(e: any): void {
    if (e.target.value === '5: Hamming distance') {
      this.chosenStateEncoding = 'Hamming distance';
      this.setHammingDistanceValidations();
    } else {
      this.chosenStateEncoding = 'other';
      this.setHammingDistanceValidations();
    }
    this.stateEncoding.setValue(e.target.value, {onlySelf: true});
  }

  public changeAlwaysBlocksValue(e: any): void {
    this.alwaysBlocksNumber.setValue(e.target.value, {onlySelf: true});
  }

  public changeProcessesValue(e: any): void {
    this.processesNumber.setValue(e.target.value, {onlySelf: true});
  }

  public displayGenerateVhdlCodeForm(machineType: string, title: string): void {
    this.title = title;
    this.vhdlSubmitForm.get('entityName').setValue(title);
    this.vhdlFormSubmitted = false;
    if (machineType === 'Mealy') {
      this.processes = ['1 process', '2 processes', '3 processes'];
    } else {
      this.processes = ['2 processes', '3 processes'];
    }
    const vhdlCodeGenForm: HTMLElement = document.getElementById('vhdl-code-gen-form');
    vhdlCodeGenForm.style.display = 'block';
  }

  public closeGenerateVhdlCodeForm(): void {
    const vhdlCodeGenForm: HTMLElement = document.getElementById('vhdl-code-gen-form');
    vhdlCodeGenForm.style.display = 'none';
    this.areAnyWindowsOpen.emit(false);
    this.createForms();
  }

  public displayGenerateSystemVerilogCodeForm(machineType: string, title: string): void {
    this.title = title;
    this.systemVerilogSubmitForm.get('moduleName').setValue(title);
    this.systemVerilogFormSubmitted = false;
    this.systemVerilogHeader = 'SystemVerilog Code Generation Form';
    if (machineType === 'Mealy') {
      this.alwaysBlocks = ['1 always block', '2 always blocks', '3 always blocks'];
    } else {
      this.alwaysBlocks = ['2 always blocks', '3 always blocks'];
    }
    const systemVerilogCodeGenForm: HTMLElement = document.getElementById('system-verilog-code-gen-form');
    systemVerilogCodeGenForm.style.display = 'block';
  }

  public closeGenerateSystemVerilogCodeForm(): void {
    const systemVerilogCodeGenForm: HTMLElement = document.getElementById('system-verilog-code-gen-form');
    systemVerilogCodeGenForm.style.display = 'none';
    this.areAnyWindowsOpen.emit(false);
    this.createForms();
  }

  public displayGenerateVerilogCodeForm(machineType: string, title: string): void {
    this.title = title;
    this.systemVerilogSubmitForm.get('moduleName').setValue(title);
    this.systemVerilogFormSubmitted = false;
    this.systemVerilogHeader = 'Verilog Code Generation Form';
    if (machineType === 'Mealy') {
      this.alwaysBlocks = ['1 always block', '2 always blocks', '3 always blocks'];
    } else {
      this.alwaysBlocks = ['2 always blocks', '3 always blocks'];
    }
    const verilogCodeGenForm: HTMLElement = document.getElementById('system-verilog-code-gen-form');
    verilogCodeGenForm.style.display = 'block';
  }

  public validateName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isStateNameValid: boolean = !this.regularExpressions.format.test(control.value);
      return isStateNameValid ? {forbiddenName: {value: control.value}} : null;
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

  public validateDistanceValue(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isDistanceWithinRange: boolean =
        !this.regularExpressions.distanceFormat.test(control.value);
      return isDistanceWithinRange ? {forbiddenDistance: {value: control.value}} : null;
    };
  }

  private createForms(): void {
    this.vhdlSubmitForm = this.formBuilder.group({
        entityName: ['', [Validators.required, this.validateName(),
          this.validateKeywordExistence()]],
        architectureName: ['', [Validators.required, this.validateName(),
          this.validateKeywordExistence()]],
        processesNumber: ['', [Validators.required]]
      }
    );
    this.systemVerilogSubmitForm = this.formBuilder.group({
        moduleName: ['', [Validators.required, this.validateName(),
          this.validateKeywordExistence()]],
        stateEncoding: ['', [Validators.required]],
        hammingDistance: ['', [Validators.required, this.validateDistanceValue()]],
        alwaysBlocksNumber: ['', [Validators.required]]
      }
    );
  }
}
