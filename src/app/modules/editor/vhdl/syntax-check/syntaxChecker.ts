import {
  ANTLRErrorListener,
  ANTLRInputStream,
  CommonTokenStream,
  Recognizer
} from 'antlr4ts';
import {vhdlLexer} from "./ANTLR/vhdlLexer";
import {
  Architecture_bodyContext,
  Architecture_declarative_partContext,
  Architecture_statementContext,
  Architecture_statement_partContext,
  Block_declarative_itemContext,
  Case_statementContext,
  Entity_declarationContext,
  Identifier_listContext,
  If_statementContext,
  Library_clauseContext,
  Package_declarative_itemContext,
  Port_clauseContext,
  Port_listContext,
  Process_statement_partContext,
  Use_clauseContext,
  vhdlParser
} from "./ANTLR/vhdlParser";
import {vhdlListener} from "./ANTLR/vhdlListener";
import {RecognitionException} from "antlr4ts/RecognitionException";
import {Marker, MarkerSeverity} from '../../semantic-check/interfaces/Marker';
import {ParseTreeWalker} from 'antlr4ts/tree/ParseTreeWalker';
import {
  VHDLSemanticVisitor,
  clearSemanticMarkers,
  clearSemanticQuickfixes,
  semanticMarkers,
  semanticQuickfixes
} from '../../semantic-check/vhdl/vhdlSemanticVisitor';
import { CodeBlockType, ObjectType, Reference } from '../../semantic-check/interfaces/reference';
import {
  endingWordColumn,
  isAssignmentStatement,
  isIfStatement,
  returnAssignmentStatementVariables,
  returnIfStatementVariables,
  setReferenceIsRead,
  setReferenceIsWrite,
  startingWordColumn
} from '../../semantic-check/syntaxUtils';


function setUsages(): Array<object> {
  return [{
    'name': 'IEEE.std_logic_1164.all',
    'usage': ['std_ulogic', 'std_ulogic_vector', 'std_logic', 'std_logic_vector'],
    'used': false
  }, /*{
    'name': 'IEEE.numeric_bit.all',
    'usage': ['unsigned', 'signed', 'arrays of type bit for signals'],
    'used': false
    }*/, {
    'name': 'IEEE.numeric_std.all',
    'usage': ['unsigned', 'signed', 'arrays of type bit for signals'],
    'used': false,
    'require': 'IEEE.std_logic_1164.all'
  }, {
    'name': 'IEEE.std_logic_textio.all',
    'usage': ['readline', 'read', 'writeline', 'write', 'endline'],
    'used': false,
  }]
}


export let markers: Array<Marker> = [];
let architectureVariables: Array<string> = [];
let variables: Array<object> = [];
export let references = new Map<string, Reference>();
let ports: Array<object> = [];
let portsCounter = 0;
let varCount = 0;
export let quickfixes: Array<object> = [];
var quickfixCounter = 0;
export let architectureStatementPartContext;
export let architectureProcessStatementPartContexts: Array<Process_statement_partContext> = [];
export let decisionContexts: Array<Case_statementContext | If_statementContext> = [];
let fileName: string = null;
let architectureNames: string[] = [];
let entityNames: string[] = [];

var entityName = "";
export let codeLines;
var architectureStatementsCount = 0;
var architectureVarLine = 0;
var IEEEusages: Array<object> = setUsages();
var isIEEElibUsed = false;
var usageStartLine = 0;

class FunctionListener implements vhdlListener {

  enterLibrary_clause(context: Library_clauseContext) {
    //check if VHDL code includes IEEE library
    if (context.text.toLocaleLowerCase().includes("library".toLocaleLowerCase())) {
      if (context.text.toLocaleLowerCase().includes("IEEE".toLocaleLowerCase())) {
        isIEEElibUsed = true;
        usageStartLine = context._start.line + 1;
      }
    }
  }

