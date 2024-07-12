export interface ModuleNode {
  name: string;
  instantiatedModules: Map<string, ModuleInstance>;
}
export interface ModuleInstance {
  instantiationCount: number;
  successInstantiationCount: number;
  failedInstantiationCount: number;
  undefinedInstantiationCount: number;
  condition: string;
  conditionResult: ConditionResult;
}
export enum ConditionResult {
  passed,
  failed,
  undefined,
}

