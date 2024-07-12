import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Outputs} from '../other-classes/Outputs';
import {Inputs} from '../other-classes/Inputs';
import {Signals} from '../other-classes/Signals';
import {Parameters} from '../other-classes/Parameters';
import {Keywords} from '../other-classes/Keywords';

@Component({
  selector: 'app-inputandoutputtables',
  templateUrl: './input-output-tables.html',
  styleUrls: ['./input-output-tables.scss']
})

export class InputOutputTables implements OnInit {
  @Input() public dataInputSource: MatTableDataSource<Inputs>;
  @Input() public dataOutputSource: MatTableDataSource<Outputs>;
  @Input() public dataSignalSource: MatTableDataSource<Signals>;
  @Input() public dataParameterSource: MatTableDataSource<Parameters>;
  @Output() public areAnyWindowsOpen: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public modifiedOutputSource: EventEmitter<Outputs[]> = new EventEmitter<Outputs[]>();
  @Output() public modifiedSignalSource: EventEmitter<Signals[]> = new EventEmitter<Signals[]>();
  @Output() public modifiedTableSources: EventEmitter<boolean> = new EventEmitter<boolean>();

  public availableColumns: string[] = ['name', 'bits', 'actions'];
  public availableParameterTypes: string[] = ['Integer', 'Real', 'Shortreal', 'Time'];
  public availableParameterColumns: string[] = ['name', 'type', 'value', 'actions'];
  public errorMessage: string = '';
  public displayErrorMessage: boolean = false;
  private openedTable: string = '';
  private inputOutputNameFormat: RegExp = new RegExp('^[a-zA-Z][a-zA-Z\\d_]*$');
  private parameterNameFormat: RegExp = new RegExp('^[A-Z][A-Z\\d_]*$');

  constructor() {
  }

  public ngOnInit(): void {
  }

  public deleteInput(element: any): void {
    const index: number = this.dataInputSource.data.indexOf(element);
    this.dataInputSource.data.splice(index, 1);
    this.dataInputSource._updateChangeSubscription();
  }

  public deleteOutput(element: any): void {
    const index: number = this.dataOutputSource.data.indexOf(element);
    this.dataOutputSource.data.splice(index, 1);
    this.dataOutputSource._updateChangeSubscription();
  }

  public deleteSignal(element: any): void {
    const index: number = this.dataSignalSource.data.indexOf(element);
    this.dataSignalSource.data.splice(index, 1);
    this.dataSignalSource._updateChangeSubscription();
  }

  public deleteParameter(element: any): void {
    const index: number = this.dataParameterSource.data.indexOf(element);
    this.dataParameterSource.data.splice(index, 1);
    this.dataParameterSource._updateChangeSubscription();
  }

  public displayInputTable(): void {
    this.openedTable = 'Inputs';
    const modal: HTMLElement = document.getElementById('InputTable');
    modal.style.display = 'block';
  }

  public displayOutputTable(): void {
    this.openedTable = 'Outputs';
    const modal: HTMLElement = document.getElementById('OutputTable');
    modal.style.display = 'block';
  }

  public displaySignalTable(): void {
    this.openedTable = 'Internal Signals';
    const modal: HTMLElement = document.getElementById('SignalTable');
    modal.style.display = 'block';
  }

  public displayParameterTable(): void {
    this.openedTable = 'Parameters';
    const modal: HTMLElement = document.getElementById('ParameterTable');
    modal.style.display = 'block';
  }

  public addNewInput(): void {
    this.dataInputSource.data.push({name: 'new_input', bits: '1'});
    this.dataInputSource._updateChangeSubscription();
  }

  public addNewOutput(): void {
    this.dataOutputSource.data.push({name: 'new_output', bits: '1'});
    this.dataOutputSource._updateChangeSubscription();
  }

  public addNewSignal(): void {
    this.dataSignalSource.data.push({name: 'new_signal', bits: '1'});
    this.dataSignalSource._updateChangeSubscription();
  }

  public addNewParameter(): void {
    this.dataParameterSource.data.push({name: 'NEW_PARAMETER', type: 'Integer', value: '1'});
    this.dataParameterSource._updateChangeSubscription();
  }

