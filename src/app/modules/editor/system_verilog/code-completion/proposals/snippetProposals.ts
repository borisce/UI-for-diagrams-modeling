import { DependencieProposal } from "./DependencieProposal";

export function createModuleSnippetDependencyProposals(
  context: string
): Array<DependencieProposal> {
  const regex_snippet = new RegExp(
    "(?:(\\w*)\\s+\\w+\\s+\\((\\s*(?:(input)|(output)|(inout))\\s+(?:(wire\\s+)|(reg\\s+)|(logic\\s+)|(integer\\s+)|(real\\s+))?(?:\\[[^\\[\\]]+\\]\\s+)?(\\w+)\\s*,?(?:\\s*\\/\\/.*)*(?:\\s*\\/\\*.*)*\\s*)*\\))|(?:(\\w*)\\s*\\w*\\s*#\\s*\\((\\s*(?:(parameter\\s+)|(int\\s+)|(real\\s+)|(string\\s+))?(?:(int\\s+)|(real\\s+)|(string\\s+))?\\w+\\s*=\\s*[0-9]*\\s*,?(?:\\s*\\/\\/.*)*(?:\\s*\\/\\*.*)*\\s*)*\\)\\s*\\((\\s*(?:(input)|(output)|(inout))\\s+(?:(wire\\s+)|(reg\\s+)|(logic\\s+)|(integer\\s+)|(real\\s+))?(?:\\[[^\\[\\]]+\\]\\s*)*(\\w+)\\s*,?(?:\\s*\\/\\/.*)*(?:\\s*\\/\\*.*)*\\s*)*\\))",
    "g"
  );
  const regex_snippet_name = new RegExp(
    "(?:(?<=(module\\s){1}))(\\w+)\\s+#?\\(",
    "g"
  );
  const regex_snippet_ports = new RegExp(
    "\\s*(?:(input)|(output)|(inout))\\s+(?:(wire\\s+)|(reg\\s+)|(logic\\s+)|(integer\\s+)|(real\\s+))?(?:\\[[^\\[\\]]+\\]\\s*)*(\\w+)\\s*,?",
    "g"
  );
  const regex_snippet_params = new RegExp('\\s*(?:(parameter\\s+)|(int\\s+)|(real\\s+)|(string\\s+))?(?:(int\\s+)|(real\\s+)|(string\\s+))?(\\w+)\\s*=','g')
  const regex_all_params = new RegExp(
    "(?:(\\w*)\\s*\\w*\\s*#\\s*\\((\\s*(?:(parameter\\s+)|(int\\s+)|(real\\s+)|(string\\s+))?(?:(int\\s+)|(real\\s+)|(string\\s+))?(\\w+)\\s*=\\s*[0-9]*\\s*,?(?:\\s*\\/\\/.*)*(?:\\s*\\/\\*.*)*\\s*)*\\s*)",
    "g"
  );


  let match;

  // console.log(context)
  const allSnippets = context.match(regex_snippet);

  const allSnippetTemplates = [];

  allSnippets?.forEach((element) => {
    // console.log(element.match(regex_snippet_ports));
    let snippet = "";
    let snippetName = "";
    let isFirstParam = true;
    let i = 1;

    while ((match = regex_snippet_name.exec(element)) !== null) {
      // console.log('match');
      snippetName = match[2];
      i++;
      snippet = snippet + snippetName;
    }

    while ((match = regex_all_params.exec(element)) !== null) {
      const all_params = match[0]
      // console.log(match);
      // console.log(all_params);
      let inMatch;
      while (( inMatch = regex_snippet_params.exec(all_params)) !== null) {
        // console.log(inMatch);
        if (isFirstParam) {
          snippet = snippet + "#(\n";
          isFirstParam = false;
        }
        snippet = snippet + "\t." + inMatch[8] + "(${" + i + ":param_val}),\n";
        i++;

        // console.log(snippet);
      }
    }
    if (!isFirstParam) {
      snippet = snippet + ")";
    }
    snippet = snippet + " ${" + i + ":name} (\n";
    while ((match = regex_snippet_ports.exec(element)) !== null) {
      snippet = snippet + "\t." + match[9] + "(${" + i + ":port_val}),\n";
      i++;
    }
    snippet = snippet + ");\n";
    let proposal = new DependencieProposal(
      snippetName,
      monaco.languages.CompletionItemKind.Snippet,
      snippet,
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an " + snippetName,
        kind: monaco.languages.SymbolKind.Module,
      },
      snippetName
    );

    allSnippetTemplates.push(proposal);
  });

  return allSnippetTemplates;
}

