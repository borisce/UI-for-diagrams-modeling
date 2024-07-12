import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagramData } from '../../types/diagram-data.type';
import { CodeGenerationService } from '../../code-generation.service';

@Component({
  selector: 'app-generate-code-modal',
  templateUrl: './generate-code-modal.component.html',
  styleUrls: ['./generate-code-modal.component.css'],
  providers: [CodeGenerationService]
})
export class GenerateCodeModalComponent implements OnInit {

  public language: 'System Verilog' | 'VHDL' = 'System Verilog';
  public generatedCode: string = '';
  public fileName: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { diagramData: DiagramData }, public codeGenerationService: CodeGenerationService) { }

  ngOnInit(): void {
  }

  public generateCode(): void {
    const diagramData = this.data.diagramData;
    this.generatedCode = this.codeGenerationService.generateCode(diagramData.moduleName, diagramData.blocks, diagramData.moduleInputs, diagramData.moduleOutputs, diagramData.internalSignals, diagramData.parameters, this.language);
  }

}
