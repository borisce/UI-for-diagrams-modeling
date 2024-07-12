import {Component, EventEmitter, Output} from '@angular/core';
import {OutputAssignments} from '../other-classes/OutputAssignments';
import {Outputs} from '../other-classes/Outputs';
import {Inputs} from '../other-classes/Inputs';
import {Signals} from '../other-classes/Signals';
import {Parameters} from '../other-classes/Parameters';
import {SignalAssignments} from '../other-classes/SignalAssignments';
import {CollabState} from '../other-classes/collabState';
import {Transition} from '../other-classes/Transition';
import {GenerateDiagramSchema} from '../other-classes/GenerateDiagramSchema';

@Component({
  selector: 'app-load-xml-file',
  template: ``,
})

export class LoadXmlFileComponent {

  @Output() public schema: EventEmitter<GenerateDiagramSchema> =
    new EventEmitter<GenerateDiagramSchema>();

  private moduleElement: RegExp = new RegExp('^\\s*<module name=\".*\" machine_type=\".*\">$');
  private drawingMode: boolean = false;
  private diagramSchema: GenerateDiagramSchema;

  constructor() {}

  public loadDiagramFromXml(fileContent: string, drawingMode: boolean): void {
    this.createNewDiagramSchema();
    this.drawingMode = drawingMode;
    let machineType: string = '';
    const splitFileContent: string[] = fileContent.split('\n');
    for (let i: number = 1; i < splitFileContent.length; i++) {
      if (this.moduleElement.test(splitFileContent[i])) {
        machineType = this.extractMachineType(splitFileContent[i]);
      } else if (splitFileContent[i].match('<state name=')) {
        this.extractState(splitFileContent, i, machineType);
      } else if (splitFileContent[i].match('<language>')) {
        this.extractLanguage(splitFileContent, i);
      } else if (splitFileContent[i].match('<inputs>')) {
        this.extractAllInputs(splitFileContent, i);
      } else if (splitFileContent[i].match('<outputs>')) {
        this.extractAllOutputs(splitFileContent, i);
      } else if (splitFileContent[i].match('<signals>')) {
        this.extractAllInternalSignals(splitFileContent, i);
      } else if (splitFileContent[i].match('<parameters>')) {
        this.extractAllParameters(splitFileContent, i);
      } else if (splitFileContent[i].match('<transition id=')) {
        this.extractAllTransitions(splitFileContent, i, machineType);
      }
    }
    this.schema.emit(this.diagramSchema);
  }

  private createNewDiagramSchema(): void {
    this.diagramSchema = new GenerateDiagramSchema();
    this.diagramSchema.machineType = '';
    this.diagramSchema.language = 'SystemVerilog';
    this.diagramSchema.inputs = [];
    this.diagramSchema.outputs = [];
    this.diagramSchema.signals = [];
    this.diagramSchema.parameters = [];
    this.diagramSchema.states = [];
    this.diagramSchema.transitions = [];
  }

  private extractLanguage(fileContent: string[], i: number): void {
    let language: string;
    language = fileContent[i].slice(fileContent[i].indexOf('>') + 1, -11);
    this.diagramSchema.language = language;
  }

