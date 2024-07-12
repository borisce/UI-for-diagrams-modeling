import {
  SysVerilogHDLParser,
  Function_declarationContext,
  Module_declarationContext,
  Always_constructContext,
  Block_statementContext,
  Case_statementContext,
  Case_itemContext,
  Statement_semicolonContext,
  Function_statementContext,
  Function_item_declaration_semicolonContext,
  List_of_interface_portsContext,
  Port_declarationContext,
  Function_item_declarationContext,
  Variable_lvalueContext,
  Module_itemContext,
  Variable_descriptionContext,
  Dimension_plusContext,
  IdentifierContext,
  Hierarchical_identifier_branch_itemContext,
  Param_declarationContext,
  Hierarchical_variable_identifierContext,
  Typedef_identifierContext,
  Hierarchical_task_identifierContext,
  Module_instance_identifierContext,
  If_statementContext,
  Else_statementContext,
  Attr_variable_item_semicolonContext,
  Variable_itemContext,
  Case_item_starContext,
  Conditional_statementContext,
  Procedural_timing_control_statementContext,
  Package_declarationContext,
  Module_instantiationContext,
  Module_interfaceContext,
} from "./ANTLR/SysVerilogHDLParser";
import { SysVerilogHDLLexer } from "./ANTLR/SysVerilogHDLLexer";
import { SysVerilogHDLListener} from "./ANTLR/SysVerilogHDLListener";
import {
  ANTLRInputStream,
  CommonTokenStream,
  ANTLRErrorListener,
  RecognitionException,
  Recognizer
} from "antlr4ts";
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { Marker, MarkerSeverity } from '../../semantic-check/interfaces/Marker'
import { CodeBlockType, ObjectType, Reference } from "../../semantic-check/interfaces/reference";
import { SystemVerilogSemanticAnalyzer } from '../../semantic-check/systemVerilog/svSemanticAnalyzer';
import { endingWordColumn, startingWordColumn } from '../../semantic-check/syntaxUtils'
import { CollabService } from "src/app/core/service/collab.service";
import instanceCheckerSv, { checkInstance, clearInstanceMarkers, instanceMarkers } from '../../semantic-check/systemVerilog/instanceCheckerSv';

export let referencesSv = new Map<string, Reference>();
export let quickfixesSv: Array<object> = [];
export let markers: Array<Marker> = [];
let moduleName: Array<string> = [];
let moduleVariables: Array<string> = [];
let functions: Array<string> = [];
let identifiers: Array<string> = [];
let params: Array<string> = [];
let constructVars: Array<string> = [];
let localIdentifiers: Array<string> = [];
let codeLines: Array<string> = [];
let openedFileName: string;
let packages: Array<string> = [];

export let moduleItemContexts: Module_itemContext[] = [];
export let caseItemContext: Case_item_starContext | null = null;
export let ifStatementContexts: Array<Conditional_statementContext> | null = [];
export let delayEventContexts: Array<Procedural_timing_control_statementContext> = [];
export let alwaysCombContexts: Array<Always_constructContext> = [];
export let packageContexts: Array<Package_declarationContext> = [];

let collabService: CollabService;

let priorInstantiationContext: Module_instantiationContext | null = null;
let previousModuleContext: Module_declarationContext | null = null;

class EnterFunctionListener implements SysVerilogHDLListener {

