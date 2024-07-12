import { DependencieProposal } from './DependencieProposal';
import { systemVerilogKeywords } from './systemVerilogKeywords';
import { Word } from '../../markers/Word';
import { Text } from '../../markers/Text';
import { wordTypes } from '../../markers/wordTypes';
import ITextModel = monaco.editor.ITextModel;
import FindMatch = monaco.editor.FindMatch;
import IPosition = monaco.IPosition;
import { createSnippetDependencyProposals } from './snippetProposals';
import { externalDependencies } from '../../../semantic-check/systemVerilog/instanceCheckerSv';


function calculateRelevanceScore(suggestion: DependencieProposal, currentContext: string): number {
  let relevanceScore = 0;
  
  // Check if suggestion label starts with current context
  if (suggestion.label.toLowerCase().startsWith(currentContext.toLowerCase())) {
    relevanceScore += 100;
  }
  
  // Check if suggestion label contains current context
  if (suggestion.label.toLowerCase().includes(currentContext.toLowerCase())) {
    relevanceScore += 50;
  }
  
  // Add relevance score based on suggestion kind
  switch (suggestion.kind) {
    case monaco.languages.CompletionItemKind.Method:
      relevanceScore += 20;
      break;
    case monaco.languages.CompletionItemKind.Property:
      relevanceScore += 15;
      break;
    case monaco.languages.CompletionItemKind.Class:
      relevanceScore += 10;
      break;
    case monaco.languages.CompletionItemKind.Variable:
      relevanceScore += 5;
      break;
    default:
      break;
  }
  
  return relevanceScore;
}

export function createDependencyProposals(code: ITextModel, position: IPosition, full_context:string, allWords?: Text): any {
  const dependencies: Array<DependencieProposal> = [];
  const helpingArray: Array<string> = [];

  
  for (const dep of systemVerilogKeywords()) {
    if (['if', 'ifelse', 'always_ff', 'always_comb','assign'].indexOf(dep) === -1) {
      helpingArray.push(dep);
      dependencies.push(new DependencieProposal(
        dep,
        monaco.languages.CompletionItemKind.Keyword,
        dep,
        null,
        {
          value: ''
        },
        dep
      ));
    }
  }

  const codeWithoutComments: string = full_context.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

  createSnippetDependencyProposals(codeWithoutComments).forEach(snippet => {
    dependencies.push(snippet);
  });

  externalDependencies.forEach(externalDep => {
    dependencies.push(externalDep);
  });

  getMyVariables(codeWithoutComments, position,allWords).forEach((element: {value: string;type: string;}) => {
    if (!helpingArray.find(elementAr => elementAr === element.value)) {
      helpingArray.push(element.value);
      dependencies.push(new DependencieProposal(
        element.value,
        getCompletionType(allWords, element),
        element.value,
        null,
        {
          value: ''
        },
        element.value
      ));
    }
  });

  return dependencies;
}

