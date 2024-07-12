import { beforeEach, describe, expect, it } from '@jest/globals';
import { SystemVerilogModuleListener } from '../../systemverilog/system-verilog-module-listener';
import {
  Module_program_interface_instantiationContext,
  Parameter_value_assignmentContext,
  List_of_parameter_assignmentsContext,
  Named_parameter_assignmentContext,
  Parameter_identifierContext,
  Param_expressionContext
} from '../../systemverilog/ANTLR/SystemVerilogParser';
import { ModuleNode } from '../../model/module-node.model';

// tslint:disable-next-line:max-line-length
function createMockModuleInstantiationContext(instanceName: string, parameters: { name: string, value: string }[]): Module_program_interface_instantiationContext {
  // tslint:disable-next-line:max-line-length
  const mockParamAssignments: Named_parameter_assignmentContext[] = parameters.map(({ name, value }) => {
    const paramNameCtx: Parameter_identifierContext = { text: name } as Parameter_identifierContext;
    const paramValueCtx: Param_expressionContext = { text: value } as Param_expressionContext;
    return {
      parameter_identifier: () => paramNameCtx,
      param_expression: () => paramValueCtx
    } as Named_parameter_assignmentContext;
  });

  // tslint:disable-next-line:max-line-length
  const listOfParamAssignmentsCtx: List_of_parameter_assignmentsContext = { named_parameter_assignment: () => mockParamAssignments } as List_of_parameter_assignmentsContext;
  // tslint:disable-next-line:max-line-length
  const paramValueAssignmentCtx: Parameter_value_assignmentContext = { list_of_parameter_assignments: () => listOfParamAssignmentsCtx } as Parameter_value_assignmentContext;
  return {
    instance_identifier: () => ({ text: instanceName }),
    parameter_value_assignment: () => paramValueAssignmentCtx
  } as Module_program_interface_instantiationContext;
}

describe('Parameter declaration parsing', () => {
  let modulesMap: Map<string, ModuleNode>;
  let listener: SystemVerilogModuleListener;

  beforeEach(() => {
    modulesMap = new Map();
    listener = new SystemVerilogModuleListener(modulesMap, [], null, new Map());
    // tslint:disable-next-line:max-line-length
    listener.moduleStack.push({ name: 'ParentModule', instantiatedModules: new Map() } as ModuleNode); // Simulate being inside a module context
  });

  it('should parse and store parameters from module instantiation', () => {
    const parameters: any = [
      { name: 'ADDR_W', value: '9' },
      { name: 'N', value: '8' },
      { name: 'M', value: '3' }
    ];
    const ctx: Module_program_interface_instantiationContext = createMockModuleInstantiationContext('instance1', parameters);
    listener.enterModule_program_interface_instantiation(ctx);

    const instanceParams: Map<string, string> = listener.moduleInstances.find(inst => inst.name === 'instance1').passedParameters;
    expect(instanceParams).toBeDefined();
    expect(instanceParams.get('ADDR_W')).toBe('9');
    expect(instanceParams.get('N')).toBe('8');
    expect(instanceParams.get('M')).toBe('3');
  });
});
