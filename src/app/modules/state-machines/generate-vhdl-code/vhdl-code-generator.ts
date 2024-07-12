import {Component, EventEmitter, Output} from '@angular/core';
import {VhdlGenData} from '../other-classes/vhdlGenData';

@Component({
  selector: 'app-vhdl-code-generator',
  template: ``
})

export class VhdlCodeGeneratorComponent {

  @Output() public vhdlCodeGenerated: EventEmitter<string> = new EventEmitter<string>();

  private sourceCode: string;
  private properties: VhdlGenData;
  private stateData: any;
  private transitionData: any;
  private inputs: any;
  private outputs: any;
  private signals: any;
  private parameters: any;
  private machineType: string;

  public generateCode(
    codeProperties: VhdlGenData,
    statesData: any,
    transitionsData: any,
    inputsData: any,
    outputsData: any,
    signalsData: any,
    parametersData: any,
    machineType: string
  ): void {
    this.properties = codeProperties;
    this.stateData = statesData;
    this.transitionData = transitionsData;
    this.inputs = inputsData;
    this.outputs = outputsData;
    this.signals = signalsData;
    this.parameters = parametersData;
    this.machineType = machineType;
    this.sourceCode = this.createCode();
    this.vhdlCodeGenerated.emit(this.sourceCode);
  }

  private insertInputsAndOutputs(): string {
    let inputAndOutputCode: string = '';
    for (const input of this.inputs.data) {
      inputAndOutputCode += ';\n';
      if (input.bits === '1') {
        inputAndOutputCode += '    ' + input.name + ' : in std_logic';
      } else {
        inputAndOutputCode += '    ' + input.name + ' : in std_logic_vector(' +
          (input.bits - 1) + ' downto 0)';
      }
    }
    for (const output of this.outputs.data) {
      inputAndOutputCode += ';\n';
      if (output.bits === '1') {
        inputAndOutputCode += '    ' + output.name + ' : out std_logic';
      } else {
        inputAndOutputCode += '    ' + output.name + ' : out std_logic_vector(' +
          (output.bits - 1) + ' downto 0)';
      }
    }
    return inputAndOutputCode;
  }

  private insertInternalSignalDeclarations(): string {
    let internalSignalsDeclarationCode: string = '';
    for (const signal of this.signals.data) {
      if (signal.bits === '1') {
        internalSignalsDeclarationCode += '  signal ' + signal.name + ' : std_logic;\n';
      } else {
        internalSignalsDeclarationCode += '  signal ' + signal.name + ' : std_logic_vector(' +
          String(Number(signal.bits) - 1) + ' downto 0);\n';
      }
    }
    return internalSignalsDeclarationCode;
  }

  private insertParameterDeclarations(): string {
    let parameterDeclarationsCode: string = '';
    for (const parameter of this.parameters.data) {
      parameterDeclarationsCode += '  constant ' + parameter.name + ' : ' + parameter.type + ' := '
        + parameter.value + ';\n';
    }
    return parameterDeclarationsCode;
  }

  private insertStateNames(): string {
    let code: string = '';
    for (const state of this.stateData) {
      if (state === this.stateData[this.stateData.length - 1]) {
        code += state.attributes.name;
      } else {
        code += state.attributes.name + ', ';
      }
    }
    return code;
  }

  private returnInitialStateName(): string {
    for (const state of this.stateData) {
      if (state.attributes.initial === true) {
        return state.attributes.name;
      }
    }
  }

  private returnStateNameBasedOnId(id: string): string {
    for (const state of this.stateData) {
      if (state.attributes.id === id) {
        return state.attributes.name;
      }
    }
  }

