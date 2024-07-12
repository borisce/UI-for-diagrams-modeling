import {Component, EventEmitter, Output} from '@angular/core';
import {SystemVerilogGenData} from '../other-classes/systemVerilogGenData';

@Component({
  template: ``,
  selector: 'app-systemverilog-code-generator'
})

export class SystemVerilogCodeGeneratorComponent {

  @Output() public systemVerilogCodeGenerated: EventEmitter<string> = new EventEmitter<string>();

  private sourceCode: string;
  private properties: SystemVerilogGenData; // applies for Verilog too
  private stateData: any;
  private transitionData: any;
  private inputs: any;
  private outputs: any;
  private signals: any;
  private parameters: any;
  private machineType: string;
  private stateSize: number;

  public generateCode(
    codeProperties: SystemVerilogGenData,
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
    this.systemVerilogCodeGenerated.emit(this.sourceCode);
  }

  private createCode(): string {
    let code: string = '';
    /*Header*/
    code += 'module ' + this.properties.moduleName + '(\n';
    if (this.properties.language === 'SystemVerilog') {
      code += '  input   logic       clk,\n';
      code += '  input   logic       rst';
    } else {
      code += '  input   wire        clk,\n';
      code += '  input   wire        rst';
    }
    for (const input of this.inputs.data) {
      code += ',\n';
      if (input.bits === '1' && this.properties.language === 'SystemVerilog') {
        code += '  input   logic       ' + input.name;
      } else if (input.bits === '1' && this.properties.language === 'Verilog') {
        code += '  input   wire        ' + input.name;
      } else if (this.properties.language === 'SystemVerilog') {
        code += '  input   logic [' + Number(input.bits - 1) + ':0] ' + input.name;
      } else {
        code += '  input   wire [' + Number(input.bits - 1) + ':0]  ' + input.name;
      }
    }
    for (const output of this.outputs.data) {
      code += ',\n';
      if (output.bits === '1' && this.properties.language === 'SystemVerilog') {
        code += '  output  logic       ' + output.name;
      } else if (output.bits === '1' && this.properties.language === 'Verilog') {
        code += '  output  reg         ' + output.name;
      } else if (this.properties.language === 'SystemVerilog') {
        code += '  output  logic [' + Number(output.bits - 1) + ':0] ' + output.name;
      } else {
        code += '  output  reg [' + Number(output.bits - 1) + ':0]   ' + output.name;
      }
    }
    code += '\n);\n\n';
    /*Header ending*/

    /*Parameters*/
    if (this.parameters.data.length !== 0) {
      code += '  parameter ';
      for (let i: number = 0; i < this.parameters.data.length; i++) {
        if (i !== 0) {
          code += ',\n            ';
          code += this.parameters.data[i].name + ' = ' + this.parameters.data[i].value;
        } else {
          code += this.parameters.data[i].name + ' = ' + this.parameters.data[i].value;
        }
      }
      code += ';\n\n';
    }
    /*Parameters Ending*/

    /*Internal Signals*/
    for (const signal of this.signals.data) {
      if (signal.bits === '1' && this.properties.language === 'SystemVerilog') {
        code += '  logic ' + signal.name + ';\n';
      } else if (signal.bits === '1' && this.properties.language === 'Verilog') {
        code += '  reg ' + signal.name + ';\n';
      } else if (this.properties.language === 'SystemVerilog') {
        code += '  logic [' + Number(signal.bits - 1) + ':0] ' + signal.name + ';\n';
      } else {
        code += '  reg [' + Number(signal.bits - 1) + ':0] ' + signal.name + ';\n';
      }
    }
    code += '\n';
    /*Internal Signals Ending*/

    /*State Encoding*/
    code += '  localparam ';
    switch (this.properties.stateEncoding) {
      case '1: Binary':
        code += this.getBinaryEncodingOfStates();
        break;
      case '2: One-hot':
        code += this.getOneHotEncodingOfState();
        break;
      case '3: One-cold':
        code += this.getOneColdEncodingOfState();
        break;
      case '4: Gray':
        code += this.getGrayEncodingOfStates();
        break;
      case '5: Hamming distance':
        code += this.getHammingDistanceEncoding(Number(this.properties.hammingDistance));
        break;
      default:
        break;
    }
    code += ';\n\n';
    if (this.properties.alwaysBlocksNumber === '3 always blocks' && this.properties.language === 'SystemVerilog') {
      code += '  logic [' + (this.stateSize - 1) + ':0] current_state, next_state;\n\n';
    } else if (this.properties.language === 'SystemVerilog') {
      code += '  logic [' + (this.stateSize - 1) + ':0] current_state;\n\n';
    } else if (this.properties.alwaysBlocksNumber === '3 always blocks'
      && this.properties.language === 'Verilog') {
      code += '  reg [' + (this.stateSize - 1) + ':0] current_state, next_state;\n\n';
    } else {
      code += '  reg [' + (this.stateSize - 1) + ':0] current_state;\n\n';
    }
    /*State Encoding Ending*/

    /*Mealy or Moore*/
    if (this.machineType === 'Mealy') {
      switch (this.properties.alwaysBlocksNumber) {
        case '1 always block':
          code += this.createAlwaysBlockForMealyMachine();
          break;
        case '2 always blocks':
          code += this.createTwoAlwaysBlocksForMealyMachine();
          break;
        case '3 always blocks':
          code += this.createThreeAlwaysBlocksForMealyMachine();
          break;
        default:
          code += '';
          break;
      }
    } else {
      switch (this.properties.alwaysBlocksNumber) {
        case '2 always blocks':
          code += this.createTwoAlwaysBlocksForMooreMachine();
          break;
        case '3 always blocks':
          code += this.createThreeAlwaysBlocksForMooreMachine();
          break;
        default:
          code += '';
          break;
      }
    }
    if (this.properties.language === 'Verilog') {
      code += 'endmodule';
    } else {
      code += 'endmodule : ' + this.properties.moduleName;
    }
    return code;
  }