  enterModule_declaration(context: Module_declarationContext) {
    // if (previousModuleContext && previousModuleContext.text === context.text) {
    //   // The context has not changed, so return early
    //   return;
    // }

    previousModuleContext = context;
    const moduleContextName = context.module_identifier().text;
    const subContext = context.children[3] as Module_interfaceContext;
    const lines = codeLines.slice(subContext._start.line, subContext._stop.line - 1);
    checkInstance(context, lines, false);

    if (!moduleName.includes(moduleContextName)) {
      moduleName.push(moduleContextName);
    }

    if (moduleName.length > 1) {
      markers.push(new Marker(
        context._start.line,
        startingWordColumn(codeLines[context._start.line - 1], moduleContextName),
        context._start.line,
        endingWordColumn(codeLines[context._start.line - 1], moduleContextName),
        "Warning: File should not contain more than one module!",
        MarkerSeverity.Warning
      ));
    }
    

    if(moduleContextName == "") {
      markers.push(new Marker(context._start.line,
        context._start.charPositionInLine,
        context._start.line,
        context._start.charPositionInLine + 2,
        "Error: Module needs name!",
        MarkerSeverity.Error
        )
      );
    } else if (moduleContextName !== openedFileName) {
      markers.push(new Marker(
        context._start.line,
        startingWordColumn(codeLines[context._start.line - 1], moduleContextName),
        context._start.line,
        endingWordColumn(codeLines[context._start.line - 1], moduleContextName),
        `Warning: Module name '${moduleContextName}' does not match with file name '${openedFileName}'`,
        MarkerSeverity.Warning
        )
      );
      quickfixesSv.push({
        'title': `Change module name to ` + `'` + openedFileName + `'`,
        'text': openedFileName,
        'message': `Module name '${moduleContextName}' does not match with file name '${openedFileName}'`
      });
    }
  }

  enterCase_item_star(context: Case_item_starContext) {
    caseItemContext = context;
  }

  exitModule_declaration(context: Module_declarationContext){
    functions = [];
    moduleVariables = [];
    identifiers = [];
    params = [];
  }

  exitAlways_construct(context: Always_constructContext){
    //console.log(context);
    constructVars = [];
    localIdentifiers = [];
  }

  enterBlock_statement(context: Block_statementContext) {
    if(context.seq_block()){
      if(context.seq_block().statement_star()){
        if(context.seq_block().statement_star().children) {
          context.seq_block().statement_star().children.forEach(node => {
            if (node instanceof Statement_semicolonContext) {
              if (node.statement()) {
                if (node.statement().assignment_statement() || node.statement().expression_statement()) {
                  //console.log(`statement - ${node.text}`);
                  if (!node.semicolon()) {
                    markers.push(new Marker(node._stop.line,
                      node._stop.charPositionInLine + 1,
                      node._stop.line,
                      node._stop.charPositionInLine + 3,
                      `Error: Missing ; after statement !`,
                      MarkerSeverity.Error
                    ));
                  }
                }
              }
            }
          });
        }
      }
    }
  }

  enterConditional_statement(context: Conditional_statementContext) {
    ifStatementContexts.push(context);
  }

  enterIf_statement(context: If_statementContext){
    context.children.forEach(node => {
      if (node instanceof Statement_semicolonContext) {
        if(node.statement()) {
          if (node.statement().assignment_statement() || node.statement().expression_statement()) {
            if (!node.semicolon()) {
              markers.push(new Marker(node._stop.line,
                node._stop.charPositionInLine + 1,
                node._stop.line,
                node._stop.charPositionInLine + 3,
                `Error: Missing ; after statement !`,
                MarkerSeverity.Error
                )
              );
            }
          }
        }
      }
    });
  }

  enterElse_statement(context: Else_statementContext){
    context.children.forEach(node => {
      if (node instanceof Statement_semicolonContext) {
        if(node.statement()) {
          if (node.statement().assignment_statement() || node.statement().expression_statement()) {
            if (!node.semicolon()) {
              markers.push(new Marker(node._stop.line,
                node._stop.charPositionInLine + 1,
                node._stop.line,
                node._stop.charPositionInLine + 3,
                `Error: Missing ; after statement !`,
                MarkerSeverity.Error
                )
              );
            }
          }
        }
      }
    });
  }

  enterCase_item(context: Case_itemContext){
    //console.log(`Case item start line number ${context._start.line}`);
    context.children.forEach(node => {
      if (node instanceof Statement_semicolonContext) {
        if(node.statement()) {
          if (node.statement().assignment_statement() || node.statement().expression_statement()) {
            if (!node.semicolon()) {
              markers.push(new Marker(node._stop.line,
                node._stop.charPositionInLine + 1,
                node._stop.line,
                node._stop.charPositionInLine + 3,
                `Error: Missing ; after statement !`,
                MarkerSeverity.Error
                )
              );
            }
          }
        }
      }
    });
  }

  enterCase_statement(context: Case_statementContext){
    //console.log(`Case start line number ${context._start.line}`);
    //console.log(`case statement - ${context.case_switch().text}`);
  }