  private insertStateTransitions(spacing: number, stateReg: string): string {
    let code: string = '';
    for (const state of this.stateData) {
      code += ' '.repeat(spacing) + 'when ' + state.attributes.name + ' =>\n';
      let counter: number = 1;
      for (const transition of this.transitionData) {
        if (counter === 1 && transition.attributes.source.id === state.attributes.id) {
          code += ' '.repeat(spacing + 2) + 'if (';
          code += transition.attributes.equation + ') then\n';
          code += ' '.repeat(spacing + 4) + stateReg + ' <= ';
          code += this.returnStateNameBasedOnId(transition.attributes.target.id);
          code += ';\n';
          counter = counter + 1;
        } else if (counter > 1 && transition.attributes.source.id === state.attributes.id) {
          code += ' '.repeat(spacing + 2) + 'elsif (';
          code += transition.attributes.equation + ') then\n';
          code += ' '.repeat(spacing + 4) + stateReg + ' <= ';
          code += this.returnStateNameBasedOnId(transition.attributes.target.id);
          code += ';\n';
        }
      }
      code += ' '.repeat(spacing + 2) + 'else\n';
      if (stateReg === 'current_state') {
        code += ' '.repeat(spacing + 4) + 'current_state <= ' + state.attributes.name + ';\n';
      } else if (stateReg === 'next_state') {
        code += ' '.repeat(spacing + 4) + 'next_state <= ' + state.attributes.name + ';\n';
      }
      code += ' '.repeat(spacing + 2) + 'end if;\n';
    }
    return code;
  }

  private decideAssignmentBeginning(assignmentType: string, assignmentValue: string): string {
    if (assignmentType === 'Binary') {
      return 'b\"' + assignmentValue + '\";';
    } else if (assignmentType === 'Octal') {
      return 'o\"' + assignmentValue + '\";';
    } else if (assignmentType === 'Decimal') {
      const binaryValue: string = Number(assignmentValue).toString(2);
      return 'b\"' + binaryValue + '\";';
    } else if (assignmentType === 'Hexadecimal') {
      return 'x\"' + assignmentValue + '\";';
    }
  }

  private insertOutputAndSignalAssignments(spacing: number): string {
    let outputAssignmentsCode: string = '';
    for (const state of this.stateData) {
      outputAssignmentsCode += ' '.repeat(spacing) + 'when ' + state.attributes.name + ' =>\n';
      let counter: number = 1;
      for (const transition of this.transitionData) {
        if (counter === 1 && transition.attributes.source.id === state.attributes.id) {
          outputAssignmentsCode += ' '.repeat(spacing + 2) + 'if (';
          outputAssignmentsCode += transition.attributes.equation + ') then\n';
          for (const output of transition.attributes.outputs) {
            if (output.value !== '') {
              outputAssignmentsCode += ' '.repeat(spacing + 4) + output.name;
              outputAssignmentsCode += ' <= ';
              outputAssignmentsCode += this.decideAssignmentBeginning(output.type, output.value) + '\n';
            }
          }
          for (const signal of transition.attributes.signals) {
            if (signal.value !== '') {
              outputAssignmentsCode += ' '.repeat(spacing + 4) + signal.name;
              outputAssignmentsCode += ' <= ';
              outputAssignmentsCode += this.decideAssignmentBeginning(signal.type, signal.value) + '\n';
            }
          }
          counter = counter + 1;
        } else if (counter > 1 && transition.attributes.source.id === state.attributes.id) {
          outputAssignmentsCode += ' '.repeat(spacing + 2) + 'elsif (';
          outputAssignmentsCode += transition.attributes.equation + ') then\n';
          for (const output of transition.attributes.outputs) {
            if (output.value !== '') {
              outputAssignmentsCode += ' '.repeat(spacing + 4) + output.name;
              outputAssignmentsCode += ' <= ';
              outputAssignmentsCode += this.decideAssignmentBeginning(output.type, output.value) + '\n';
            }
          }
          for (const signal of transition.attributes.signals) {
            if (signal.value !== '') {
              outputAssignmentsCode += ' '.repeat(spacing + 4) + signal.name;
              outputAssignmentsCode += ' <= ';
              outputAssignmentsCode += this.decideAssignmentBeginning(signal.type, signal.value) + '\n';
            }
          }
        }
      }
      outputAssignmentsCode += ' '.repeat(spacing + 2) + 'end if;\n';
    }
    return outputAssignmentsCode;
  }