  enterUse_clause(context: Use_clauseContext) {
    //update usages of IEEE library if present
    IEEEusages.forEach(usageElement => {
      //chceck if usage has all necessary dependencies, for example IEEE lib
      if (context.text.toLocaleLowerCase().includes(usageElement['name'].toLocaleLowerCase())) {
        if (isIEEElibUsed == false) {
          markers.push(new Marker(
            context._start.line,
            codeLines[context._start.line - 1].toLocaleLowerCase().indexOf(usageElement['name'].toLocaleLowerCase()) + 1,
            context._start.line,
            codeLines[context._start.line - 1].toLocaleLowerCase().indexOf(usageElement['name'].toLocaleLowerCase()) + usageElement['name'].length + 1,
            "Error: Missing declaration for IEEE library",
            MarkerSeverity.Error));

          quickfixes[quickfixCounter++] = {
            'title': `Add IEEE library declaration`,
            'text': "library IEEE;" + "\n",
            'message': "Error: Missing declaration for IEEE library",
            'position': {
              startColumnNumber: 0,
              startLineNumber: context._start.line,
              endColumnLine: "library IEEE;".length,
              endLineNumber: context._start.line
            }
          };
        }
        usageElement['used'] = true;
      }
    });
  }

  enterBlock_declarative_item(context: Block_declarative_itemContext) {
    // check signal declarations for usage of IEEE lib usages
    IEEEusages.forEach(usageElement => {
      usageElement['usage'].forEach(usage => {
        //if necessary is not present, generate error marker and quickfix
        if (context.text.includes(usage)) {
          if (usageElement['used'] == false) {
            markers.push(new Marker(
              context._start.line,
              codeLines[context._start.line - 1].indexOf(usage) + 1,
              context._start.line,
              codeLines[context._start.line - 1].indexOf(usage) + usage.length + 1,
              "Error: Missing usage for " + usage,
              MarkerSeverity.Error));

            quickfixes[quickfixCounter++] = {
              'title': `Add IEEE library use for ` + usage,
              'text': "use " + usageElement['name'] + ";" + "\n",
              'message': "Error: Missing usage for " + usage,
              'position': {
                startColumnNumber: 0,
                startLineNumber: usageStartLine,
                endColumnLine: ("Error: Missing usage for " + usage).length,
                endLineNumber: usageStartLine
              }
            };
          }
        }
      });
    });
  }

  enterIdentifier_list(context: Identifier_listContext) {
    //check architecture declarations for redundant char ","
    //example: signal x,y,z, : std_logic;
    if (context.text.includes(":")) {
      var problemLine = codeLines[context._start.line - 1];
      var startColumn = codeLines[context._start.line - 1].length - problemLine.split("").reverse().join("").indexOf(",");

      markers.push(new Marker(
        context._start.line,
        startColumn,
        context._start.line,
        startColumn + 1,
        "Error: Redundant character ','",
        MarkerSeverity.Error));

      quickfixes[quickfixCounter++] = {
        'title': `Remove redundant character ` + `','`,
        'text': ' ',
        'message': "Error: Redundant character ','"
      };
    }
  }

