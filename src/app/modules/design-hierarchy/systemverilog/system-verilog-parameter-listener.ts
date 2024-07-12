import { SystemVerilogParserListener } from './ANTLR/SystemVerilogParserListener';
import {
  Parameter_declarationContext,
  Module_program_interface_instantiationContext,
  Module_headerContext,
  IdentifierContext,
  Module_identifierContext,
  Constant_param_expressionContext,
  List_of_param_assignmentsContext,
  Param_assignmentContext,
  Parameter_identifierContext,
  Package_declarationContext,
  Package_item_declarationContext,
  Parameter_value_assignmentContext, Hierarchical_instanceContext
} from './ANTLR/SystemVerilogParser';

export class SystemVerilogParameterListener implements SystemVerilogParserListener {
  constructor(private packageParameterMap1: Map<string, string> = new Map(),
              private packageParameterMap: Map<string, Map<string, string>> = new Map()) {}

  // Keep track of the current package context
  private packageStack: string[] = [];

  private getCurrentPackageName(): string | null {
    return this.packageStack.length > 0 ? this.packageStack[this.packageStack.length - 1] : null;
  }

  public enterPackage_declaration(ctx: Package_declarationContext): void {
    const packageName: string = this.extractPackageName(ctx);
    this.packageStack.push(packageName);
    this.packageParameterMap.set(packageName, new Map<string, string>());
  }

  public exitPackage_declaration(ctx: Package_declarationContext): void {
    this.packageStack.pop();
  }

  private extractPackageName(ctx: Package_declarationContext): string {
    return ctx.package_identifier().text;
  }

  public enterParameter_declaration(ctx: Parameter_declarationContext): void {
    const currentScopeName: string = this.getCurrentPackageName();

    if (!currentScopeName) { return; }

    const paramAssignmentsCtx: List_of_param_assignmentsContext = ctx.list_of_param_assignments();
    if (paramAssignmentsCtx) {
      // tslint:disable-next-line:max-line-length
      this.extractParamAssignments(paramAssignmentsCtx, currentScopeName, ctx.parent instanceof Package_item_declarationContext);
    }
  }

  // tslint:disable-next-line:max-line-length
  private extractParamAssignments(ctx: List_of_param_assignmentsContext, scopeName: string, isPackage: boolean = false): void {
    ctx.children.forEach((child) => {
      if (child instanceof Param_assignmentContext) {
        // tslint:disable-next-line:max-line-length
        const paramNameCtx: any = child.children.find(c => c instanceof Parameter_identifierContext);
        // tslint:disable-next-line:max-line-length
        const paramValueCtx: any = child.children.find(c => c instanceof Constant_param_expressionContext);

        const paramName: string = paramNameCtx ? paramNameCtx.text : null;
        const paramValue: string = paramValueCtx ? paramValueCtx.text : null;

        if (paramName && paramValue) {
          if (isPackage) {
            if (!this.packageParameterMap1.has(paramName)) {
              this.packageParameterMap1.set(paramName, paramValue);
            }
            // Check if the packageParams map for the current package exists, and if not, create it
            let packageParams: Map<string, string> = this.packageParameterMap.get(scopeName);
            if (!packageParams) {
              packageParams = new Map<string, string>();
              this.packageParameterMap.set(scopeName, packageParams);
            }
            packageParams.set(paramName, paramValue);
          }
        }
      }
    });
  }
}
