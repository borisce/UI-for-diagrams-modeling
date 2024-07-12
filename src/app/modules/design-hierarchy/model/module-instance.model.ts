import { ConditionResult } from './module-node.model';

export interface ModuleInstanceNew {
  name: string;
  instantiatedBy: string;
  passedParameters: Map<string, string>;
  parameterType: ParameterType;
  condition: string;
  conditionResult: ConditionResult;
  instantiatedCount: number;
}

export enum ParameterType {
  named,
  ordered
}