  enterFunction_statement(context: Function_statementContext){
    //console.log(`Function statement start line number ${context._start.line}`);
    //console.log(context);
  }

  enterFunction_declaration(context: Function_declarationContext){
    //console.log(`Function name ${context.function_identifier().text}`);
    functions.push(context.function_identifier().text);
    //console.log(functions);
    //console.log(context);
    if(context.function_item_declaration_star()){
      if(context.function_item_declaration_star().children) {
        context.function_item_declaration_star().children.forEach(node => {
          if (node instanceof Function_item_declaration_semicolonContext) {
            //console.log(node);
          }
        });
      }
    }
    if(context.function_statement()) {
      if(context.function_statement().statement_star()) {
        if(context.function_statement().statement_star().children) {
          context.function_statement().statement_star().children.forEach(node => {
            if (node instanceof Statement_semicolonContext) {
              if (node.statement().assignment_statement() || node.statement().expression_statement()) {
                if (!node.semicolon()) {
                  markers.push(new Marker(node._stop.line,
                    node._stop.charPositionInLine + 1,
                    node._stop.line,
                    node._stop.charPositionInLine + 3,
                    `Error: Missing ; after statement !`,
                    MarkerSeverity.Error
                    )
                  );
                }
              }
            }
          });
        }
      }
    }
  }

  exitFunction_declaration(context: Function_declarationContext){
    constructVars = [];
    localIdentifiers = [];
  }

  enterDimension_plus(context: Dimension_plusContext){

  }

  enterVariable_description(context: Variable_descriptionContext){
    let parent = context.parent;
    while(parent){
      if(parent instanceof List_of_interface_portsContext){
        if(moduleVariables){
          moduleVariables.forEach(name => {
            if(context.variable_identifier().text == name){
              let length = context.variable_identifier()._start.stopIndex - context.variable_identifier()._start.startIndex;
              markers.push(new Marker(context.variable_identifier()._start.line,
                context.variable_identifier()._start.charPositionInLine + 1,
                context.variable_identifier()._stop.line,
                context.variable_identifier()._stop.charPositionInLine + length + 2,
                `Error: Can't declare, variable name '${context.variable_identifier().text}' already in use !`,
                MarkerSeverity.Error
                )
              );
            }
          });
        }
        moduleVariables.push(context.variable_identifier().text);
        //console.log(moduleVariables);
      }
      parent = parent.parent;
    }
    parent = context.parent;
    while(parent){
      if(parent instanceof Module_itemContext){
        if(moduleVariables){
          moduleVariables.forEach(name => {
            if(context.variable_identifier().text == name){
              let length = context.variable_identifier()._start.stopIndex - context.variable_identifier()._start.startIndex;
              markers.push(new Marker(context.variable_identifier()._start.line,
                context.variable_identifier()._start.charPositionInLine + 1,
                context.variable_identifier()._stop.line,
                context.variable_identifier()._stop.charPositionInLine + length + 2,
                `Error: Can't declare, variable name '${context.variable_identifier().text}' already in use !`,
                MarkerSeverity.Error
                )
              );
            }
          });
        }
        moduleVariables.push(context.variable_identifier().text);
        //console.log(moduleVariables);
        break
      }
      if((parent instanceof Function_item_declarationContext) || (parent instanceof Always_constructContext)) {
        break
      }
      parent = parent.parent;
    }
    parent = context.parent;
    let names = moduleVariables.concat(constructVars);
    while(parent){
      if(parent instanceof Always_constructContext){

        if(names){
          names.forEach(n => {
            if(context.variable_identifier().text == n){
              let length = context.variable_identifier()._start.stopIndex - context.variable_identifier()._start.startIndex;
              markers.push(new Marker(context.variable_identifier()._start.line,
                context.variable_identifier()._start.charPositionInLine + 1,
                context.variable_identifier()._stop.line,
                context.variable_identifier()._stop.charPositionInLine + length + 2,
                `Error: Can't declare, variable name '${context.variable_identifier().text}' already in use !`,
                MarkerSeverity.Error
                )
              );
            }
          });
        }
        constructVars.push(context.variable_identifier().text);
        //console.log("vars always  " + constructVars);
      }
      if(parent instanceof Function_declarationContext){

        if(names){
          names.forEach(n => {
            if(context.variable_identifier().text == n){
              let length = context.variable_identifier()._start.stopIndex - context.variable_identifier()._start.startIndex;
              markers.push(new Marker(context.variable_identifier()._start.line,
                context.variable_identifier()._start.charPositionInLine + 1,
                context.variable_identifier()._stop.line,
                context.variable_identifier()._stop.charPositionInLine + length + 2,
                `Error: Can't declare, variable name '${context.variable_identifier().text}' already in use !`,
                MarkerSeverity.Error
                )
              );
            }
          });
        }
        constructVars.push(context.variable_identifier().text);
      }
      parent = parent.parent;
    }
  }

