import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InputOutput, InternalSignal, Parameter } from '../types/data-source.type';
import { operators } from '../operators';

@Component({
  selector: 'language-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  @Input() moduleInputs: MatTableDataSource<InputOutput>;
  @Input() moduleOutputs: MatTableDataSource<InputOutput>;
  @Input() internalSignals: MatTableDataSource<InternalSignal>;
  @Input() parameters: MatTableDataSource<Parameter>;

  @Output() operatorAdded = new EventEmitter<string>();

  public selectedLanguage: 'SystemVerilog' | 'VHDL' = 'SystemVerilog';
  public operators = operators;

  constructor() { }

  ngOnInit(): void {
  }

  addOperator(operator: string) {
    this.operatorAdded.emit(operator + ' ');
  }

}