export function getMyVariables(code: string, positionUntil: IPosition,allWords: Text): Set<{value: string, type: string}> {

  const finalList: Set<{value: string, type: string}> = new Set<{value: string, type: string}>();
  
  const regex_ports = new RegExp('(?:(input)|(output)|(inout))\\s+(?:\\[[^\\[\\]]+\\]\\s+)?(\\w+)', 'g');
  const regex_signals = new RegExp('(?:(wire)|(reg)|(logic)|(integer)|(real))\\s+(?:\\[[^\\[\\]]+\\]\\s+)?(\\w+)','g');
  
  const regex_structures = new RegExp('(?:struct)\\s*\\{\\s*([\\s\\S]*?)\\}\\s*([\\w_]+)\\s*;','g');
  const regex_import_file = new RegExp('import\\s*(\\w+)::','g');

  
  const regex_string_1 = new RegExp('\\"(.+)\\"','g');
  const regex_string_2 = new RegExp('\\\'(.+)\\\'','g');
  const allStructures = [];
  const allSignals = [];
  const allPorts = [];
  const allStringsTemp = [];
  const allStrings = [];
  const allImports = [];
  let match;

  while ((match = regex_import_file.exec(code)) !== null) {
    allImports.push(match[1]);
  } 

  while ((match = regex_string_1.exec(code)) !== null) {
    allStringsTemp.push(match[0]);
  } 
  while ((match = regex_string_2.exec(code)) !== null) {
    allStringsTemp.push(match[0]);
  }
  allStringsTemp.forEach(element => {
    element.replace(/[^a-z\d\s,.]+/gi, "").split(/[ ,.]+/).forEach(e => {
      allStrings.push(e)
    });
  });

  while ((match = regex_structures.exec(code)) !== null) {
    allStructures.push(match[3]);
  }
  while ((match = regex_signals.exec(code)) !== null) {
    allSignals.push(match[1]);
  }
  while ((match = regex_ports.exec(code)) !== null) {
    if(match[1] != 'wire' && match[1] != 'reg' && match[1] != 'logic' && match[1] != 'integer' && match[1] != 'real' && !allSignals.includes(match[1])){
      allPorts.push(match[1]);
    }
  }


  allWords.text.forEach(element => {
    if ((element.type === 'variable') && allImports != null && allImports.find(signal => signal === element.value)) {
      finalList.add({value: element.value, type: 'import'});
    } 
    else
    if ((element.type === 'variable' || element.type === 'number') && allStrings != null && allStrings.find(signal => signal === element.value)) {
      finalList.add({value: element.value, type: 'string'});
    } 
    else if (element.type === 'variable' && allStructures != null && allStructures.find(signal => signal === element.value)) {
      finalList.add({value: element.value, type: 'structure'});
    } 
    else if (element.type === 'variable' && allSignals != null && allSignals.find(signal => signal === element.value)) {
      finalList.add({value: element.value, type: 'signal'});
    } 
    else if (element.type === 'variable' && allPorts != null && allPorts.find(port => port === element.value)) {
      finalList.add({value: element.value, type: 'port'});
    } 
    else{
      finalList.add({value: element.value, type: element.type});
    }
  });

  return finalList;
}


function getCompletionType(allWords: Text, word: {value: string;type: string;}): monaco.languages.CompletionItemKind {
  if (allWords.findFirst(word.value) != null) {
    const wordBefore: Word = allWords.findFirstBeforeWordString(allWords.findFirst(word.value),
      ['#',
        ')',
        'module',
        'typedef',
        'package',
        'import',
      'function',
      'class',
      'interface',
      'input',
      'event',
      'enum',
      'include',
      'struct'
    ]
    );
    if (word.type == 'string'){
      return monaco.languages.CompletionItemKind.Text;
    }
    if (word.type == 'import'){
      return monaco.languages.CompletionItemKind.File;
    }
    if (word.type == 'signal'){
      return monaco.languages.CompletionItemKind.Constant;
    }
  
    if (word.type == 'structure'){
      return monaco.languages.CompletionItemKind.Struct;
    }
  
    if (word.type == 'port'){
      return monaco.languages.CompletionItemKind.Constant;
    }

    if (wordBefore != null) {
      switch (wordBefore.value) {
        case '#':
          return monaco.languages.CompletionItemKind.Property;

        case 'enum':
          return monaco.languages.CompletionItemKind.Enum;
        
        case 'function' || 'task':
          return monaco.languages.CompletionItemKind.Method;

        case 'class':
          return monaco.languages.CompletionItemKind.Class;

        case 'interface':
          return monaco.languages.CompletionItemKind.Interface;

        case 'module':
          return monaco.languages.CompletionItemKind.Module;

        case 'package':
          return monaco.languages.CompletionItemKind.Field;

        case 'event':
          return monaco.languages.CompletionItemKind.Event;

        case 'struct':
          return monaco.languages.CompletionItemKind.Struct;
        
        case 'include' || 'import':
          return monaco.languages.CompletionItemKind.File;

      }
    }
  }
  
  return monaco.languages.CompletionItemKind.Variable;
}