  enterArchitecture_body(context: Architecture_bodyContext) {

    var archDeclarationLine = context._start.line;
    var archLine = codeLines[archDeclarationLine - 1].split(" ");
    var archName = "";

    for (var i = 0; i < archLine.length; i++) {
      if (archLine[0].toLocaleLowerCase() == "architecture") {
        if (archLine[i] == "of") {
          //architecture name missing
          break;
        } else if (i != 0 && !(archLine[i] == "" || archLine[i] == " ")) {
          //architecture name found
          archName = archLine[i];
          break;
        }
      }
    }

    if (!architectureNames.includes(archName)) {
      architectureNames.push(archName);
    }

    if (architectureNames.length > 1) {
      markers.push(new Marker(
        context._start.line,
        startingWordColumn(codeLines[context._start.line - 1], archName),
        context._start.line,
        endingWordColumn(codeLines[context._start.line - 1], archName),
        `Warning: File should not contain more than one architecture!`,
        MarkerSeverity.Warning
      ));
    }

    if (archName !== fileName) {
      markers.push(new Marker(
        context._start.line,
        startingWordColumn(codeLines[context._start.line - 1], archName),
        context._start.line,
        endingWordColumn(codeLines[context._start.line - 1], archName),
        `Warning: Architecture name '${archName}' does not match with file name '${fileName}'`,
        MarkerSeverity.Warning
      ));
      quickfixes[quickfixCounter++] = {
        'title': `Change architecture name to ` + `'` + fileName + `'`,
        'text': fileName,
        'message': `Architecture name '${archName}' does not match with file name '${fileName}'`
      };
    }

    //check if architecture has name
    if (archName == "") {
      markers.push(new Marker(
        context._start.line,
        "architecture".length + 1,
        context._start.line,
        "architecture".length + 1 + 2,
        "Error: Architecture needs a name!",
        MarkerSeverity.Error
      ));
      quickfixes[quickfixCounter++] = null;
    } else {
      //check if architecture name is next to keyword END
      if (codeLines[context._stop.line - 1].match(new RegExp("\\b" + archName + "\\b")) == null) {
        //achitecture name missing near keyword

        //turn problem line backwards to set error index for marker
        var line = codeLines[context._stop.line - 1];
        line = line.split("").reverse().join("");
        var starCol = 0, index = 0;
        if (line.match(new RegExp("\\b" + 'erutcetihcra' + "\\b")) != null) {
          index = line.indexOf("erutcetihcra");
        } else if (line.match(new RegExp("\\b" + 'dne' + "\\b")) != null) {
          index = line.indexOf("dne");
        }

        starCol = codeLines[context._stop.line - 1].length - index + 1;
        markers.push(new Marker(
          context._stop.line,
          starCol,
          context._stop.line,
          codeLines[context._stop.line - 1].length + 1,
          "Error: Architecture name misspelled or missing!",
          MarkerSeverity.Error
        ));
        quickfixes[quickfixCounter++] = {
          'title': `Change architecture name to ` + `'` + archName + `'`,
          'text': ' ' + archName + ';',
          'message': "Error: Architecture name misspelled or missing!",
        };
      }
      //chcek if architecture describes existing entity
      if (entityName != "") {
        if (context.children[3].text == "") {
          markers.push(new Marker(
            context._start.line,
            codeLines[context._start.line - 1].indexOf(context.children[2].text) + 1 + 2,
            context._start.line,
            codeLines[context._start.line - 1].indexOf(context.children[2].text) + 1 + 2 + 2,
            "Error: Entity name missing!",
            MarkerSeverity.Error
          ));
          quickfixes[quickfixCounter++] = null;
        } else {
          if (context.children[3].text != entityName) {
            markers.push(new Marker(
              context._start.line,
              codeLines[context._start.line - 1].indexOf(context.children[3].text) + 1,
              context._start.line,
              codeLines[context._start.line - 1].indexOf(context.children[3].text) + context.children[3].text.length + 1,
              "Error: Entity name doesn't describe existing entity!",
              MarkerSeverity.Error));

            quickfixes[quickfixCounter++] = {
              'title': `Change entity name to ` + `'` + entityName + `'`,
              'text': entityName,
              'message': "Error: Entity name doesn't describe existing entity!"
            };
          }
        }
      }
    }
  }

  enterArchitecture_declarative_part(context: Architecture_declarative_partContext) {
    
    //get array of declared signal, variables etc. from architecture declaration
    const childCount = context.childCount;
    
    if (childCount) {
      architectureVarLine = context._start.line;
      architectureVariables = [];
      varCount = 0;
      for (var index = 0; index < context.childCount; index++) {
        
        const declarationLine: string = context.children[index].text;
        const holdsValue: boolean = declarationLine.includes(":=");
        const dataType: string = declarationLine.split(":")[1].split(":=")[0].trim();
        const declarationLineNumber: number = context._start.line + index;     

        //split context to array
        const declarationLineVariables = context.children[index].text.split(",");
        
        declarationLineVariables.forEach((variable) => {
          const variableWithType: string = variable;
          let variableName: string = "";
          let objectType: ObjectType = ObjectType.UNKNOWN;

          switch (true) {
            case variableWithType.toLocaleLowerCase().includes("signal"):
              variableName = variableWithType.replace("signal", "").replace(/ *:.*/, "");
              objectType = ObjectType.SIGNAL;
              break;
            case variableWithType.toLocaleLowerCase().includes("variable"):
              variableName = variableWithType.replace("variable", "").replace(/ *:.*/, "");
              objectType = ObjectType.VARIABLE;
              break;
            case variableWithType.toLocaleLowerCase().includes("constant"):
              variableName = variableWithType.replace("constant", "").replace(/ *:.*/, "");
              objectType = ObjectType.CONSTANT;
              break;
            default:
              variableName = variableWithType.replace(/ *:.*/, "");
              break;
          }

          variables[varCount++] = {
            'name': variableName,
            'dataType': dataType,
            'read': false,
            'write': holdsValue,
            'marked': false,
            'line': declarationLineNumber
          };

          references.set(variableName, new Reference(
            variableName,
            dataType,
            declarationLineNumber,
            holdsValue,
            objectType
          ));
        });
      }
    }
  }