  enterPort_declaration(context: Port_declarationContext){
    let moduleContext = context.parent.parent.parent.parent.parent.parent.parent?.parent;

    if (moduleContext && !moduleContext?.text.toLocaleLowerCase().startsWith('module')) {
      moduleContext = moduleContext.parent;
    }

    if (!moduleContext) {
      return;
    }

    const moduleName = moduleContext?.text.replace('module', '').split('(')[0].trim();
    const declarationLine = context._start.line;
    const declaration = codeLines[declarationLine - 1].replace(/\/\/.*/g, '');
    // remove all whitespaces from declaration and split by comma into array
    const declarationArray = declaration.replace(/\s/g, ',').split(',').filter(x => x !== '');
    const isSizeDeclared = declarationArray.length > 3;

    const portDirection = declarationArray[0];
    const portType = declarationArray[1];
    const portSize = isSizeDeclared ? declarationArray[2] : null;
    const portName = declarationArray[declarationArray.length - 1].replace(';', '');
    const isWrite = portDirection === 'output' || portDirection === 'inout';
    const isReadOnly = portDirection === 'input' || portDirection === 'inout';
    const objectType = isReadOnly ? ObjectType.PORT_IN : ObjectType.PORT_OUT;

    const reference = new Reference(
      portName,
      portType,
      declarationLine,
      isWrite,
      objectType,
      isReadOnly
    );

    reference.size = portSize;
    reference.codeBlockType = CodeBlockType.MODULE;
    const referenceKey = `${portName};${moduleName};${moduleContext.start.line}`;
    referencesSv.set(referenceKey, reference);
  }

  enterHierarchical_identifier_branch_item(context: Hierarchical_identifier_branch_itemContext){
    let parent = context.parent;
    while(parent){
      if(parent instanceof Param_declarationContext){
        if(context.parent.parent instanceof Hierarchical_variable_identifierContext) {
          let match = 0;
          if(params.length > 0){
            params.forEach(i => {
              if(i == context.text){
                match = 1;
              }
            });
            if(match == 0){
              params.forEach(name => {
                if(name == context.text){
                  match = 1;
                }
              });
              params.push(context.text);
            }
          }
          if(params.length == 0){
            params.push(context.text);
          }
          if(match == 1){
            let length = context._start.stopIndex - context._start.startIndex;
            markers.push(new Marker(context._start.line,
              context._start.charPositionInLine + 1,
              context._stop.line,
              context._stop.charPositionInLine + length + 2,
              `Error: Can't declare, parameter name '${context.text}' already in use !`,
              MarkerSeverity.Error
              )
            );
          }
        }
      }
      parent = parent.parent;
    }
  }