function getWords(code: any): any {
  const allWords: Text = new Text();
  let isInside: number = 0;
  if (code.getLineCount() > 1) {
    const fistPosition: FindMatch = code.findNextMatch(
      '([begin]\\b|[end]|[)(]|[;,]|[`a-z_A-Z1-9]+|(["][a-z_A-Z.]+["])|[.][a-z_]+)',
      code.getPositionAt(0),
      true,
      false,
      null,
      false);
    let position: FindMatch = fistPosition;
    let word: any = code.getValueInRange(fistPosition.range);
    let loopCheck: boolean = false;
    allWords.addNewWord(new Word(position, word, getWordType(word), false));
    while (position.range.getEndPosition().lineNumber < code.getLineCount()) {
      position = code.findNextMatch(
        '' +
        '([)(\\[\\]]|[;,]' +
        '|[\/][\*]' +
        '|[\*][\/]' +
        '|[\/][\/]' +
        '|[end]\\b' +
        '|[`a-z_A-Z1-9]+' +
        '|[begin]\\b' +
        '|(["][a-z_A-Z. ]+["])' +
        '|[.][a-zA-Z_]+' +
        '|[+\\-*/%]' +
        '|([<>=][=]?)' +
        '|([!=][=!]?[=!]?)' +
        '|[&|][&|]?' +
        '|[!])' +
        '|(:)' +
        '|(@)',
        position.range.getEndPosition()
        , true
        , false
        , null
        , false);
      word = code.getValueInRange(position.range);
      if (word === '(') {
        isInside++;
      } else if (word === ')') {
        isInside--;
      }

      if (position.range.startColumn === fistPosition.range.startColumn
        && position.range.endColumn === fistPosition.range.endColumn
        && loopCheck) {
        break;
      }
      loopCheck = true;

      allWords.addNewWord(new Word(position, word, getWordType(word), false));
    }
  }
}

function getWordType(word: string): any {
  if (word.match('\\)')) {
    return wordTypes.CloseBracket;
  } else if (word.match('\\(')) {
    return wordTypes.OpenBracket;
  } else if (word.match('(["][a-z_A-Z .]+["])')) {
    return wordTypes.String;
  } else if (word.match('[.][a-zA-Z_]+')) {
    return wordTypes.Function;
  } else if (word.match('begin' as string)) {
    return wordTypes.Begin;
  } else if (word.match('end\\b')) {
    return wordTypes.End;
  } else if (word.match('[1-9]+')) {
    return wordTypes.Number;
  } else if (word.match('([!=][=!]?[=!]?)') || word.match('[&|][&|]?') || word.match('or\\b')) {
    return wordTypes.LogicalExpresion;
  } else if (systemVerilogKeywords().indexOf(word) !== -1
    || systemVerilogKeywords().indexOf(word.substring(1)) !== -1) {
    return wordTypes.Keyword;
  } else if (word.match('[\/][\*]')) {
    return wordTypes.MultilineCommentStart;
  } else if (word.match('[\*][\/]')) {
    return wordTypes.MultilineCommentStop;
  } else if (word.match('[\/][\/]')) {
    return wordTypes.OneLineComment;
  } else if (word.match('[+\\-*/%]')) {
    return wordTypes.Expresion;
  } else if (word.match('\\[')) {
    return wordTypes.OpenSquareBracket;
  } else if (word.match('\\]')) {
    return wordTypes.CloseSquareBracket;
  } else if (word.match(',')) {
    return wordTypes.Dash;
  } else if (word.match(';')) {
    return wordTypes.DottedDash;
  } else if (word.match('[`a-z_A-Z1-9]+')) {
    return wordTypes.Variable;
  }

  return wordTypes.Unknown;
}