  private createAlwaysBlockForMealyMachine(): string {
    let code: string = '';
    if (this.properties.language === 'SystemVerilog') {
      code += '  always_ff @(posedge clk, negedge rst) begin\n';
    } else {
      code += '  always @(posedge clk, negedge rst) begin\n';
    }
    code += '    if (!rst) begin\n';
    code += '      current_state <= ' + this.getInitialState().attributes.name + ';\n';
    code += this.createDefaultOutputAssignments(6, ' <= ');
    code += '    end else begin\n';
    code += '      case (current_state)\n';
    code += this.createInitialStateIfStatementBlock(8, ' <= ', 'both', 'current_state');
    code += this.createRegularStateIfStatementBlock(8, ' <= ', 'both', 'current_state');
    code += '      endcase\n';
    code += '    end\n';
    code += '  end\n';
    return code;
  }

  private createDefaultOutputAssignments(spacing: number, assignChar: string): string {
    let defaultOutputAssignmentsCode: string = '';
    for (const output of this.outputs.data) {
      for (let i: number = 1; i <= spacing; i++) {
        defaultOutputAssignmentsCode += ' ';
      }
      defaultOutputAssignmentsCode += output.name + assignChar;
      defaultOutputAssignmentsCode += output.bits + '\'b' + this.getBinaryValue(0, output.bits) + ';\n';
    }
    for (const signal of this.signals.data) {
      for (let j: number = 1; j <= spacing; j++) {
        defaultOutputAssignmentsCode += ' ';
      }
      defaultOutputAssignmentsCode += signal.name + assignChar;
      defaultOutputAssignmentsCode += signal.bits + '\'b' + this.getBinaryValue(0, signal.bits) + ';\n';
    }
    return defaultOutputAssignmentsCode;
  }

  private decideAssignmentBeginning(assignmentType: string, assignmentValue: string): string {
    if (assignmentType === 'Binary') {
      return String(assignmentValue.length) + '\'b' + assignmentValue;
    } else if (assignmentType === 'Octal') {
      return String(assignmentValue.length * 3) + '\'o' + assignmentValue;
    } else if (assignmentType === 'Decimal') {
      const binaryString: string = Number(assignmentValue).toString(2);
      return String(binaryString.length) + '\'d' + assignmentValue;
    } else if (assignmentType === 'Hexadecimal') {
      return String(assignmentValue.length * 4) + '\'h' + assignmentValue;
    }
  }