  enterIdentifier(context: IdentifierContext){
    if(context.parent instanceof Hierarchical_identifier_branch_itemContext &&
      !(context.parent.parent.parent instanceof Hierarchical_task_identifierContext)){
      if(identifiers.length > 0){
        let isUsed = 0;
        identifiers.forEach(i => {
          if(i == context.text){
            isUsed = 1;
          }
        });
        if(isUsed == 0){
          identifiers.push(context.text);
        }
      }
      if(identifiers.length == 0){
        identifiers.push(context.text);
      }

      if(localIdentifiers.length > 0){
        let isUsed = 0;
        localIdentifiers.forEach(i => {
          if(i == context.text){
            isUsed = 1;
          }
        });
        if(isUsed == 0){
          localIdentifiers.push(context.text);
        }
      }
      if(localIdentifiers.length == 0){
        localIdentifiers.push(context.text);
      }
      let all = moduleVariables.concat(constructVars).concat(params);
      let match = 0;
      if(functions){
        all = all.concat(functions);
        all.forEach(name => {
          if(name == context.text){
            match = 1;
          }
        });
      } else {
        all.forEach(name => {
          if(name == context.text){
            match = 1;
          }
        });
      }
    }
    if(context.parent instanceof Typedef_identifierContext){
      let match = 0;
      if(moduleVariables.length > 0){
        moduleVariables.forEach(i => {
          if(i == context.text){
            match = 1;
          }
        });
        if(match == 0){
          moduleVariables.forEach(name => {
            if(name == context.text){
              match = 1;
            }
          });
          moduleVariables.push(context.text);
        }
      }
      if(moduleVariables.length == 0){
        moduleVariables.push(context.text);
      }
      if(match == 1){
        let length = context.parent.identifier()._start.stopIndex - context.parent.identifier()._start.startIndex;
        markers.push(new Marker(context.parent.identifier()._start.line,
          context.parent.identifier()._start.charPositionInLine + 1,
          context.parent.identifier()._stop.line,
          context.parent.identifier()._stop.charPositionInLine + length + 2,
          `Error: Can't declare, variable name '${context.parent.identifier().text}' already in use !`,
          MarkerSeverity.Error
          )
        );
      }
    }
  }

  enterModule_item(context: Module_itemContext) {
    const children = context.children;
    
    if (children && children?.length === 1) {
      const constructorName = children[0]?.constructor.name;
      
      if (constructorName === 'Import_packageContext') {
        moduleItemContexts.push(context);
      }
    }
    const moduleContext = context.parent.parent;
    const moduleName = moduleContext.text.replace('module', '').split('(')[0].trim();

    context.children?.forEach(node => {
      if (node instanceof Attr_variable_item_semicolonContext) {
        node.children.forEach(child => {
          if (child instanceof Variable_itemContext) {
            const declarationLine = child._start.line;
            let declaration = codeLines[declarationLine - 1];

            const includesValueAssignment = declaration.includes('=');
            declaration = declaration.replace(/\/\/.*/g, '');
            const declarationArray = declaration
              .replace(/\s/g, ',')
              .replace(';', '')
              .split(',')
              .filter(x => x !== '');
            const isSizeDeclared = declarationArray[1].includes('[') && declarationArray[1].includes(']');
            const portType = declarationArray[0];
            const portSize = isSizeDeclared ? declarationArray[1] : null;
            const portNameIndex = includesValueAssignment
              ? declarationArray.length - 3
              : declarationArray.length - 1;
            const portName = declarationArray[portNameIndex].replace(';', '');

            const reference = new Reference(
              portName,
              portType,
              declarationLine,
              includesValueAssignment,
              ObjectType.VARIABLE
            );

            reference.size = portSize;
            const referenceKey = `${portName};${moduleName};${moduleContext.start.line}`;
            referencesSv.set(referenceKey, reference);
          }
        });
      }
    });
  }

  enterModule_instance_identifier(context: Module_instance_identifierContext){
    let match = 0;
    if(moduleVariables.length > 0){
      moduleVariables.forEach(i => {
        if(i == context.text){
          match = 1;
        }
      });
      if(match == 0){
        moduleVariables.forEach(name => {
          if(name == context.text){
            match = 1;
          }
        });
        moduleVariables.push(context.text);
      }
    }
    if(moduleVariables.length == 0){
      moduleVariables.push(context.text);
    }
    if(match == 1){
      let length = context.arrayed_identifier()._start.stopIndex - context.arrayed_identifier()._start.startIndex;
      markers.push(new Marker(context.arrayed_identifier()._start.line,
        context.arrayed_identifier()._start.charPositionInLine + 1,
        context.arrayed_identifier()._stop.line,
        context.arrayed_identifier()._stop.charPositionInLine + length + 2,
        `Error: Can't declare, variable name '${context.arrayed_identifier().text}' already in use !`,
        MarkerSeverity.Error
        )
      );
    }
  }

