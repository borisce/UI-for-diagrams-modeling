import { vhdlListener } from './ANTLR/vhdlListener';
import {
  Component_instantiation_statementContext,
  Entity_declarationContext,
  Architecture_bodyContext,
  Entity_headerContext,
  Generic_map_aspectContext,
} from './ANTLR/vhdlParser';
import { ModuleInstance, ModuleNode, ConditionResult } from '../model/module-node.model';
import { ModuleInstanceNew, ParameterType } from '../model/module-instance.model';

export class VhdlComponentListener implements vhdlListener {
  constructor(private modulesMap: Map<string, ModuleNode>,
              public moduleInstances: ModuleInstanceNew[],
              private currentInstance: ModuleInstanceNew) {
  }
  public moduleStack: ModuleNode[] = [];

  public enterEntity_declaration(ctx: Entity_declarationContext): void {
    const moduleName: string = ctx.identifier(0).text;
    // console.log(`Entering entity declaration: ${moduleName}`);
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

  public exitEntity_declaration(ctx: Entity_declarationContext): void {
    // console.log(`Exiting entity declaration: ${ctx.identifier(0).text}`);
  }

  public enterArchitecture_body(ctx: Architecture_bodyContext): void {
    if (this.moduleStack.length === 0) {
      console.error('Architecture body found outside of an entity declaration.');
      return;
    }
  }

  public exitArchitecture_body(ctx: Architecture_bodyContext): void {
    if (this.moduleStack.length > 0) {
      this.moduleStack.pop();
    }
  }

  // tslint:disable-next-line:max-line-length
  public enterComponent_instantiation_statement(ctx: Component_instantiation_statementContext): void {
    if (this.moduleStack.length === 0) {
      console.error('Component instantiation found outside of an entity declaration.');
      return;
    }
    const componentName: string = ctx.instantiated_unit().name().text;
    // console.log(`Instantiating component: ${componentName}`);
    const parentModule: ModuleNode = this.moduleStack[this.moduleStack.length - 1];
    const newModuleInstance: ModuleInstanceNew = {
      name: componentName,
      instantiatedBy: parentModule.name,
      passedParameters: new Map<string, string>(),
      parameterType: ParameterType.named,
      condition: '',
      conditionResult: ConditionResult.passed,
      instantiatedCount: 1
    };
    this.moduleInstances.push(newModuleInstance);
    if (ctx.generic_map_aspect()) {
      this.extractParameterOverrides(ctx.generic_map_aspect(), newModuleInstance);
    }
  }

  public enterEntity_header(ctx: Entity_headerContext): void {
    // console.log('Entering entity header');
  }

  // tslint:disable-next-line:max-line-length
  private extractParameterOverrides(ctx: Generic_map_aspectContext, moduleInstance: ModuleInstanceNew): void {
    const overridesMap: Map<string, string> = new Map<string, string>();

    ctx.association_list().association_element().forEach((element) => {
      const paramName: string = element.formal_part().text;
      const paramValue: string = element.actual_part().text;
      if (paramName && paramValue) {
        overridesMap.set(paramName, paramValue);
      }
    });

    moduleInstance.passedParameters = overridesMap;
  }
}