  private extractAllTransitions(fileContent: string[], index: number, machineType: string): void {
    const id: string = fileContent[index].slice(fileContent[index].indexOf('\"') + 1, -2);
    const condition: string = this.replaceXMLSpecialChars(fileContent[index + 1]
      .slice(fileContent[index + 1].indexOf('>') + 1, -11));
    const source: string = fileContent[index + 2].slice(fileContent[index + 2]
      .indexOf('>') + 1, -11);
    const target: string = fileContent[index + 3].slice(fileContent[index + 3]
      .indexOf('>') + 1, -11);
    const outputs: OutputAssignments[] = [];
    const signals: SignalAssignments[] = [];
    const verticesArray: { x: number, y: number }[] = [];
    let i: number = index + 4;
    if (machineType === 'Mealy') {
      for (i; !fileContent[i].match('</transition') && !fileContent[i].match('<vertex x='); i++) {
        if (fileContent[i].match('<output name=')) {
          const outputName: string = fileContent[i].slice(fileContent[i].indexOf('\"') + 1, -2);
          const outputBits: string = fileContent[i + 1].slice(fileContent[i + 1]
            .indexOf('>') + 1, -7);
          const outputType: string = fileContent[i + 2].slice(fileContent[i + 2]
            .indexOf('>') + 1, -7);
          const outputValue: string = this.replaceXMLSpecialChars(fileContent[i + 3]
            .slice(fileContent[i + 3].indexOf('>') + 1, -8));
          const outputAssignment: OutputAssignments = {
            name: outputName,
            bits: outputBits,
            type: outputType,
            value: outputValue
          };
          outputs.push(outputAssignment);
        } else if (fileContent[i].match('<signal name=')) {
          const signalName: string = fileContent[i].slice(fileContent[i].indexOf('\"') + 1, -2);
          const signalBits: string = fileContent[i + 1].slice(fileContent[i + 1]
            .indexOf('>') + 1, -7);
          const signalType: string = fileContent[i + 2].slice(fileContent[i + 2]
            .indexOf('>') + 1, -7);
          const signalValue: string = this.replaceXMLSpecialChars(fileContent[i + 3]
            .slice(fileContent[i + 3].indexOf('>') + 1, -8));
          const signalAssignment: SignalAssignments = {
            name: signalName,
            bits: signalBits,
            type: signalType,
            value: signalValue
          };
          signals.push(signalAssignment);
        }
      }
    }
    if (fileContent[i].match('<vertex x=')) {
      for (i; fileContent[i].match('<vertex x='); i++) {
        let xCoordinate: number = 0;
        let yCoordinate: number = 0;
        let indexVertex: number = 0;
        let indexVertex2: number = 0;
        let indexVertex3: number = 0;
        let n: number;
        let quotes: number = 0;
        for (n = 0; n < fileContent[i].length; n++) {
          if (fileContent[i][n] === '\"') {
            indexVertex = n;
            break;
          }
        }
        for (n = 0; n < fileContent[i].length; n++) {
          if (fileContent[i][n] === '\"' && quotes === 1) {
            indexVertex2 = n;
            quotes++;
          } else if (fileContent[i][n] === '\"' && quotes === 2) {
            indexVertex3 = n;
            break;
          } else if (fileContent[i][n] === '\"') {
            quotes++;
          }
        }
        xCoordinate = Number(fileContent[i]
          .slice(indexVertex + 1, indexVertex2 - fileContent[i].length));
        yCoordinate = Number(fileContent[i].slice(indexVertex3 + 1, -11));
        verticesArray.push({x: xCoordinate, y: yCoordinate});
      }
    }
    const transition: Transition = {
      source,
      target,
      condition,
      id,
      outputs,
      signals,
      vertices: verticesArray
    };
    this.diagramSchema.transitions.push(transition);
  }

  private extractAllOutputs(fileContent: string[], index: number): void {
    for (let i: number = index + 1; !fileContent[i].match('</outputs>'); i++) {
      if (fileContent[i].match('<output name=')) {
        const outputName: string = fileContent[i].slice(fileContent[i].indexOf('\"') + 1, -2);
        const outputBits: string = fileContent[i + 1].slice(fileContent[i + 1]
          .indexOf('>') + 1, -7);
        const output: Outputs = {
          name: outputName,
          bits: outputBits
        };
        this.diagramSchema.outputs.push(output);
      }
    }
  }

  private extractAllInputs(fileContent: string[], index: number): void {
    for (let i: number = index + 1; !fileContent[i].match('</inputs>'); i++) {
      if (fileContent[i].match('<input name=')) {
        const inputName: string = fileContent[i].slice(fileContent[i].indexOf('\"') + 1, -2);
        const inputBits: string = fileContent[i + 1].slice(fileContent[i + 1].indexOf('>') + 1, -7);
        const input: Inputs = {
          name: inputName,
          bits: inputBits
        };
        this.diagramSchema.inputs.push(input);
      }
    }
  }

  private extractAllInternalSignals(fileContent: string[], index: number): void {
    for (let i: number = index + 1; !fileContent[i].match('</signals>'); i++) {
      if (fileContent[i].match('<signal name=')) {
        const internalSignalName: string = fileContent[i].slice(fileContent[i]
          .indexOf('\"') + 1, -2);
        const internalSignalBits: string = fileContent[i + 1].slice(fileContent[i + 1]
          .indexOf('>') + 1, -7);
        const signal: Signals = {
          name: internalSignalName,
          bits: internalSignalBits
        };
        this.diagramSchema.signals.push(signal);
      }
    }
  }