  enterStatement_semicolon(context: Statement_semicolonContext){
    if(context.statement()) {
      if (context.statement().assignment_statement()) {
        if (context.statement().assignment_statement().nonblocking_assignment()) {
          let parent = context.parent;
          while (parent) {
            if (parent instanceof Always_constructContext) {
              if (parent.always_keyword().text == "always_comb") {
                let operator = context.statement().assignment_statement().nonblocking_assignment();
                if (operator.children) {
                  operator.children.forEach(node => {
                    if (node instanceof Variable_lvalueContext) {
                      let length = node._stop.stopIndex - node._stop.startIndex + 3;
                      length += node._stop.charPositionInLine;
                      // markers.push(new Marker(node._stop.line,
                      //   length,
                      //   node._stop.line,
                      //   length + 2,
                      //   `Only blocking assignment is allowed in always_comb !`,
                      //   MarkerSeverity.Error
                      //   )
                      // );
                    }
                  });
                }
              }
            }
            parent = parent.parent;
          }
        }
        if (context.statement().assignment_statement().blocking_assignment()) {
          let parent = context.parent;
          while (parent) {
            if (parent instanceof Always_constructContext) {
              if (parent.always_keyword().text == "always_ff") {
                let operator = context.statement().assignment_statement().blocking_assignment();
                if (operator.children) {
                  operator.children.forEach(node => {
                    if (node instanceof Variable_lvalueContext) {
                      let length = node._stop.stopIndex - node._stop.startIndex + 3;
                      length += node._stop.charPositionInLine;
                      // markers.push(new Marker(node._stop.line,
                      //   length,
                      //   node._stop.line,
                      //   length + 1,
                      //   `Only non-blocking assignment is allowed in always_ff !`,
                      //   MarkerSeverity.Error
                      //   )
                      // );
                    }
                  });
                }
              }
            }
            parent = parent.parent;
          }
        }
      }
    }
  }

  enterProcedural_timing_control_statement(ctx: Procedural_timing_control_statementContext) {
    delayEventContexts.push(ctx);
  }

  enterAlways_construct(ctx: Always_constructContext) {
    if (ctx.text.toLocaleLowerCase().startsWith('always_comb')) {
      alwaysCombContexts.push(ctx);
    }
  }

  enterPackage_declaration(ctx: Package_declarationContext) {
    packageContexts.push(ctx);
    const packageName = ctx.package_identifier().text;

    if (!packages.includes(packageName)) {
      packages.push(packageName);
    }

    if (packages.length > 1) {
      markers.push(new Marker(
        ctx._start.line,
        startingWordColumn(codeLines[ctx._start.line - 1], packageName),
        ctx._start.line,
        endingWordColumn(codeLines[ctx._start.line - 1], packageName),
        "Warning: File should not contain more than one package!",
        MarkerSeverity.Warning
      ));
    }
  }

  async enterModule_instantiation(context: Module_instantiationContext, forceRun: boolean = false) {
    // if (priorInstantiationContext && priorInstantiationContext.text === context.text && !forceRun) {
    //   // The context has not changed, so return early
    //   return;
    // }

    clearInstanceMarkers();
    priorInstantiationContext = context;

    const instanceModuleName = context.children[0].text;

    if (!instanceModuleName || instanceModuleName === '') {
      return;
    }

    const referenceFilename = `${instanceModuleName}.sv`;

    // create reference for instance module
    const instanceLine = context._start.line;
    const referenceKey = `${instanceModuleName};${openedFileName};${instanceLine}`;
    const reference = new Reference(
      instanceModuleName,
      '',
      instanceLine,
      false,
      ObjectType.INSTANCE
    );

    referencesSv.set(referenceKey, reference);

    const currentFile = localStorage.getItem('currentFile');
    const referenceFile = currentFile.replace(openedFileName + '.sv', referenceFilename);
    try {
      const fileContent = await collabService.getDocContents(referenceFile);
      const instanceCode = codeLines.slice(context._start.line, context._stop.line - 1).join('\n');
      let startIndex = instanceCode.indexOf('(');

      if (startIndex !== -1) {
        const newMarkers = instanceCheckerSv(fileContent, codeLines, openedFileName, instanceCode, context._start.line);

        newMarkers.forEach((marker) => {
          markers.push(marker);
        });

        return markers;
      }
    } catch (error) {
      const instanceLine = context._start.line;
      const marker = new Marker(
        instanceLine,
        startingWordColumn(codeLines[instanceLine - 1], instanceModuleName),
        instanceLine,
        endingWordColumn(codeLines[instanceLine - 1], instanceModuleName),
        `Warning: Could not find module '${instanceModuleName}'`,
        MarkerSeverity.Warning
      );

      const markerExists = markers.find(m => m.message === marker.message);

      if (!markerExists && instanceModuleName !== '') {
        markers.push(marker);
      }
    }
  }
}

