import { beforeEach, describe, expect, it } from '@jest/globals';
import { ModuleNode } from '../../model/module-node.model';
import { ModuleInstanceNew } from '../../model/module-instance.model';
import { CharStreams, CodePointCharStream, CommonTokenStream } from 'antlr4ts';
import { SystemVerilogLexer } from '../../systemverilog/ANTLR/SystemVerilogLexer';
import { SystemVerilogParser } from '../../systemverilog/ANTLR/SystemVerilogParser';
import { SystemVerilogModuleListener } from '../../systemverilog/system-verilog-module-listener';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';

describe('SystemVerilogModuleListener with real parsing', () => {
  let modulesMap: Map<string, ModuleNode>;
  let moduleInstances: ModuleInstanceNew[];
  let packageParameterMap1: Map<string, string>;

  beforeEach(() => {
    modulesMap = new Map();
    moduleInstances = [];
    packageParameterMap1 = new Map();
  });

  it('should parse SystemVerilog code and process module declarations correctly', () => {
    const fileContent: string = `
            module MyModule;
            endmodule
        `;

    const charStream: CodePointCharStream = CharStreams.fromString(fileContent);
    const lexer: SystemVerilogLexer = new SystemVerilogLexer(charStream);
    const tokenStream: CommonTokenStream = new CommonTokenStream(lexer);
    const parser: SystemVerilogParser = new SystemVerilogParser(tokenStream);
    // tslint:disable-next-line:max-line-length
    const listener: SystemVerilogModuleListener = new SystemVerilogModuleListener(modulesMap, moduleInstances, null, packageParameterMap1);
    // @ts-ignore
    ParseTreeWalker.DEFAULT.walk(listener, parser.source_text());

    expect(modulesMap.has('MyModule')).toBeTruthy();
    const myModule: ModuleNode = modulesMap.get('MyModule');
    expect(myModule).toBeDefined();
    expect(myModule.name).toBe('MyModule');
  });
});
