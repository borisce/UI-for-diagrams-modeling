import { beforeEach, describe, expect, it } from '@jest/globals';
import { Module_program_interface_instantiationContext } from '../../systemverilog/ANTLR/SystemVerilogParser';
import { ConditionResult } from '../../model/module-node.model';
import { SystemVerilogModuleListener } from '../../systemverilog/system-verilog-module-listener';
import { ModuleInstanceNew, ParameterType } from '../../model/module-instance.model';

// tslint:disable-next-line:max-line-length
function createMockModuleInstantiationContext(instanceName: string): Module_program_interface_instantiationContext {
  return {
    instance_identifier: () => ({ text: instanceName }),
    parameter_value_assignment: () => null  // Assuming no parameters for simplicity
  } as unknown as Module_program_interface_instantiationContext;
}

describe('Module instantiation parsing', () => {
  let listener: SystemVerilogModuleListener;

  beforeEach(() => {
    listener = new SystemVerilogModuleListener(new Map(), [], null, new Map());
    // tslint:disable-next-line:max-line-length
    listener.moduleStack.push({ name: 'ParentModule', instantiatedModules: new Map() });  // Push the current module context to stack
  });

  it('should correctly instantiate a module with default conditions', () => {
    const instanceName: string = 'TestInstance';
    // tslint:disable-next-line:max-line-length
    const ctx: Module_program_interface_instantiationContext = createMockModuleInstantiationContext(instanceName);
    listener.enterModule_program_interface_instantiation(ctx);

    expect(listener.moduleInstances.length).toBe(1);
    const moduleInstance: ModuleInstanceNew = listener.moduleInstances[0];

    expect(moduleInstance).toBeDefined();
    expect(moduleInstance.name).toBe(instanceName);
    expect(moduleInstance.instantiatedBy).toBe('ParentModule');
    expect(moduleInstance.passedParameters.size).toBe(0);
    expect(moduleInstance.parameterType).toBe(ParameterType.named);
    expect(moduleInstance.conditionResult).toBe(ConditionResult.passed);
    expect(moduleInstance.condition).toBe('');
    expect(moduleInstance.instantiatedCount).toBe(1);
  });
});
