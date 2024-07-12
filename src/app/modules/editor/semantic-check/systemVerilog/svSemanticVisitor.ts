import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { ParseTree } from "antlr4ts/tree/ParseTree";
import { RuleNode } from "antlr4ts/tree/RuleNode";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { SysVerilogHDLVisitor } from '../../system_verilog/syntax-check/ANTLR/SysVerilogHDLVisitor';


export class SystemVerilogSemanticVisitor implements SysVerilogHDLVisitor<void> {

  constructor() {
  }

  beginSemanticAnalysis(): void {
    console.log("beginSemanticAnalysis");
  };

  visit(tree: ParseTree): void {
    throw new Error("Method not implemented.");
  }
  visitChildren(node: RuleNode): void {
    throw new Error("Method not implemented.");
  }
  visitTerminal(node: TerminalNode): void {
    throw new Error("Method not implemented.");
  }
  visitErrorNode(node: ErrorNode): void {
    throw new Error("Method not implemented.");
  }
  
}