export function createSnippetDependencyProposals(
  context: string
): Array<DependencieProposal> {

  const result = [
    new DependencieProposal(
      "assign",
      monaco.languages.CompletionItemKind.Snippet,
      "assign ${1:var} = ${2:value};$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an assignment",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "assign"
    ),
    new DependencieProposal(
      "force",
      monaco.languages.CompletionItemKind.Snippet,
      "force ${1:var} = ${2:value};$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a force assignment",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "force"
    ),
    new DependencieProposal(
      "always",
      monaco.languages.CompletionItemKind.Snippet,
      ["always @($1:sensitivity_list) begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an always block",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "always"
    ),
    new DependencieProposal(
      "always_ff",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "always_ff @(posedge ${1:clk} or negedge ${2:rst_n}) begin",
        "\tif (~rst_n) begin",
        "\t\t",
        "\tend else begin",
        "\t\t",
        "\tend",
        "end",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an always_ff block with reset",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "always_ff with reset"
    ),
    new DependencieProposal(
      "always_ff",
      monaco.languages.CompletionItemKind.Snippet,
      ["always_ff @(posedge ${1:clk} begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an always_ff block without reset",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "always_ff without reset"
    ),
    new DependencieProposal(
      "always_latch",
      monaco.languages.CompletionItemKind.Snippet,
      ["always_latch begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an always_latch block",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "always_latch"
    ),
    new DependencieProposal(
      "always_comb",
      monaco.languages.CompletionItemKind.Snippet,
      ["always_comb begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an always_comb block",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "always_comb"
    ),
    new DependencieProposal(
      "if",
      monaco.languages.CompletionItemKind.Snippet,
      ["if (${1:condition}) begin", "\t${2:pass}", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an if statement",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "if"
    ),
    new DependencieProposal(
      "if else",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "if (${1:condition}) begin",
        "\t${2:pass}",
        "end else begin",
        "\t${3:pass}",
        "end",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an if statement with else",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "if else statement"
    ),
    new DependencieProposal(
      "else if",
      monaco.languages.CompletionItemKind.Snippet,
      ["else if (${1:condition}) begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an else if statement",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "else if statement"
    ),
    new DependencieProposal(
      "else",
      monaco.languages.CompletionItemKind.Snippet,
      ["else begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an else statement",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "else"
    ),
    new DependencieProposal(
      "case",
      monaco.languages.CompletionItemKind.Snippet,
      ["case (${1:variable})", "\t$0", "endcase"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a case statement",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "case"
    ),
    new DependencieProposal(
      "case/default",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "case (${1:variable})",
        "\t$0",
        "\tdefault: begin",
        "\tend",
        "endcase",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a case statement with default",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "case with default"
    ),
    new DependencieProposal(
      "while",
      monaco.languages.CompletionItemKind.Snippet,
      ["while (${1:expression}) begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a while loop",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "while loop"
    ),
    new DependencieProposal(
      "for",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "for (int ${1:i}=0; ${1:i}<${2:MAX}; ${1:i}=${1:i}+1) begin",
        "\t$0",
        "end",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a for loop",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "for loop"
    ),
    new DependencieProposal(
      "foreach",
      monaco.languages.CompletionItemKind.Snippet,
      ["foreach (${1:arr}[${2:i}]) begin", "\t$0", "end"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a foreach loop",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "foreach loop"
    ),
    new DependencieProposal(
      "function",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "function ${1:return_value} ${2:name}(${3:port_list});",
        "\t$0",
        "endfunction",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a function definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "function"
    ),
    new DependencieProposal(
      "task",
      monaco.languages.CompletionItemKind.Snippet,
      ["task ${1:name}(${2:port_list});", "\t$0", "endtask"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a task definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "task"
    ),
    new DependencieProposal(
      "class",
      monaco.languages.CompletionItemKind.Snippet,
      ["class ${1:name};", "\t$0", "endclass"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a class definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "class"
    ),
    new DependencieProposal(
      "class/extends",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "class ${1:name} extends ${2:super};",
        "\tfunction new();",
        "\t\t$0",
        "\tendfunction",
        "endclass",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a class definition with extends",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "class with extends"
    ),
    new DependencieProposal(
      "program",
      monaco.languages.CompletionItemKind.Snippet,
      ["program ${1:name}(${2:port_list});", "\t$0", "endprogram"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a program definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "program"
    ),
    new DependencieProposal(
      "module",
      monaco.languages.CompletionItemKind.Snippet,
      ["module ${1:name}(", "\t${2:port_list}", ");", "\t$0", "endmodule"].join(
        "\n"
      ),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a module definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "module"
    ),
    new DependencieProposal(
      "module#(param)",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "module ${1:name} #(",
        "\t${2:parameters}",
        ") (",
        "\t${3:port_list}",
        ");",
        "\t$0",
        "endmodule",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a parameterized module definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "parameterized module"
    ),
    new DependencieProposal(
      "assert",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "${1:label}: assert (${2:test})",
        '\telse \\$error("${0:Assertion ${1:label} failed!}");',
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an immediate assertion",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "immediate assertion"
    ),
    new DependencieProposal(
      "property",
      monaco.languages.CompletionItemKind.Snippet,
      [
        "property ${1:name};",
        "\t@(posedge ${2:clk}) ${0:test}",
        "endproperty",
      ].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a property",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "property"
    ),
    new DependencieProposal(
      "generate",
      monaco.languages.CompletionItemKind.Snippet,
      ["generate;", "\t$0", "endgenerate"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a generate block",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "generate"
    ),
    new DependencieProposal(
      "typedef/struct",
      monaco.languages.CompletionItemKind.Snippet,
      ["typedef struct packed {", "\t$0", "} ${1:name};"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a structure type definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "structure type"
    ),
    new DependencieProposal(
      "typedef/enum",
      monaco.languages.CompletionItemKind.Snippet,
      "typedef enum ${1:type} { $0 } ${2:name};",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a enumeration type definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "enumeration type"
    ),
    new DependencieProposal(
      "interface",
      monaco.languages.CompletionItemKind.Snippet,
      ["interface ${1:name};", "\t$0", "endinterface"].join("\n"),
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an interface definition",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "interface"
    ),
    new DependencieProposal(
      "ter",
      monaco.languages.CompletionItemKind.Snippet,
      "$1 ? $2 : $3",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a ternary operator expression",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "ternary operator expression"
    ),
    new DependencieProposal(
      "reg",
      monaco.languages.CompletionItemKind.Snippet,
      "reg $1;$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a register declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "register"
    ),
    new DependencieProposal(
      "rega",
      monaco.languages.CompletionItemKind.Snippet,
      "reg [$1:$2] $3;$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a multi-bit register declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "multi-bit register"
    ),
    new DependencieProposal(
      "regm",
      monaco.languages.CompletionItemKind.Snippet,
      "reg [$1:$2] $3 [$4:$5];$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a memory register declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "memory register"
    ),
    new DependencieProposal(
      "wire",
      monaco.languages.CompletionItemKind.Snippet,
      "wire $1;$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a wire declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "wire"
    ),
    new DependencieProposal(
      "wirea",
      monaco.languages.CompletionItemKind.Snippet,
      "wire [$1:$2] $3;$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a multi-bit wire declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "multi-bit wire"
    ),
    new DependencieProposal(
      "logic",
      monaco.languages.CompletionItemKind.Snippet,
      "logic $1;$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a logic signal declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "logic signal"
    ),
    new DependencieProposal(
      "logica",
      monaco.languages.CompletionItemKind.Snippet,
      "logic [$1:$2] $3;$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for a multi-bit logic signal declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "multi-bit logic signal"
    ),
    new DependencieProposal(
      "array",
      monaco.languages.CompletionItemKind.Snippet,
      "[${1:8}:${2:0}]$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an array declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "array"
    ),
    new DependencieProposal(
      "assoc",
      monaco.languages.CompletionItemKind.Snippet,
      "${1:type} ${2:name}[${3:index_type}];$0",
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      {
        value: "Snippet for an associative array declaration",
        kind: monaco.languages.CompletionItemTag.Deprecated,
      },
      "associative array"
    ),
  ];

  return result;
}