  private insertMooreOutputAssignments(spacing: number): string {
    let code: string = '';
    for (const state of this.stateData) {
      code += ' '.repeat(spacing);
      code += 'when ' + state.attributes.name + ' =>\n';
      for (const output of state.attributes.outputs) {
        if (output.value !== '') {
          code += ' '.repeat(spacing + 2);
          code += output.name + ' <= ';
          code += this.decideAssignmentBeginning(output.type, output.value);
          code += '\n';
        }
      }
      for (const signal of state.attributes.signals) {
        if (signal.value !== '') {
          code += ' '.repeat(spacing + 2);
          code += signal.name + ' <= ';
          code += this.decideAssignmentBeginning(signal.type, signal.value);
          code += '\n';
        }
      }
    }
    return code;
  }

  private createCode(): string {
    let code: string = '';
    /*Header*/
    code += 'library ieee;\n';
    code += 'use ieee.std_logic_1164.all;\n\n';
    /*Entity*/
    code += 'entity ' + this.properties.entityName + ' is\n';
    code += '  port (\n';
    code += '    clk : in std_logic;\n' + '    reset : in std_logic';
    code += this.insertInputsAndOutputs();
    code += '\n  );\n';
    code += 'end ' + this.properties.entityName + ';\n\n';
    if (this.properties.processNumber === '3 processes') {
      code += this.createArchitectureHeader(true);
    } else {
      code += this.createArchitectureHeader(false);
    }
    if (this.machineType === 'Mealy') {
      if (this.properties.processNumber === '1 process') {
        code += this.createSingleProcess();
      } else if (this.properties.processNumber === '2 processes') {
        code += this.createTwoProcessesForMealyMachine();
      } else if (this.properties.processNumber === '3 processes') {
        code += this.createSeparateResetProcess();
        code += this.createTwoProcessesForMealyMachine();
      }
    } else {
      if (this.properties.processNumber === '2 processes') {
        code += this.createTwoProcessesForMooreMachine();
      } else if (this.properties.processNumber === '3 processes') {
        code += this.createSeparateResetProcess();
        code += this.createTwoProcessesForMooreMachine();
      }
    }
    code += 'end ' + this.properties.architectureName + ';';
    return code;
  }

  private createArchitectureHeader(twoRegs: boolean): string {
    let code: string;
    code = '';
    code += 'architecture ' + this.properties.architectureName + ' of '
      + this.properties.entityName + ' is\n';
    code += '  type state_type is (' + this.insertStateNames() + ');\n';
    if (twoRegs) {
      code += '  signal current_state, next_state : state_type;\n';
    } else {
      code += '  signal current_state : state_type;\n';
    }
    code += this.insertParameterDeclarations();
    code += this.insertInternalSignalDeclarations();
    code += '\n';
    code += 'begin\n';
    return code;
  }

  private createDefaultOutputAndSignalAssignments(spacing: number): string {
    const standardZero: number = 0;
    let code: string;
    code = '';
    for (const output of this.outputs.data) {
      code += ' '.repeat(spacing);
      code += output.name + ' <= b"';
      code += standardZero.toString(2).padStart(output.bits, '0');
      code += '";\n';
    }
    for (const signal of this.signals.data) {
      code += ' '.repeat(spacing);
      code += signal.name + ' <= b"';
      code += standardZero.toString(2).padStart(signal.bits, '0');
      code += '";\n';
    }
    return code;
  }

  private createSeparateResetProcess(): string {
    let code: string;
    code = '';
    code += '  process (clk, reset) begin\n';
    code += '    if (reset = \'1\') then\n';
    code += '      current_state <= ' + this.returnInitialStateName() + ';\n';
    code += '    elsif (clk\'event and clk = \'1\') then\n';
    code += '      current_state <= next_state;\n';
    code += '    end if;\n';
    code += '  end process;\n\n';
    return code;
  }