  public onSubmitButtonClicked(): void {
    if (this.openedTable === 'Inputs') {
      const inputTable: HTMLElement = document.getElementById('InputTable');
      if (this.checkCorrectnessOfInputs() && this.checkUniqueNamesWithinAllTables()
        && this.validateKeywordExistence()) {
        inputTable.style.display = 'none';
        this.areAnyWindowsOpen.emit(false);
        this.modifiedTableSources.emit(true);
      }
    } else if (this.openedTable === 'Outputs') {
      const outputTable: HTMLElement = document.getElementById('OutputTable');
      if (this.checkCorrectnessOfOutputs() && this.checkUniqueNamesWithinAllTables()
        && this.validateKeywordExistence()) {
        outputTable.style.display = 'none';
        this.areAnyWindowsOpen.emit(false);
        this.modifiedTableSources.emit(true);
        this.modifiedOutputSource.emit(this.dataOutputSource.data);
      }
    } else if (this.openedTable === 'Internal Signals') {
      const signalTable: HTMLElement = document.getElementById('SignalTable');
      if (this.checkCorrectnessOfSignals() && this.checkUniqueNamesWithinAllTables()
        && this.validateKeywordExistence()) {
        signalTable.style.display = 'none';
        this.areAnyWindowsOpen.emit(false);
        this.modifiedTableSources.emit(true);
        this.modifiedSignalSource.emit(this.dataSignalSource.data);
      }
    } else {
      const parameterTable: HTMLElement = document.getElementById('ParameterTable');
      if (this.checkCorrectnessOfParameters() && this.checkUniqueNamesWithinAllTables()
        && this.validateKeywordExistence()) {
        parameterTable.style.display = 'none';
        this.areAnyWindowsOpen.emit(false);
        this.modifiedTableSources.emit(true);
      }
    }
  }

