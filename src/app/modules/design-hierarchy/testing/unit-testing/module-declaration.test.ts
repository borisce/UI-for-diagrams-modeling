import { beforeEach, describe, expect, it } from '@jest/globals';
import { SystemVerilogModuleListener } from '../../systemverilog/system-verilog-module-listener';
import {
  Module_declarationContext,
  Module_headerContext,
  Module_identifierContext
} from '../../systemverilog/ANTLR/SystemVerilogParser';
import { IdentifierContext } from '../../vhdl/ANTLR/vhdlParser';
import { ModuleNode } from '../../model/module-node.model';

function createMockModuleDeclarationContext(moduleName: string): Module_declarationContext {
  const idCtx: IdentifierContext = { text: moduleName } as IdentifierContext;
  // tslint:disable-next-line:max-line-length
  const modIdCtx: Module_identifierContext = { identifier: () => idCtx } as unknown as Module_identifierContext;
  // tslint:disable-next-line:max-line-length
  const modHeaderCtx: Module_headerContext = { module_identifier: () => modIdCtx } as Module_headerContext;
  return { module_header: (): Module_headerContext => modHeaderCtx } as Module_declarationContext;
}

describe('Module declaration parsing', () => {
  let modulesMap: Map<string, any>;
  let listener: SystemVerilogModuleListener;

  beforeEach(() => {
    modulesMap = new Map();
    listener = new SystemVerilogModuleListener(modulesMap, [], null, new Map());
  });

  it('should add a module on entering a module declaration', () => {
    const ctx: Module_declarationContext = createMockModuleDeclarationContext('TestModule');
    listener.enterModule_declaration(ctx);

    expect(modulesMap.has('TestModule')).toBeTruthy();
    const module: ModuleNode = modulesMap.get('TestModule');
    expect(module.name).toBe('TestModule');
    expect(module.instantiatedModules).toBeDefined();
  });
});