  private extractAllParameters(fileContent: string[], index: number): void {
    for (let i: number = index + 1; !fileContent[i].match('</parameters>'); i++) {
      if (fileContent[i].match('<parameter name=')) {
        const parameterName: string = fileContent[i].slice(fileContent[i].indexOf('\"') + 1, -2);
        const parameterType: string = fileContent[i + 1].slice(fileContent[i + 1]
          .indexOf('>') + 1, -7);
        const parameterValue: string = fileContent[i + 2].slice(fileContent[i + 2]
          .indexOf('>') + 1, -8);
        const parameter: Parameters = {
          name: parameterName,
          type: parameterType,
          value: parameterValue
        };
        this.diagramSchema.parameters.push(parameter);
      }
    }
  }

  private extractMachineType(line: string): string {
    let transformedLine: string = line.substring(line.indexOf('"'));
    transformedLine = transformedLine.replace(/machine_type/gi, '')
      .replace(/(")|(>)|(=)/g, '');
    const splitLine: string[] = transformedLine.split(' ');
    this.diagramSchema.machineType = splitLine[1];
    return splitLine[1];
  }

  private extractState(fileContent: string[], index: number, machineType: string): void {
    const stateNane: string = fileContent[index].slice(fileContent[index].indexOf('\"') + 1, -2);
    const stateID: string = fileContent[index + 1].slice(fileContent[index + 1]
      .indexOf('>') + 1, -5);
    const initialState: boolean = (fileContent[index + 2].slice(fileContent[index + 2]
      .indexOf('>') + 1, -10) === 'true');
    const statePosX: number = Number(fileContent[index + 3].slice(fileContent[index + 3]
      .indexOf('>') + 1, -12));
    const statePosY: number = Number(fileContent[index + 4].slice(fileContent[index + 4]
      .indexOf('>') + 1, -12));
    const outputs: OutputAssignments[] = [];
    const signals: SignalAssignments[] = [];
    if (machineType === 'Moore') {
      for (let i: number = index + 5; !fileContent[i].match('</state'); i++) {
        if (fileContent[i].match('<output name=')) {
          const outputName: string = fileContent[i].slice(fileContent[i].indexOf('\"') + 1, -2);
          const outputBits: string = fileContent[i + 1].slice(fileContent[i + 1]
            .indexOf('>') + 1, -7);
          const outputType: string = fileContent[i + 2].slice(fileContent[i + 2]
            .indexOf('>') + 1, -7);
          const outputValue: string = this.replaceXMLSpecialChars(fileContent[i + 3]
            .slice(fileContent[i + 3].indexOf('>') + 1, -8));
          const outputAssignment: OutputAssignments = {
            name: outputName,
            bits: outputBits,
            type: outputType,
            value: outputValue
          };
          outputs.push(outputAssignment);
        } else if (fileContent[i].match('<signal name=')) {
          const signalName: string = fileContent[i].slice(fileContent[i].indexOf('\"') + 1, -2);
          const signalBits: string = fileContent[i + 1].slice(fileContent[i + 1]
            .indexOf('>') + 1, -7);
          const signalType: string = fileContent[i + 2].slice(fileContent[i + 2]
            .indexOf('>') + 1, -7);
          const signalValue: string = this.replaceXMLSpecialChars(fileContent[i + 3]
            .slice(fileContent[i + 3].indexOf('>') + 1, -8));
          const signalAssignment: SignalAssignments = {
            name: signalName,
            bits: signalBits,
            type: signalType,
            value: signalValue
          };
          signals.push(signalAssignment);
        }
      }
    }
    const newState: CollabState = {
      name: stateNane,
      initial: initialState,
      id: stateID,
      outputs,
      signals,
      position: {x: statePosX, y: statePosY}
    };
    this.diagramSchema.states.push(newState);
  }

  private replaceXMLSpecialChars(inputString: string): string {
    return inputString.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&').replace(/&quot;/g, '\"')
      .replace(/&apos;/g, '\'');
  }
}