  private createInitialStateIfStatementBlock(
    spacing: number,
    assignChar: string,
    blockType: string,
    stateReg: string
  ): string {
    let initialStateIfStatementBlock: string = '';
    let firstTransition: boolean = true;
    const initialState: any = this.getInitialState();
    initialStateIfStatementBlock += ' '.repeat(spacing) + initialState.attributes.name + ' : begin\n';
    for (const transition of this.transitionData) {
      if (transition.attributes.source.id === initialState.attributes.id && firstTransition) {
        initialStateIfStatementBlock += ' '.repeat(spacing + 2);
        initialStateIfStatementBlock += 'if (' + transition.attributes.equation + ') begin\n';
        if (blockType === 'both' || blockType === 'state') {
          initialStateIfStatementBlock += ' '.repeat(spacing + 4);
          initialStateIfStatementBlock += stateReg + assignChar;
          for (const nextState of this.stateData) {
            if (nextState.attributes.id === transition.attributes.target.id) {
              initialStateIfStatementBlock += nextState.attributes.name + ';\n';
              break;
            }
          }
        }
        if (blockType === 'both' || blockType === 'outputs') {
          for (const output of transition.attributes.outputs) {
            if (output.value !== '') {
              initialStateIfStatementBlock += ' '.repeat(spacing + 4);
              initialStateIfStatementBlock += output.name + assignChar;
              initialStateIfStatementBlock +=
                this.decideAssignmentBeginning(output.type, output.value) + ';\n';
            }
          }
          for (const signal of transition.attributes.signals) {
            if (signal.value !== '') {
              initialStateIfStatementBlock += ' '.repeat(spacing + 4);
              initialStateIfStatementBlock += signal.name + assignChar;
              initialStateIfStatementBlock +=
                this.decideAssignmentBeginning(signal.type, signal.value) + ';\n';
            }
          }
        }
        initialStateIfStatementBlock += ' '.repeat(spacing + 2) + 'end';
        firstTransition = false;
      } else if (transition.attributes.source.id === initialState.attributes.id
        && !firstTransition) {
        initialStateIfStatementBlock += ' else if (' + transition.attributes.equation + ') begin\n';
        if (blockType === 'both' || blockType === 'state') {
          initialStateIfStatementBlock += ' '.repeat(spacing + 4);
          initialStateIfStatementBlock += stateReg + assignChar;
          for (const nextState of this.stateData) {
            if (nextState.attributes.id === transition.attributes.target.id) {
              initialStateIfStatementBlock += nextState.attributes.name + ';\n';
              break;
            }
          }
        }
        if (blockType === 'both' || blockType === 'outputs') {
          for (const output of transition.attributes.outputs) {
            if (output.value !== '') {
              initialStateIfStatementBlock += ' '.repeat(spacing + 4);
              initialStateIfStatementBlock += output.name + assignChar;
              initialStateIfStatementBlock +=
                this.decideAssignmentBeginning(output.type, output.value) + ';\n';
            }
          }
          for (const signal of transition.attributes.signals) {
            if (signal.value !== '') {
              initialStateIfStatementBlock += ' '.repeat(spacing + 4);
              initialStateIfStatementBlock += signal.name + assignChar;
              initialStateIfStatementBlock +=
                this.decideAssignmentBeginning(signal.type, signal.value) + ';\n';
            }
          }
        }
        initialStateIfStatementBlock += ' '.repeat(spacing + 2) + 'end';
      }
    }
    initialStateIfStatementBlock += '\n' + ' '.repeat(spacing) + 'end\n';
    return initialStateIfStatementBlock;
  }