  enterArchitecture_statement_part(context: Architecture_statement_partContext) {
    architectureStatementPartContext = context;
  }

  enterProcess_statement_part(ctx: Process_statement_partContext) {
    architectureProcessStatementPartContexts.push(ctx);
    const processStatementCodeLines = codeLines.slice(ctx._start.line - 1, ctx._stop.line);

    processStatementCodeLines.forEach((line) => {
      if (isIfStatement(line)) {
        const [leftVariable, rightVariable] = returnIfStatementVariables(line);
        setReferenceIsRead(leftVariable);
        setReferenceIsRead(rightVariable);
      } else if (isAssignmentStatement(line)) {
        const [leftVariable, rightVariable] = returnAssignmentStatementVariables(line);
        setReferenceIsWrite(leftVariable);
        setReferenceIsRead(rightVariable);
      }
    });
  }

  enterPackage_declarative_item(ctx: Package_declarative_itemContext) {
    // get Package name
    const packageDeclarationCodeLine = codeLines[ctx._start.line - 2].trim();
    const packageName = packageDeclarationCodeLine.split(' ')[1];

    let count = 0;
    ctx.children.forEach((child) => {
      const line = codeLines[ctx._start.line - 1 + count++];
      const childConstructorName = child.constructor.name;
      if (childConstructorName === 'Type_declarationContext') {
        const typeName = line.trim().split(' ')[1];
        const typeValues = line.trim().split('(')[1].split(')')[0].split(',');
        const trimmedTypeValues = typeValues.map((value) => value.trim());
        const reference = new Reference(
          typeName,
          typeName,
          ctx._start.line + count - 1,
          false,
          ObjectType.TYPE,
        );

        reference.typeValues = trimmedTypeValues;
        reference.codeBlockType = CodeBlockType.PACKAGE;
        reference.codeBlockName = packageName;

        references.set(typeName, reference);
      } else {
        const variableType = line.trim().split(' ')[0];
        let dataType: string = '';
        let objectType: ObjectType = ObjectType.UNKNOWN;
        let variableName: string = '';

        switch (true) {
          case variableType.toLocaleLowerCase() === 'signal':
            dataType = variableType;
            objectType = ObjectType.SIGNAL;
          case variableType.toLocaleLowerCase() === 'variable':
            dataType = variableType;
            objectType = ObjectType.VARIABLE;
          case variableType.toLocaleLowerCase() === 'constant':
            dataType = variableType;
            objectType = ObjectType.CONSTANT;
        }

        variableName = line.trim().split(' ')[1];
        const holdsValue = line.includes(':=');
        const reference = new Reference(
          variableName,
          dataType,
          ctx._start.line + count - 1,
          holdsValue,
          objectType,
        );

        reference.codeBlockType = CodeBlockType.PACKAGE;
        reference.codeBlockName = packageName;

        references.set(variableName, reference);
      }
    });
  }