  private createSingleProcessCode(spacing: number, stateReg: string): string {
    let code: string;
    code = '';
    for (const state of this.stateData) {
      code += ' '.repeat(spacing) + 'when ' + state.attributes.name + ' =>\n';
      let counter: number = 1;
      for (const transition of this.transitionData) {
        if (counter === 1 && transition.attributes.source.id === state.attributes.id) {
          code += ' '.repeat(spacing + 2) + 'if (';
          code += transition.attributes.equation + ') then\n';
          code += ' '.repeat(spacing + 4) + stateReg + ' <= ';
          code += this.returnStateNameBasedOnId(transition.attributes.target.id);
          code += ';\n';
          for (const output of transition.attributes.outputs) {
            if (output.value !== '') {
              code += ' '.repeat(spacing + 4) + output.name + ' <= ';
              code += this.decideAssignmentBeginning(output.type, output.value) + '\n';
            }
          }
          for (const signal of transition.attributes.signals) {
            if (signal.value !== '') {
              code += ' '.repeat(spacing + 4) + signal.name + ' <= ';
              code += this.decideAssignmentBeginning(signal.type, signal.value) + '\n';
            }
          }
          counter = counter + 1;
        } else if (counter > 1 && transition.attributes.source.id === state.attributes.id) {
          code += ' '.repeat(spacing + 2) + 'elsif (';
          code += transition.attributes.equation + ') then\n';
          code += ' '.repeat(spacing + 4) + stateReg + ' <= ';
          code += this.returnStateNameBasedOnId(transition.attributes.target.id);
          code += ';\n';
          for (const output of transition.attributes.outputs) {
            if (output.value !== '') {
              code += ' '.repeat(spacing + 4) + output.name + ' <= ';
              code += this.decideAssignmentBeginning(output.type, output.value) + '\n';
            }
          }
          for (const signal of transition.attributes.signals) {
            if (signal.value !== '') {
              code += ' '.repeat(spacing + 4) + signal.name + ' <= ';
              code += this.decideAssignmentBeginning(signal.type, signal.value) + '\n';
            }
          }
        }
      }
      code += ' '.repeat(spacing + 2) + 'else\n';
      code += ' '.repeat(spacing + 4) + 'current_state <= ' + state.attributes.name + ';\n';
      code += ' '.repeat(spacing + 2) + 'end if;\n';
    }
    return code;
  }

  private createSingleProcess(): string {
    let code: string;
    code = '';
    code += '  process (clk, reset) begin\n';
    code += '    if (reset = \'1\') then\n';
    code += '      current_state <= ' + this.returnInitialStateName() + ';\n';
    code += this.createDefaultOutputAndSignalAssignments(6);
    code += '    elsif (clk\'event and clk = \'1\') then\n';
    code += '      case current_state is\n';
    code += this.createSingleProcessCode(8, 'current_state');
    code += '        when others =>\n';
    code += '          current_state <= ' + this.returnInitialStateName() + ';\n';
    const standardZero: number = 0;
    for (const output of this.outputs.data) {
      code += ' '.repeat(10);
      code += output.name + ' <= b"';
      code += standardZero.toString(2).padStart(output.bits, '0');
      code += '";\n';
    }
    for (const signal of this.signals.data) {
      code += ' '.repeat(10);
      code += signal.name + ' <= b"';
      code += standardZero.toString(2).padStart(signal.bits, '0');
      code += '";\n';
    }
    code += '      end case;\n';
    code += '    end if;\n';
    code += '  end process;\n\n';
    return code;
  }

