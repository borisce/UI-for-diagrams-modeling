import { VerilogParserListener } from './ANTLR/VerilogParserListener';
import {
  Module_declarationContext, Module_instanceContext,
  Module_instantiationContext
} from './ANTLR/VerilogParser';
import { ModuleInstance, ModuleNode } from '../model/module-node.model';

export class VerilogModuleListener implements VerilogParserListener {
  private moduleStack: ModuleNode[] = [];
  constructor(private modulesMap: Map<string, ModuleNode>) {
  }

  public enterModule_declaration(ctx: Module_declarationContext): void {
    const moduleName: string = this.extractModuleName(ctx);
    let moduleNode: ModuleNode = this.modulesMap.get(moduleName);

    if (!moduleNode) {
      moduleNode = {
        name: moduleName,
        instantiatedModules: new Map<string, ModuleInstance>(),
      };
      this.modulesMap.set(moduleName, moduleNode);
    }

    this.moduleStack.push(moduleNode);
  }

  public exitModule_declaration(ctx: Module_declarationContext): void {
    this.moduleStack.pop();
  }

  public enterModule_instantiation(ctx: Module_instantiationContext): void {
    const moduleName: string = ctx.module_identifier().text;

    const moduleInstances: Module_instanceContext[] = ctx.module_instance();

    moduleInstances.forEach(instance => {
      const parentModule: ModuleNode = this.moduleStack[this.moduleStack.length - 1];

      // tslint:disable-next-line:max-line-length
      const moduleInstance: ModuleInstance = parentModule.instantiatedModules.get(moduleName);
      if (moduleInstance) {
        moduleInstance.instantiationCount += 1;
        parentModule.instantiatedModules.set(moduleName, moduleInstance);
      }

      let instantiatedModule: ModuleNode = this.modulesMap.get(moduleName);
      if (!instantiatedModule) {
        instantiatedModule = {
          name: moduleName,
          instantiatedModules: new Map<string, ModuleInstance>(),
        };
        this.modulesMap.set(moduleName, instantiatedModule);
      }
    });
  }

  public extractModuleName(ctx: Module_declarationContext): string {
    // Assuming the Verilog grammar has a similar structure to extract the module name
    return ctx.module_identifier().identifier().text;
  }
}