  private createRegularStateIfStatementBlock(
    spacing: number,
    assignType: string,
    blockType: string,
    stateReg: string
  ): string {
    let regularStateIfStatementBlock: string = '';
    let firstTransition: boolean = true;
    const initialState: any = this.getInitialState();
    for (const state of this.stateData) {
      if (state.attributes.id !== initialState.attributes.id) {
        regularStateIfStatementBlock += ' '.repeat(spacing);
        regularStateIfStatementBlock += state.attributes.name + ' : begin\n';
        for (const transition of this.transitionData) {
          if (transition.attributes.source.id === state.attributes.id && firstTransition) {
            regularStateIfStatementBlock += ' '.repeat(spacing + 2);
            regularStateIfStatementBlock += 'if (' + transition.attributes.equation + ') begin\n';
            if (blockType === 'both' || blockType === 'state') {
              regularStateIfStatementBlock += ' '.repeat(spacing + 4);
              regularStateIfStatementBlock += stateReg + assignType;
              for (const nextState of this.stateData) {
                if (nextState.attributes.id === transition.attributes.target.id) {
                  regularStateIfStatementBlock += nextState.attributes.name + ';\n';
                  break;
                }
              }
            }
            if (blockType === 'both' || blockType === 'outputs') {
              for (const output of transition.attributes.outputs) {
                if (output.value !== '') {
                  regularStateIfStatementBlock += ' '.repeat(spacing + 4);
                  regularStateIfStatementBlock += output.name + assignType;
                  regularStateIfStatementBlock +=
                    this.decideAssignmentBeginning(output.type, output.value) + ';\n';
                }
              }
              for (const signal of transition.attributes.signals) {
                if (signal.value !== '') {
                  regularStateIfStatementBlock += ' '.repeat(spacing + 4);
                  regularStateIfStatementBlock += signal.name + assignType;
                  regularStateIfStatementBlock +=
                    this.decideAssignmentBeginning(signal.type, signal.value) + ';\n';
                }
              }
            }
            regularStateIfStatementBlock += ' '.repeat(spacing + 2) + 'end';
            firstTransition = false;
          } else if (transition.attributes.source.id === state.attributes.id && !firstTransition) {
            regularStateIfStatementBlock += ' else if (' + transition.attributes.equation + ') begin\n';
            if (blockType === 'both' || blockType === 'state') {
              regularStateIfStatementBlock += ' '.repeat(spacing + 4);
              regularStateIfStatementBlock += stateReg + assignType;
              for (const nextState of this.stateData) {
                if (nextState.attributes.id === transition.attributes.target.id) {
                  regularStateIfStatementBlock += nextState.attributes.name + ';\n';
                  break;
                }
              }
            }
            if (blockType === 'both' || blockType === 'outputs') {
              for (const output of transition.attributes.outputs) {
                if (output.value !== '') {
                  regularStateIfStatementBlock += ' '.repeat(spacing + 4);
                  regularStateIfStatementBlock += output.name + assignType;
                  regularStateIfStatementBlock +=
                    this.decideAssignmentBeginning(output.type, output.value) + ';\n';
                }
              }
              for (const signal of transition.attributes.signals) {
                if (signal.value !== '') {
                  regularStateIfStatementBlock += ' '.repeat(spacing + 4);
                  regularStateIfStatementBlock += signal.name + assignType;
                  regularStateIfStatementBlock +=
                    this.decideAssignmentBeginning(signal.type, signal.value) + ';\n';
                }
              }
            }
            regularStateIfStatementBlock += ' '.repeat(spacing + 2) + 'end';
          }
        }
        regularStateIfStatementBlock += '\n' + ' '.repeat(spacing) + 'end\n';
      }
      firstTransition = true;
    }
    return regularStateIfStatementBlock;
  }


  private createTwoAlwaysBlocksForMealyMachine(): string {
    let code: string = '';
    if (this.properties.language === 'SystemVerilog') {
      code += '  always_ff @(posedge clk, negedge rst) begin\n';
    } else {
      code += '  always @(posedge clk, negedge rst) begin\n';
    }
    code += '    if (!rst) begin\n';
    code += '      current_state <= ' + this.getInitialState().attributes.name + ';\n';
    code += '    end else begin\n';
    code += '      case (current_state)\n';
    code += this.createInitialStateIfStatementBlock(8, ' <= ',
      'state', 'current_state');
    code += this.createRegularStateIfStatementBlock(8, ' <= ',
      'state', 'current_state');
    code += '      endcase\n';
    code += '    end\n';
    code += '  end\n\n';

    if (this.properties.language === 'SystemVerilog') {
      code += '  always_comb begin\n';
    } else {
      code += '  always @(*) begin\n';
    }
    code += this.createDefaultOutputAssignments(4, ' = ');
    code += '    case (current_state)\n';
    code += this.createInitialStateIfStatementBlock(6, ' = ', 'outputs', 'next_state');
    code += this.createRegularStateIfStatementBlock(6, ' = ', 'outputs', 'next_state');
    code += '    endcase\n';
    code += '  end\n';
    return code;
  }