  private createTwoProcessesForMealyMachine(): string {
    let code: string;
    code = '';
    if (this.properties.processNumber === '2 processes') {
      /*First process*/
      code += '  process (clk, reset) begin\n';
      code += '    if (reset = \'1\') then\n';
      code += '      current_state <= ' + this.returnInitialStateName() + ';\n';
      code += '    elsif (clk\'event and clk = \'1\') then\n';
      code += '      case current_state is\n';
      code += this.insertStateTransitions(8, 'current_state');
      code += '        when others =>\n';
      code += '          current_state <= ' + this.returnInitialStateName() + ';\n';
      code += '      end case;\n';
      code += '    end if;\n';
      code += '  end process;\n\n';
      /*First process ends*/
    } else if (this.properties.processNumber === '3 processes') {
      code += '  process (current_state) begin\n';
      code += '    next_state <= current_state;\n';
      code += '    case current_state is\n';
      code += this.insertStateTransitions(6, 'next_state');
      code += '      when others =>\n';
      code += '        next_state <= ' + this.returnInitialStateName() + ';\n';
      code += '    end case;\n';
      code += '  end process;\n\n';
    }

    /*Second process*/
    code += '  process (';
    if (this.properties.processNumber === '2 processes') {
      code += 'current_state) begin\n';
      code += '    case current_state is\n';
    } else if (this.properties.processNumber === '3 processes') {
      code += 'next_state) begin\n';
      code += '    case next_state is\n';
    }
    code += this.insertOutputAndSignalAssignments(6);
    code += ' '.repeat(6) + 'when others =>\n';
    const standardZero: number = 0;
    for (const output of this.outputs.data) {
      code += ' '.repeat(8);
      code += output.name + ' <= b"';
      code += standardZero.toString(2).padStart(output.bits, '0');
      code += '";\n';
    }
    for (const signal of this.signals.data) {
      code += ' '.repeat(8);
      code += signal.name + ' <= b"';
      code += standardZero.toString(2).padStart(signal.bits, '0');
      code += '";\n';
    }
    code += '    end case;\n';
    code += '  end process;\n\n';
    /*Second process ends*/
    return code;
  }

  private createTwoProcessesForMooreMachine(): string {
    let code: string;
    code = '';
    /*First process*/
    if (this.properties.processNumber === '2 processes') {
      code += '  process (clk, reset) begin\n';
      code += '    if (reset = \'1\') then\n';
      code += '      current_state <= ' + this.returnInitialStateName() + ';\n';
      code += '    elsif (clk\'event and clk = \'1\') then\n';
      code += '      case current_state is\n';
      code += this.insertStateTransitions(8, 'current_state');
      code += '        when others =>\n';
      code += '          current_state <= ' + this.returnInitialStateName() + ';\n';
      code += '      end case;\n';
      code += '    end if;\n';
      code += '  end process;\n\n';
    } else if (this.properties.processNumber === '3 processes') {
      code += '  process (current_state) begin\n';
      code += '    next_state <= current_state;\n';
      code += '    case current_state is\n';
      code += this.insertStateTransitions(6, 'next_state');
      code += '      when others =>\n';
      code += '        next_state <= ' + this.returnInitialStateName() + ';\n';
      code += '    end case;\n';
      code += '  end process;\n\n';
    }
    /*First process ends*/

    /*Second process*/
    code += '  process (';
    if (this.properties.processNumber === '2 processes') {
      code += 'current_state) begin\n';
      code += '    case current_state is\n';
    } else if (this.properties.processNumber === '3 processes') {
      code += 'next_state) begin\n';
      code += '    case next_state is\n';
    }
    code += this.insertMooreOutputAssignments(6);
    code += ' '.repeat(6) + 'when others =>\n';
    const standardZero: number = 0;
    for (const output of this.outputs.data) {
      code += ' '.repeat(8);
      code += output.name + ' <= b"';
      code += standardZero.toString(2).padStart(output.bits, '0');
      code += '";\n';
    }
    for (const signal of this.signals.data) {
      code += ' '.repeat(8);
      code += signal.name + ' <= b"';
      code += standardZero.toString(2).padStart(signal.bits, '0');
      code += '";\n';    }
    code += '    end case;\n';
    code += '  end process;\n\n';
    /*Second process ends*/
    return code;
  }
}