  enterArchitecture_statement(context: Architecture_statementContext) {
    architectureStatementsCount++;

    if (context.children) {
      if (Array.isArray(variables) && variables.length > 0) {
        var index = 0;

        //check every architecture statements
        context.children.forEach(element => {
          var statement = codeLines[context._start.line - 1 + index++];
          var leftSide = "", rightside = "";

          if (statement.includes("<=")) {
            leftSide = statement.replace(/<=.*/, "");
            rightside = statement.replace(/.*<=/, "");
            var variableFound = false;

            leftSide = leftSide.replace(" ", "");
            leftSide = leftSide.replace(" ", "");

            if (rightside.includes("--")) {
              rightside = rightside.slice(0, rightside.indexOf("--"));
            }
            //check if left part of the statement uses ports
            for (var i = 0; i < portsCounter; i++) {

              try {
                if (leftSide.match(new RegExp("\\b" + ports[i]['name'] + "\\b")) != null) {
                  ports[i]['isUsed'] = true;
                  //check for port violation
                  if (ports[i]['isReadonly'] == true) {
                    var line = context._start.line + index - 1;
                    var startCol = codeLines[line - 1].indexOf(ports[i]['name']) + 1;
  
                    markers.push(new Marker(
                      line,
                      startCol,
                      line,
                      startCol + ports[i]['name'].length,
                      "Error: Cannot use input port for writing!",
                      MarkerSeverity.Error
                    ));
  
                    quickfixes[quickfixCounter++] = null;
                  }
                }
              }
              catch (e) {
                console.log("syn checker 1",e);
              }

              try {
                //check if right part of the statement uses ports
                if (rightside.match(new RegExp("\\b" + ports[i]['name'] + "\\b")) != null) {
                  ports[i]['isUsed'] = true;
  
                  //check for port violation
                  if (ports[i]['isReadonly'] == false) {
                    var line = context._start.line + index - 1;
                    var startCol = codeLines[line - 1].indexOf(ports[i]['name']) + 1;
  
                    markers.push(new Marker(
                      line,
                      startCol,
                      line,
                      startCol + ports[i]['name'].length,
                      "Error: Cannot use output port for reading!",
                      MarkerSeverity.Error
                    ));
  
                    quickfixes[quickfixCounter++] = null;
                  }
  
                }
              } catch (e) {
                console.log("syn checker 2",e);
              }
            }

            //check if statement uses declared architecture signals, variables etc.
            for (var i = 0; i < variables.length; i++) {

              //check if right side includes variable
              if (rightside.includes(variables[i]['name'])) {

                variables[i]['read'] = true;
                variableFound = true;
                if (variables[i]['write'] == false) {

                  markers.push(new Marker(
                    context._start.line + index - 1,
                    codeLines[context._start.line + index - 2].indexOf(variables[i]['name']) + 1,
                    context._start.line + index - 1,
                    codeLines[context._start.line + index - 2].indexOf(variables[i]['name']) + variables[i]['name'].length + 1,
                    "Error: Variable " + variables[i]['name'] + " has no value!",
                    MarkerSeverity.Error
                  ));

                  var startColumnNumber = codeLines[variables[i]['line'] - 1].indexOf(';') + 1;
                  var line = variables[i]['line'];
                  quickfixes[quickfixCounter++] = {
                    'title': `Add default value to variable ` + variables[i]['name'],
                    'text': `:= '0';`,
                    'message': "Error: Variable " + variables[i]['name'] + " has no value!",
                    'position': {
                      startColumnNumber: startColumnNumber,
                      startLineNumber: line,
                      endColumnLine: startColumnNumber,
                      endLineNumber: line
                    }
                  };
                }
              }

              leftSide = leftSide.replace(' ', '');
              leftSide = leftSide.replace('\t', '');
              leftSide = leftSide.replace(/^\s+|\s+$/gm, '');
              //check if left side includes variable
              if (leftSide.match(new RegExp("\\b" + variables[i]['name'] + "\\b"))) {
                //if(variables[i]['name'] == leftSide){
                variableFound = true;
                variables[i]['write'] = true;
              }
            }

            if (variableFound == false) {
              markers.push(new Marker(
                context._start.line + index - 1,
                codeLines[context._start.line + index - 2].indexOf(leftSide) + 1,
                context._start.line + index - 1,
                codeLines[context._start.line + index - 2].indexOf(leftSide) + leftSide.length + 1,
                "Error: Variable " + leftSide + " is not declared!",
                MarkerSeverity.Error
              ));

              startColumnNumber = 0;
              var line = architectureVarLine;
              quickfixes[quickfixCounter++] = {
                'title': `Declare viariable ` + leftSide + ` as signal`,
                'text': `signal ` + leftSide + ` : std_logic;` + "\n",
                'message': "Error: Variable " + leftSide + " is not declared!",
                'position': {
                  startColumnNumber: startColumnNumber,
                  startLineNumber: line,
                  endColumnLine: startColumnNumber,
                  endLineNumber: line
                }
              };
            }
          }
        });
      }

      //check if port ever used
      if (architectureStatementsCount == context._parent.childCount) {
        architectureStatementsCount = 0;

        for (var i = 0; i < ports.length; i++) {
          if (ports[i]['isUsed'] == false) {
            markers.push(new Marker(
              ports[i]['line'],
              ports[i]['column'] + 1,
              ports[i]['line'],
              ports[i]['column'] + ports[i]['name'].length + 1,
              `Warning: Port '` + ports[i]['name'] + `' declared, but never used!`,
              MarkerSeverity.Warning
            ));

            quickfixes[quickfixCounter++] = null;
          }
        }

        for (var i = 0; i < variables.length; i++) {
          if (variables[i]['read'] == false && variables[i]['write'] == false && variables[i]['marked'] == false) {
            variables[i]['marked'] = true;
            markers.push(new Marker(
              variables[i]['line'],
              codeLines[variables[i]['line'] - 1].indexOf(variables[i]['name']) + 1,
              variables[i]['line'],
              codeLines[variables[i]['line'] - 1].indexOf(variables[i]['name']) + variables[i]['name'].length + 1,
              `Warning: Variable '` + variables[i]['name'] + `' declared, but never used!`,
              MarkerSeverity.Warning
            ));

            quickfixes[quickfixCounter++] = null;
          }
        }
      }
    }
  }