  private createInitialStateOutputAssignmentsForMooreMachine(
    spacing: number,
    assignChar: string
  ): string {
    let code: string = '';
    const initialState: any = this.getInitialState();
    for (const state of this.stateData) {
      if (state.attributes.id === initialState.attributes.id) {
        code += ' '.repeat(spacing);
        code += state.attributes.name + ' : begin\n';
        for (const output of state.attributes.outputs) {
          if (output.value !== '') {
            code += ' '.repeat(spacing + 2);
            code += output.name + assignChar;
            code += this.decideAssignmentBeginning(output.type, output.value) + ';\n';
          }
        }
        for (const signal of state.attributes.signals) {
          if (signal.value !== '') {
            code += ' '.repeat(spacing + 2);
            code += signal.name + assignChar;
            code += this.decideAssignmentBeginning(signal.type, signal.value) + ';\n';
          }
        }
        code += ' '.repeat(spacing) + 'end\n';
        break;
      }
    }
    return code;
  }

  private createStateOutputAssignmentsForMooreMachine(spacing: number, assignChar: string): string {
    let code: string = '';
    const initialState: any = this.getInitialState();
    for (const state of this.stateData) {
      if (state.attributes.id !== initialState.attributes.id) {
        code += ' '.repeat(spacing);
        code += state.attributes.name + ' : begin\n';
        for (const output of state.attributes.outputs) {
          if (output.value !== '') {
            code += ' '.repeat(spacing + 2);
            code += output.name + assignChar;
            code += this.decideAssignmentBeginning(output.type, output.value) + ';\n';
          }
        }
        for (const signal of state.attributes.signals) {
          if (signal.value !== '') {
            code += ' '.repeat(spacing + 2);
            code += signal.name + assignChar;
            code += this.decideAssignmentBeginning(signal.type, signal.value) + ';\n';
          }
        }
        code += ' '.repeat(spacing) + 'end\n';
      }
    }
    return code;
  }

  private createTwoAlwaysBlocksForMooreMachine(): string {
    let mooreMachineCode: string = '';
    if (this.properties.language === 'SystemVerilog') {
      mooreMachineCode += '  always_ff @(posedge clk, negedge rst) begin\n';
    } else {
      mooreMachineCode += '  always @(posedge clk, negedge rst) begin\n';
    }
    mooreMachineCode += '    if (!rst) begin\n';
    mooreMachineCode += '      current_state <= ' + this.getInitialState().attributes.name + ';\n';
    mooreMachineCode += '    end else begin\n';
    mooreMachineCode += '      case (current_state)\n';
    mooreMachineCode += this.createInitialStateIfStatementBlock(8, ' <= ',
      'state', 'current_state');
    mooreMachineCode += this.createRegularStateIfStatementBlock(8, ' <= ',
      'state', 'current_state');
    mooreMachineCode += '      endcase\n';
    mooreMachineCode += '    end\n';
    mooreMachineCode += '  end\n\n';

    if (this.properties.language === 'SystemVerilog') {
      mooreMachineCode += '  always_comb begin\n';
    } else {
      mooreMachineCode += '  always @(*) begin\n';
    }
    mooreMachineCode += this.createDefaultOutputAssignments(4, ' = ');
    mooreMachineCode += '    case (current_state)\n';
    mooreMachineCode += this.createInitialStateOutputAssignmentsForMooreMachine(6, ' = ');
    mooreMachineCode += this.createStateOutputAssignmentsForMooreMachine(6, ' = ');
    // code += this.createDefaultBlock(6, ' = ', 'both', 'next_state');
    mooreMachineCode += '    endcase\n';
    mooreMachineCode += '  end\n';
    return mooreMachineCode;
  }

  private createThreeAlwaysBlocksForMealyMachine(): string {
    let code: string = '';
    if (this.properties.language === 'SystemVerilog') {
      code += '  always_ff @(posedge clk, negedge rst) begin\n';
    } else {
      code += '  always @(posedge clk, negedge rst) begin\n';
    }
    code += '    if (!rst) begin\n';
    code += '      current_state <= ' + this.getInitialState().attributes.name + ';\n';
    code += '    end else begin\n';
    code += '      current_state <= next_state;\n';
    code += '    end\n';
    code += '  end\n\n';
    if (this.properties.language === 'SystemVerilog') {
      code += '  always_comb begin\n';
    } else {
      code += '  always @(*) begin\n';
    }
    code += '    next_state = current_state;\n';
    code += '    case (current_state)\n';
    code += this.createInitialStateIfStatementBlock(6, ' = ', 'state', 'next_state');
    code += this.createRegularStateIfStatementBlock(6, ' = ', 'state', 'next_state');
    code += '    endcase\n';
    code += '  end\n\n';
    if (this.properties.language === 'SystemVerilog') {
      code += '  always_comb begin\n';
    } else {
      code += '  always @(*) begin\n';
    }
    code += this.createDefaultOutputAssignments(4, ' = ');
    code += '    case (next_state)\n';
    code += this.createInitialStateIfStatementBlock(6, ' = ', 'outputs', 'next_state');
    code += this.createRegularStateIfStatementBlock(6, ' = ', 'outputs', 'next_state');
    code += '    endcase\n';
    code += '  end\n';
    return code;
  }