  private checkCorrectnessOfParameters(): boolean {
    for (let i: number = 0; i < this.dataParameterSource.data.length; i++) {
      if (!this.parameterNameFormat.test(this.dataParameterSource.data[i].name)) {
        this.errorMessage = 'Parameter \'' + this.dataParameterSource.data[i].name +
          '\' does not meet the supported format.';
        this.displayErrorMessage = true;
        return false;
      } else if (isNaN(Number(this.dataParameterSource.data[i].value))) {
        this.errorMessage = 'Parameter \'' + this.dataParameterSource.data[i].name
          + '\' : value is not a number.';
        this.displayErrorMessage = true;
        return false;
      } else {
        for (let j: number = 0; j < this.dataParameterSource.data.length; j++) {
          if (i !== j && this.dataParameterSource.data[i].name
            === this.dataParameterSource.data[j].name) {
            this.errorMessage = 'All parameter names must be unique: \''
              + this.dataParameterSource.data[j].name + '\'.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    }
    this.displayErrorMessage = false;
    this.errorMessage = '';
    return true;
  }

  private checkCorrectnessOfInputs(): boolean {
    for (let i: number = 0; i < this.dataInputSource.data.length; i++) {
      if (!this.inputOutputNameFormat.test(this.dataInputSource.data[i].name)) {
        this.errorMessage = 'Input: \'' + this.dataInputSource.data[i].name
          + '\' does not meet the supported format.';
        this.displayErrorMessage = true;
        return false;
      } else if (isNaN(Number(this.dataInputSource.data[i].bits))
        || Number(this.dataInputSource.data[i].bits) < 1) {
        this.errorMessage = 'Input: \'' + this.dataInputSource.data[i].name
          + '\' has incorrect bit size value. Value must be a whole number greater than 1.';
        this.displayErrorMessage = true;
        return false;
      } else {
        for (let j: number = 0; j < this.dataInputSource.data.length; j++) {
          if (i !== j && this.dataInputSource.data[i].name === this.dataInputSource.data[j].name) {
            this.errorMessage = 'All input names must be unique: \''
              + this.dataInputSource.data[j].name + '\'.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    }
    this.displayErrorMessage = false;
    this.errorMessage = '';
    return true;
  }

  private checkCorrectnessOfOutputs(): boolean {
    for (let i: number = 0; i < this.dataOutputSource.data.length; i++) {
      if (!this.inputOutputNameFormat.test(this.dataOutputSource.data[i].name)) {
        this.errorMessage = 'Output \'' + this.dataOutputSource.data[i].name
          + '\' does not meet the supported format.';
        this.displayErrorMessage = true;
        return false;
      } else if (isNaN(Number(this.dataOutputSource.data[i].bits))
        || Number(this.dataOutputSource.data[i].bits) < 1) {
        this.errorMessage = 'Output: \'' + this.dataOutputSource.data[i].name
          + '\' has incorrect bit size value. Value must be a whole number greater than 1.';
        this.displayErrorMessage = true;
        return false;
      } else {
        for (let j: number = 0; j < this.dataOutputSource.data.length; j++) {
          if (i !== j && this.dataOutputSource.data[i].name
            === this.dataOutputSource.data[j].name) {
            this.errorMessage = 'All output names must be unique: \''
              + this.dataOutputSource.data[j].name + '\'.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    }
    this.displayErrorMessage = false;
    this.errorMessage = '';
    return true;
  }

  private checkCorrectnessOfSignals(): boolean {
    for (let i: number = 0; i < this.dataSignalSource.data.length; i++) {
      if (!this.inputOutputNameFormat.test(this.dataSignalSource.data[i].name)) {
        this.errorMessage = 'Signal \'' + this.dataSignalSource.data[i].name
          + '\' does not meet the supported format.';
        this.displayErrorMessage = true;
        return false;
      } else if (isNaN(Number(this.dataSignalSource.data[i].bits))
        || Number(this.dataSignalSource.data[i].bits) < 1) {
        this.errorMessage = 'Signal: \'' + this.dataSignalSource.data[i].name
          + '\' has incorrect bit size value. Value must be a whole number greater than 1.';
        this.displayErrorMessage = true;
        return false;
      } else {
        for (let j: number = 0; j < this.dataSignalSource.data.length; j++) {
          if (i !== j && this.dataSignalSource.data[i].name
            === this.dataSignalSource.data[j].name) {
            this.errorMessage = 'All signal names must be unique: \''
              + this.dataSignalSource.data[j].name + '\'.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    }
    this.displayErrorMessage = false;
    this.errorMessage = '';
    return true;
  }

  private checkUniqueNamesWithinAllTables(): boolean {
    if (this.openedTable === 'Inputs') {
      for (const item of this.dataInputSource.data) {
        for (const item1 of this.dataOutputSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Input: \'' + item.name + '\' - an output with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataSignalSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Input: \'' + item.name + '\' - a signal with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataParameterSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Input: \'' + item.name + '\' - a parameter with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    } else if (this.openedTable === 'Outputs') {
      for (const item of this.dataOutputSource.data) {
        for (const item1 of this.dataInputSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Output: \'' + item.name + '\' - an input with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataSignalSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Output: \'' + item.name + '\' - a signal with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataParameterSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Output: \'' + item.name + '\' - a parameter with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    } else if (this.openedTable === 'Internal Signals') {
      for (const item of this.dataSignalSource.data) {
        for (const item1 of this.dataInputSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Signal: \'' + item.name + '\' - an input with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataOutputSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Signal: \'' + item.name + '\' - an output with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataParameterSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Signal: \'' + item.name + '\' - a parameter with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    } else {
      for (const item of this.dataParameterSource.data) {
        for (const item1 of this.dataInputSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Parameter: \'' + item.name + '\' - an input with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataOutputSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Parameter: \'' + item.name + '\' - an output with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const item1 of this.dataSignalSource.data) {
          if (item.name === item1.name) {
            this.errorMessage = 'Parameter: \'' + item.name + '\' - a signal with the ' +
              'given name already exists.';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    }
    this.displayErrorMessage = false;
    this.errorMessage = '';
    return true;
  }

  private validateKeywordExistence(): boolean {
    const reservedWords: Keywords = new Keywords();
    if (this.openedTable === 'Inputs') {
      for (const item of this.dataInputSource.data) {
        for (const word of reservedWords.keywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Input: \'' + item.name + '\' - Name of input cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const word of reservedWords.vhdlKeywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Input: \'' + item.name + '\' - Name of input cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    } else if (this.openedTable === 'Outputs') {
      for (const item of this.dataOutputSource.data) {
        for (const word of reservedWords.keywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Output: \'' + item.name + '\' - Name of output cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const word of reservedWords.vhdlKeywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Output: \'' + item.name + '\' - Name of output cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    } else if (this.openedTable === 'Internal Signals') {
      for (const item of this.dataSignalSource.data) {
        for (const word of reservedWords.keywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Signal: \'' + item.name + '\' - Name of signal cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const word of reservedWords.vhdlKeywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Signal: \'' + item.name + '\' - Name of signal cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    } else {
      for (const item of this.dataParameterSource.data) {
        for (const word of reservedWords.keywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Parameter: \'' + item.name + '\' - Name of parameter cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
        for (const word of reservedWords.vhdlKeywords) {
          if (item.name.toLowerCase() === word.toLowerCase()) {
            this.errorMessage = 'Parameter: \'' + item.name + '\' - Name of parameter cannot be ' +
              'a reserved word from SystemVerilog, Verilog or VHDL';
            this.displayErrorMessage = true;
            return false;
          }
        }
      }
    }
    this.displayErrorMessage = false;
    this.errorMessage = '';
    return true;
  }
}