  enterPort_list(context: Port_listContext) {
    const startLine = context._start.line;
    const stopLine = context._stop.line;
    const portListCodeLines = codeLines.slice(startLine - 1, stopLine);

    portListCodeLines.forEach((line) => {
      if (line.includes(',')) {
        const portList = line.split(',').map((port) => port.trim());
        portList.forEach((port) => {
          const includesPort = port.includes('port');
          const portName = includesPort
            ? port.match(/port\(\s*(\w+)/)?.[1]
            : port.match(/(\w+)/)?.[1];
          const portDirection = line.split(":")[1].trim().split(" ")[0].toLocaleLowerCase();
          const portType = line.split(":").slice(1).join(":").trim().split(" ").slice(1).join(" ").replace(/;/, '');
          references.set(portName, new Reference(
            portName,
            portType,
            startLine,
            false,
            portDirection === 'inout' || portDirection === 'in' ? ObjectType.PORT_IN : ObjectType.PORT_OUT,
            portDirection === 'in'
          ));
        });
      }

      const portName = line.split(":")[0].trim().replace(/Port\s*\(\s*/, '');
      const portDirection = line.split(":")[1].trim().split(" ")[0].toLocaleLowerCase();
      const portType = line.split(":").slice(1).join(":").trim().split(" ").slice(1).join(" ").replace(/;/, '');

      references.set(portName, new Reference(
        portName,
        portType,
        startLine,
        false,
        portDirection === 'inout' || portDirection === 'in' ? ObjectType.PORT_IN : ObjectType.PORT_OUT,
        portDirection === 'in'
      ));
    });
  }

  enterPort_clause(context: Port_clauseContext) {
    //check for missing usage in port declarations
    var index = 0;
    var portDeclarations = [];
    const PORT_DECLARATION_INDEX = 2;

    context.children.forEach(element => {
      var i = context.children[index];
      var portClausePart = context.children[index++].text;


      if (/^[a-zA-z].*/.test(portClausePart) && index - 1 == PORT_DECLARATION_INDEX) {
        portDeclarations = portClausePart.split(";");
        if (portDeclarations[portDeclarations.length - 1] == "") {

          for (var iter = context._start.line - 1; iter < context._stop.line - 1; iter++) {
            var line = codeLines[iter];

            //check for missing usage
            IEEEusages.forEach(usageElement => {
              usageElement['usage'].forEach(usage => {
                if (line.includes(usage)) {
                  if (usageElement['used'] == false) {
                    markers.push(new Marker(
                      iter + 1,
                      line.indexOf(usage) + 1,
                      iter + 1,
                      line.indexOf(usage) + usage.length + 1,
                      "Error: Missing usage for " + usage,
                      MarkerSeverity.Error));

                    quickfixes[quickfixCounter++] = {
                      'title': `Add IEEE library use for ` + usage,
                      'text': "use " + usageElement['name'] + ";" + "\n",
                      'message': "Error: Missing usage for " + usage,
                      'position': {
                        startColumnNumber: 0,
                        startLineNumber: usageStartLine,
                        endColumnLine: ("Error: Missing usage for " + usage).length,
                        endLineNumber: usageStartLine
                      }
                    };
                  }
                }
              });
            });

            line = line.replaceAll(" ", "");
            //check if port array ends with redundant char ";"
            if (line.includes(portDeclarations[portDeclarations.length - 2])) {
              var startCol = codeLines[iter].indexOf(";")
              var startLine = iter + 1;

              markers.push(new Marker(
                startLine,
                startCol + 1,
                startLine,
                startCol + 2,
                "Error: Redudant character ';'",
                MarkerSeverity.Error
              ));

              quickfixes[quickfixCounter++] = {
                'title': `Remove redundant character ` + `;`,
                'text': " ",
                'message': "Error: Redudant character ';'"
              };
            }
          }
        } else {
          for (var iter = context._start.line - 1; iter < context._stop.line - 1; iter++) {
            //check for missing usage
            var line = codeLines[iter];

            IEEEusages.forEach(usageElement => {
              usageElement['usage'].forEach(usage => {
                if (line.includes(usage)) {
                  if (usageElement['used'] == false) {
                    markers.push(new Marker(
                      iter + 1,
                      line.indexOf(usage) + 1,
                      iter + 1,
                      line.indexOf(usage) + usage.length + 1,
                      "Error: Missing usage for " + usage,
                      MarkerSeverity.Error));

                    quickfixes[quickfixCounter++] = quickfixes[quickfixCounter++] = {
                      'title': `Add IEEE library use for ` + usage,
                      'text': "use " + usageElement['name'] + ";" + "\n",
                      'message': "Error: Missing usage for " + usage,
                      'position': {
                        startColumnNumber: 0,
                        startLineNumber: usageStartLine,
                        endColumnLine: ("Error: Missing usage for " + usage).length,
                        endLineNumber: usageStartLine
                      }
                    };
                  }
                }
              });
            });
          }
        }
      }
    });
  }

  enterEntity_declaration(context: Entity_declarationContext) {
    if (context.children[1].text == "") {
      markers.push(new Marker(
        context._start.line,
        context._start.charPositionInLine + 3,
        context._start.line,
        context._start.charPositionInLine + 5,
        "Error: Entity name missing!",
        MarkerSeverity.Error
      ));

      quickfixes[quickfixCounter++] = null;
    } else {
      entityName = context.children[1].text;

      if (!entityNames.includes(entityName)) {
        entityNames.push(entityName);
      }
    }

    if (entityNames.length > 1) {
      markers.push(new Marker(
        context._start.line,
        startingWordColumn(codeLines[context._start.line - 1], entityName),
        context._start.line,
        endingWordColumn(codeLines[context._start.line - 1], entityName),
        `Warning: File should not contain more than one entity!`,
        MarkerSeverity.Warning
      ));
    }

    if (context.children[context.childCount - 2].text.toLocaleLowerCase() == "end") {
      markers.push(new Marker(
        context._stop.line,
        context._stop.charPositionInLine + 7,
        context._stop.line,
        context._stop.charPositionInLine + 9,
        "Error: Entity name missing!",
        MarkerSeverity.Error
      ));

      quickfixes[quickfixCounter++] = {
        'title': `Add entity name ` + `'` + entityName + `'`,
        'text': entityName,
        'message': "Error: Entity name missing!"
      };
    }

    if (context.childCount > 5 && context.children[context.childCount - 2].text.toLocaleLowerCase() != "end") {
      if (context.children[context.childCount - 2].text != context.children[1].text) {
        markers.push(new Marker(
          context._stop.line,
          context._stop.charPositionInLine - context.children[context.childCount - 2].text.length + 1,
          context._stop.line,
          context._stop.charPositionInLine + 1,
          "Error: Entity with this name doesn't exist!",
          MarkerSeverity.Error
        ));

        quickfixes[quickfixCounter++] = {
          'title': `Change entity name to ` + `'` + entityName + `'`,
          'text': entityName,
          'message': "Error: Entity with this name doesn't exist!"
        };

      }
    }
  }

  enterCase_statement (ctx: Case_statementContext) {
    decisionContexts.push(ctx);
  }

  enterIf_statement(ctx: If_statementContext) {
    decisionContexts.push(ctx);

    if (ctx.text.includes('elseif')) {
      const elseIf = 'else if';

      for (let i = ctx.start.line; i < ctx.stop.line; i++) {
        const line = codeLines[i];

        if (line.toLocaleLowerCase().includes(elseIf)) {
          markers.push(new Marker(
            i + 1,
            startingWordColumn(line, elseIf),
            i + 1,
            endingWordColumn(line, elseIf),
            'Error: Use "elsif" instead of "elseif"',
            MarkerSeverity.Error,
          ));
        }
      }
    };
  }

}


export class ParseErrorListener implements ANTLRErrorListener<any> {
  // @ts-ignore
  syntaxError<T extends TSymbol>(recognizer: Recognizer<T, any>, offendingSymbol: T | undefined, line: number, charPositionInLine: number, msg: string, e: RecognitionException | undefined): void {

    if (msg.includes("missing ';' at '")) {

      markers.push(new Marker(line,
          charPositionInLine,
          line,
          charPositionInLine + 2,
          msg,
          MarkerSeverity.Error
        )
      );

      var startColumnNumber;
      if (codeLines[line - 2].includes('--')) {
        startColumnNumber = codeLines[line - 2].indexOf('--');// + 1;
      } else {
        startColumnNumber = codeLines[line - 2].length + 1;
      }
      quickfixes[quickfixCounter++] = {
        'title': `Add ';' to the end of previous line`,
        'text': '; ',
        'message': msg,
        'position': {
          startColumnNumber: startColumnNumber, startLineNumber: line - 1,
          endColumnLine: startColumnNumber + 1, endLineNumber: line - 1
        }
      };
    } else if (msg.includes("no viable alternative at input '")) {

      markers.push(new Marker(line,
          charPositionInLine,
          line,
          charPositionInLine + 2,
          msg,
          MarkerSeverity.Error
        )
      );

      quickfixes[quickfixCounter++] = {
        'title': `Change assign characters to '<='`,
        'text': ' <= ',
        'message': msg,
      };
    } else if (msg.includes("mismatched input '=' expecting {BUS, REGISTER, ':=', ';'}")) {

      markers.push(new Marker(line,
          charPositionInLine,
          line,
          charPositionInLine + 2,
          msg,
          MarkerSeverity.Error
        )
      );

      quickfixes[quickfixCounter++] = {
        'title': `Change assign characters to ':='`,
        'text': ' := ',
        'message': msg,
      };
    } else if (msg.includes("extraneous input ',' expecting {BASIC_IDENTIFIER, EXTENDED_IDENTIFIER}")) {

      markers.push(new Marker(line,
          charPositionInLine + 1,
          line,
          charPositionInLine + 2,
          msg,
          MarkerSeverity.Error
        )
      );

      quickfixes[quickfixCounter++] = {
        'title': `Remove character ','`,
        'text': '',
        'message': msg,
      };
    } else if (msg.includes("missing {BASIC_IDENTIFIER, EXTENDED_IDENTIFIER} at ')'")) {

      markers.push(new Marker(line,
          charPositionInLine + 1,
          line,
          charPositionInLine + 2,
          msg,
          MarkerSeverity.Error
        )
      );

      quickfixes[quickfixCounter++] = null;
    } else {

      markers.push(new Marker(line,
          charPositionInLine,
          line,
          charPositionInLine + 2,
          msg,
          MarkerSeverity.Error
        )
      );

      quickfixes[quickfixCounter++] = null;
    }
  }
}

export function syntaxAnalyzer(code: string, filename: string = 'test.vhd') {
  architectureProcessStatementPartContexts = null;
  architectureStatementPartContext = null;
  quickfixes = [];
  quickfixCounter = 0;
  markers = [];
  variables = [];
  IEEEusages = setUsages();
  isIEEElibUsed = false;
  usageStartLine = 0;
  ports = [];
  portsCounter = 0;
  codeLines = code.split("\n");
  references = new Map<string, Reference>();
  architectureProcessStatementPartContexts = [];
  architectureStatementPartContext = null;
  decisionContexts = [];
  fileName = filename.split('.')[0];
  architectureNames = [];
  entityNames = [];

  let inputStream = new ANTLRInputStream(code);
  let lexer = new vhdlLexer(inputStream);
  lexer.removeErrorListeners();
  // @ts-ignore
  lexer.addErrorListener(new ParseErrorListener());
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new vhdlParser(tokenStream);
  parser.removeErrorListeners();
  // @ts-ignore
  parser.addErrorListener(new ParseErrorListener());
  let tree = parser.design_file();
  const listener: vhdlListener = new FunctionListener();
  ParseTreeWalker.DEFAULT.walk(listener, tree);

  clearSemanticMarkers();
  clearSemanticQuickfixes();

  return listener;
}

export default function parseAndGetMarkersVHDL(code: string, filename: string): [Array<Marker>, Array<object>] {
  syntaxAnalyzer(code, filename);

  new VHDLSemanticVisitor(
    architectureProcessStatementPartContexts,
    architectureStatementPartContext,
    decisionContexts);

  // add semanticMarkers to markers
  semanticMarkers.forEach((marker) => {
    markers.push(marker);
  });

  semanticQuickfixes.forEach((quickfix) => {
    quickfixes.push(quickfix);
  });

  clearSemanticMarkers();
  clearSemanticQuickfixes();

  return [markers, quickfixes];
}