  private createThreeAlwaysBlocksForMooreMachine(): string {
    let mooreMachineCode: string = '';
    if (this.properties.language === 'SystemVerilog') {
      mooreMachineCode += '  always_ff @(posedge clk, negedge rst) begin\n';
    } else {
      mooreMachineCode += '  always @(posedge, negedge rst) begin\n';
    }
    mooreMachineCode += '    if (!rst) begin\n';
    mooreMachineCode += '      current_state <= ' + this.getInitialState().attributes.name + ';\n';
    mooreMachineCode += '    end else begin\n';
    mooreMachineCode += '      current_state <= next_state;\n';
    mooreMachineCode += '    end\n';
    mooreMachineCode += '  end\n\n';
    if (this.properties.language === 'SystemVerilog') {
      mooreMachineCode += '  always_comb begin\n';
    } else {
      mooreMachineCode += '  always @(*) begin\n';
    }
    mooreMachineCode += '    next_state = current_state;\n';
    mooreMachineCode += '    case (current_state)\n';
    mooreMachineCode += this.createInitialStateIfStatementBlock(6, ' = ', 'state', 'next_state');
    mooreMachineCode += this.createRegularStateIfStatementBlock(6, ' = ', 'state', 'next_state');
    mooreMachineCode += '    endcase\n';
    mooreMachineCode += '  end\n\n';
    if (this.properties.language === 'SystemVerilog') {
      mooreMachineCode += '  always_comb begin\n';
    } else {
      mooreMachineCode += '  always @(*) begin\n';
    }
    mooreMachineCode += this.createDefaultOutputAssignments(4, ' = ');
    mooreMachineCode += '    case (next_state)\n';
    mooreMachineCode += this.createInitialStateOutputAssignmentsForMooreMachine(6, ' = ');
    mooreMachineCode += this.createStateOutputAssignmentsForMooreMachine(6, ' = ');
    mooreMachineCode += '    endcase\n';
    mooreMachineCode += '  end\n';
    return mooreMachineCode;
  }

  private getInitialState(): any {
    for (const state of this.stateData) {
      if (state.attributes.initial === true) {
        return state;
      }
    }
  }

  private getBinaryEncodingOfStates(): string {
    let code: string = '';
    /*initial state declaration*/
    const initialState: any = this.getInitialState();
    this.stateSize = this.determineSizeForBinaryEncoding();
    code += '[' + (this.stateSize - 1) + ':0]\n';
    code += '    ' + initialState.attributes.name + ' = ' + this.stateSize + '\'b';
    code += this.getBinaryValue(0, this.stateSize);
    /*initial state declaration ending*/
    let order: number = 1;
    for (const state of this.stateData) {
      if (state !== initialState) {
        code += ',\n';
        code += '    ' + state.attributes.name + ' = ' + this.stateSize + '\'b';
        code += this.getBinaryValue(order, this.stateSize);
        order = order + 1;
      }
    }
    return code;
  }

  private getBinaryValue(stateNumber: number, stateSize: number): string {
    return stateNumber.toString(2).padStart(stateSize, '0');
  }

  private determineSizeForBinaryEncoding(): number {
    const statesNumber: number = this.countNumberOfStates();
    for (let i: number = 0; i < 1000000; i++) {
      if (Math.pow(2, i) >= statesNumber) {
        return i;
      }
    }
    return 0;
  }

  private countNumberOfStates(): number {
    let stateCount: number = 0;
    for (const state of this.stateData) {
      stateCount = stateCount + 1;
    }
    return stateCount;
  }

  private getOneHotValue(stateNumber: number): string {
    return stateNumber.toString(2).padStart(this.stateSize, '0');
  }

  private xor_c(a: string, b: string): string {
    return (a === b) ? '0' : '1';
  }