// @ts-ignore
export class MyParseErrorListener implements ANTLRErrorListener {
  // @ts-ignore
  syntaxError<T extends TSymbol>(recognizer: Recognizer<T, any>, offendingSymbol: T | undefined, line: number, charPositionInLine: number, msg: string, e: RecognitionException | undefined): void {
    //console.log("Syntax Error at line " + line + " and position " + charPositionInLine + " - " + msg);
    if (msg === `mismatched input ',' expecting {';;', ';'}`) {
      return;
    }

    if (msg === `extraneous input ')' expecting {';;', ';'}`) {
      return;
    }

    if (msg === `no viable alternative at input 'generate'`) {
      return;
    }

    if (msg.startsWith(`token recognition error at: '`)) {
      return;
    }

    if (msg.startsWith(`mismatched input '`)) {
      return;
    }

    if (msg.startsWith('no viable alternative at input')) {
      return;
    }

    markers.push(new Marker(line,
      charPositionInLine,
      line,
      charPositionInLine + 2,
      msg,
      MarkerSeverity.Error
      )
    );
    let vocab = recognizer.vocabulary;

    let findContext;
    if(e) {
      findContext = e.context;
      if(e.context) {
        //console.log(e.expectedTokens.toStringVocabulary(vocab));
      }
    }
    if(findContext) {
      //console.log(`Parse error at rule name - ${recognizer.ruleNames[findContext.ruleIndex]}`);
    }
  }
}

export function syntaxAnalyzer(code) {
  codeLines = code.split('\n');
  caseItemContext = null;
  ifStatementContexts = [];
  moduleItemContexts = [];
  packageContexts = [];

  let inputStream = new ANTLRInputStream(code);

  let lexer = new SysVerilogHDLLexer(inputStream);

  lexer.removeErrorListeners();
  lexer.addErrorListener(new MyParseErrorListener());

  let tokenStream = new CommonTokenStream(lexer);

  let parser = new SysVerilogHDLParser(tokenStream);

  parser.removeErrorListeners();
  parser.addErrorListener(new MyParseErrorListener());

  let tree = parser.description_star();
  const listener = new EnterFunctionListener();
  ParseTreeWalker.DEFAULT.walk(listener as SysVerilogHDLListener, tree);

  return listener;
}

export default async function parseAndGetMarkers(code: string, filename: string, cs: CollabService): Promise<[Marker[], object[]]> {
    markers = [];
    codeLines = [];
    moduleItemContexts = [];
    caseItemContext = null;
    ifStatementContexts = [];
    alwaysCombContexts = [];
    delayEventContexts = [];
    packageContexts = [];
    referencesSv = new Map<string, Reference>();
    codeLines = code.split('\n');
    quickfixesSv = [];
    packages = [];
    moduleName = [];
    openedFileName = filename.split('.')[0];
    collabService = cs;

    const listener = syntaxAnalyzer(code);

    const semanticAnalyzer = new SystemVerilogSemanticAnalyzer(
      codeLines,
      referencesSv,
      moduleItemContexts,
      caseItemContext,
      ifStatementContexts,
      delayEventContexts,
      alwaysCombContexts,
      packageContexts
    );
    const [semanticMarkers, semanticQuickfixes] = semanticAnalyzer.analyzeSemantic();

    semanticMarkers.forEach((marker) => {
      markers.push(marker);
    });

    semanticQuickfixes.forEach((quickfix) => {
      quickfixesSv.push(quickfix);
    });

    instanceMarkers.forEach((marker) => {
      markers.push(marker);
    });

    await new Promise(resolve =>setTimeout(resolve, 1000));
    await listener.enterModule_instantiation(previousModuleContext as unknown as Module_instantiationContext, true);

    return [markers, quickfixesSv];
}
