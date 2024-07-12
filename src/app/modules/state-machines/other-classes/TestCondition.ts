export class TestCondition {

  public code: string;
  constructor(condition: string) {
    this.code = '';
    this.code += 'module testing(input logic clk, input logic rst);\n';
    this.code += '  logic current_state;\n';
    this.code += '  always_ff @(posedge clk, negedge rst) begin\n';
    this.code += '    if (' + condition + ') begin\n';
    this.code += '      current_state = 1\'b1;\n';
    this.code += '    end\n';
    this.code += '  end\n';
    this.code += 'endmodule : testing\n';
  }

  public getCode(): string {
    return this.code;
  }
}

export class TestConditionVHDL {

  public code: string;
  constructor(vhdlCondition: string) {
    this.code = '';
    this.code += 'library ieee;\n';
    this.code += 'use ieee.std_logic_1164.all;\n\n';
    this.code += 'entity testing is\n';
    this.code += '  port (\n';
    this.code += '    clk : in std_logic;\n';
    this.code += '    reset : in std_logic\n  );\n';
    this.code += 'end testing;\n\n';
    this.code += 'architecture test of testing is\n';
    this.code += '  type state_type is (State1, State2);\n';
    this.code += '  signal state : state_type;\n\n';
    this.code += 'begin\n';
    this.code += '  process (clk, reset) begin\n';
    this.code += '    if (' + vhdlCondition + ') then\n';
    this.code += '      state <= Initial_State;\n';
    this.code += '    end if;\n';
    this.code += '  end process;\n';
    this.code += 'end test;\n';
  }

  public getCode(): string {
    return this.code;
  }
}