  private convertBinaryToGray(binaryValue: string): string {
    const binary: string[] = binaryValue.split('');
    let gray: string = '';
    gray += binary[0];
    for (let i: number = 1; i < binary.length; i++) {
      gray += this.xor_c(binary[i - 1], binary[i]);
    }
    return gray;
  }

  private getOneColdValue(stateNumber: number): string {
    let binaryInterpretation: string = '';
    for (let i: number = this.stateSize; i > 0; i--) {
      if (i === stateNumber) {
        binaryInterpretation += '0';
      } else {
        binaryInterpretation += '1';
      }
    }
    return binaryInterpretation;
  }

  private getOneHotEncodingOfState(): string {
    let code: string = '';
    const initialState: any = this.getInitialState();
    this.stateSize = this.countNumberOfStates();
    code += '[' + (this.stateSize - 1) + ':0]\n';
    /*initial state declaration*/
    code += '    ' + initialState.attributes.name + ' = ' + this.stateSize + '\'b';
    code += this.getOneHotValue(1);
    /*initial state declaration ending*/
    let stateNumber: number = 2;
    for (const state of this.stateData) {
      if (state !== initialState) {
        code += ',\n';
        code += '    ' + state.attributes.name + ' = ' + this.stateSize + '\'b';
        code += this.getOneHotValue(stateNumber);
        stateNumber = stateNumber * 2;
      }
    }
    return code;
  }

  private getOneColdEncodingOfState(): string {
    let code: string = '';
    const initialState: any = this.getInitialState();
    this.stateSize = this.countNumberOfStates();
    /*initial state declaration*/
    code += '[' + (this.stateSize - 1) + ':0]\n';
    code += '    ' + initialState.attributes.name + ' = ' + this.stateSize + '\'b';
    code += this.getOneColdValue(1);
    /*initial state declaration ending*/
    let stateNumber: number = 2;
    for (const state of this.stateData) {
      if (state !== initialState) {
        code += ',\n';
        code += '    ' + state.attributes.name + ' = ' + this.stateSize + '\'b';
        code += this.getOneColdValue(stateNumber);
        stateNumber = stateNumber + 1;
      }
    }
    return code;
  }

  private getGrayEncodingOfStates(): string {
    let code: string = '';
    const initialState: any = this.getInitialState();
    this.stateSize = this.determineSizeForBinaryEncoding();
    /*initial state declaration*/
    const initial: number = 0;
    code += '[' + (this.stateSize - 1) + ':0]\n';
    code += '    ' + initialState.attributes.name + ' = ' + this.stateSize + '\'b';
    code += this.convertBinaryToGray(initial.toString(2).padStart(this.stateSize, '0'));
    /*initial state declaration ending*/
    let stateNumber: number = 1;
    for (const state of this.stateData) {
      if (state !== initialState) {
        code += ',\n';
        code += '    ' + state.attributes.name + ' = ' + this.stateSize + '\'b';
        code += this.convertBinaryToGray(stateNumber.toString(2).padStart(this.stateSize, '0'));
        stateNumber = stateNumber + 1;
      }
    }
    return code;
  }

  private getHammingDistanceEncoding(hammingDistance: number): string {
    let code: string = '';
    const initialState: any = this.getInitialState();
    this.stateSize = 0;
    let currentNumber: number = 0;
    if (hammingDistance === 1 || hammingDistance === 2) {
      this.stateSize = this.countNumberOfStates();
      currentNumber = 1;
    } else if (hammingDistance === 3 || hammingDistance === 4) {
      this.stateSize = this.countNumberOfStates() * 2;
      currentNumber = 3;
    }
    code += '[' + (this.stateSize - 1) + ':0]\n';
    code += '    ' + initialState.attributes.name + ' = ' + this.stateSize + '\'b';
    code += this.determineBinaryValueForHammingEncoding(currentNumber);
    for (const state of this.stateData) {
      if (state !== initialState) {
        code += ',\n';
        code += '    ' + state.attributes.name + ' = ' + this.stateSize + '\'b';
        if (hammingDistance === 1 || hammingDistance === 2) {
          currentNumber = currentNumber * 2;
        } else if (hammingDistance === 3 || hammingDistance === 4) {
          currentNumber = currentNumber * 4;
        }
        code += this.determineBinaryValueForHammingEncoding(currentNumber);
      }
    }
    return code;
  }

  private determineBinaryValueForHammingEncoding(currentNumber: number): string {
    return currentNumber.toString(2).padStart(this.stateSize, '0');
  }
}
