import { createDependencyProposals } from "./system_verilog/code-completion/proposals/dependecyProposals";
import { getMarkers } from "./system_verilog/markers/getAllMarkers";
import { getSystemVerilog } from "./system_verilog/highlight/SystemVerilogHighlight";
import IMonarchLanguage = monaco.languages.IMonarchLanguage;
import { Marker } from "./semantic-check/interfaces/Marker";
import { Text } from "./system_verilog/markers/Text";
import { FilesService } from "src/app/core/fileSystem/Filer/files.service";
import { getAllKeywords } from "./system_verilog/code-completion/proposals/GetKeywords";
import { getQuickFixActions } from '../editor/monacoQuickFix';

import parseAndGetMarkersVHDL from "./vhdl/syntax-check/syntaxChecker";
import { getVhdl } from "./vhdl/highlight/vhdlHighlight";

import { Subject } from "rxjs";
import { CollabService } from "src/app/core/service/collab.service";
import { TreeView } from "@syncfusion/ej2-angular-navigations";

import ITextModel = monaco.editor.ITextModel;
import ICodeEditor = monaco.editor.ICodeEditor;
import Position = monaco.Position;

import { PredictionResponse } from "src/app/api/codecompletion/models/prediction-response";
import { CodeSearchService } from "./system_verilog/jump-to-definition/code-search/code-search.service";
import parseAndGetMarkers from "./system_verilog/syntax-check/syntaxCheckerSv";
import { debounce } from "lodash";
import { environment } from '../../../environments/environment';

export const onMonacoLoadObservable: Subject<void> = new Subject();

export const onMonacoLoaded = (treeObj: TreeView, collabService: CollabService, codeSearchService: CodeSearchService, fileService: FilesService, getCompletions: (completion_id: string, prompt: string, maxNumberPredictions: number, minLenPerPrediction: number) => Promise<PredictionResponse>, editor: any) => {

  monaco.languages.register({ id: 'SystemVerilog' });
  monaco.languages.register({ id: 'Vhdl' });

  let importedKeyWords: Array<string> = [];
  let importedVariables: Array<string> = [];
  let quickfixes = [];
  let quickfixCounter = 0;
  let isOnLoadVhdl = true;
  let quickfixesSV = [];
  let openFilefame = null;

  //....................  VHDL parse  ............................

  monaco.editor.createModel('this is my new cool model');

  monaco.languages.setMonarchTokensProvider('Vhdl', getVhdl() as IMonarchLanguage);

  const configure: monaco.languages.LanguageConfiguration = {
    surroundingPairs: [
      { open: 'begin', close: ' end' },
      { open: '(', close: ')' },
      { open: '[', close: ']' },
      { open: '{', close: '}' },
    ],
    autoClosingPairs: [
      { open: 'begin', close: ' end' },
      { open: '(', close: ')' },
      { open: '[', close: ']' },
      { open: '"', close: '"' },
    ],
    brackets: [
      ['begin', 'end'],
      ['(', ')'],
      ['[', ']'],
      ['{', '}']
    ],
    comments: {
      lineComment: '--',
      blockComment: ['/*', '*/']
    }
  };

  monaco.languages.setLanguageConfiguration('Vhdl', configure);


  // VHDL quickfixes
  monaco.languages.registerCodeActionProvider("Vhdl", {
    provideCodeActions: (
      model /**ITextModel*/,
      range /**Range*/,
      context /**CodeActionContext*/,
      token /**CancellationToken*/
    ) => {
      if (!editor) {
        return {
          actions: null,
          dispose: () => { }
        }
      }

      if (!openFilefame || openFilefame !== collabService.fileName) {
        openFilefame = collabService.fileName;
        let myParserMarkers = [];
        [myParserMarkers, quickfixes] = parseAndGetMarkersVHDL(model.getValue(), collabService.fileName);
        monaco.editor.setModelMarkers(model, 'Vhdl', myParserMarkers);
      }
      return {
        actions: context.markers.map(marker => {
          return getQuickFixActions(model, marker, quickfixes);
        }),
        dispose: () => { }
      }
    }
  });

  // set colors for VHDL code
  (window as any).monaco.editor.defineTheme('VerilogDark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'variables', foreground: '#00ccaf' },
      { token: 'custom-error', foreground: '#ff0000', fontStyle: 'bold' },
      { token: 'class', foreground: '#cc7eff' },
      { token: 'custom-date', foreground: '#008800' },
      { token: 'ne', foreground: '#5b9b4c' },
      { token: 'keywords', foreground: '#389edb' },
      { token: 'comment', foreground: '#5b9b4c' },
      { token: 'specialChars', foreground: '#0082c1' },
      { token: 'string', foreground: '#0bc157' },
      { token: 'operators', foreground: '#00ccaf' },
      { token: 'numbers', foreground: '#a8c79d' },
    ]
  });

  const checkSyntaxVDHL = debounce((model) => {
    let myParserMarkers = [];
    quickfixes = [];
    [myParserMarkers, quickfixes] = parseAndGetMarkersVHDL(model.getValue(), collabService.fileName);
    monaco.editor.setModelMarkers(model, 'Vhdl', myParserMarkers);
  }, 1000);

  //parse VHDL code
  (window as any).monaco.languages.registerCompletionItemProvider('Vhdl', {
    provideCompletionItems: (model, position) => {
      const allWords: Text = getMarkers(model, position)[1];

      if (allWords.findAllWordsAfterWord('import').length > 0 && localStorage.getItem('importedFiles') === null) {
        for (const importFile of allWords.findAllWordsAfterWord('import')) {
          importedKeyWords = [];
          importedVariables = [];
          localStorage.setItem('importedFiles', 'true');
          fileService.readFiles(localStorage.getItem('pathToFile').substring(0, localStorage.getItem('pathToFile').lastIndexOf('/') + 1) + importFile + '.vhd').then(
            x => {
              [importedKeyWords, importedVariables] = getAllKeywords(monaco.editor.createModel(x));
            });
        }
      }

      //parse VHDL code on change
      //timeout for parsing code after user finishes typing
      if (editor) {
        model.onDidChangeContent(() => checkSyntaxVDHL(model));
      }

      const textUntilPosition: any = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });

      const word: any = model.getWordUntilPosition(position);

      const range: any = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };
      console.log('VHDL completion', word, editor);
      return { suggestions: word && editor ? createDependencyProposals(model, position, textUntilPosition, allWords) : [] };
    }
  });



  //..............................  System Verilog parse ...........................

  monaco.languages.onLanguage("SystemVerilog", () => {
    let importedKeyWordsSV: Array<string> = [];
    let importedVariablesSV: Array<string> = [];


    monaco.editor.createModel('this is my new cool model');
    monaco.languages.setMonarchTokensProvider('SystemVerilog', getSystemVerilog() as IMonarchLanguage);
    const configureSV: any = {
      surroundingPairs: [
        { open: 'begin', close: ' end' },
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '{', close: '}' },
      ],
      autoClosingPairs: [
        { open: 'begin', close: ' end' },
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '"', close: '"' },
      ],
      brackets: [
        ['begin', 'end'],
        ['(', ')'],
        ['[', ']'],
        ['{', '}']
      ],
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      }
    };

    monaco.languages.setLanguageConfiguration('SystemVerilog', configureSV);

    monaco.languages.registerCodeActionProvider("SystemVerilog", {
      provideCodeActions: async (
        model /**ITextModel*/,
        range /**Range*/,
        context /**CodeActionContext*/,
        token /**CancellationToken*/
      ) => {
        if (!editor) {
          return {
            actions: null,
            dispose: () => {
            }
          };
        }

        if (!openFilefame || openFilefame !== collabService.fileName) {
          openFilefame = collabService.fileName;
          let myParserMarkers = [];
          [myParserMarkers, quickfixesSV] = await parseAndGetMarkers(model.getValue(), collabService.fileName, collabService);
          monaco.editor.setModelMarkers(model, 'SystemVerilog', myParserMarkers);
        }
        return {
          actions: context.markers.map(marker => {
            return getQuickFixActions(model, marker, quickfixesSV);
          }),
          dispose: () => { }
        }
      }
    });

    (window as any).monaco.editor.defineTheme('VerilogDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'variables', foreground: '#00ccaf' }, //'#8dbfff' },
        { token: 'custom-error', foreground: '#ff0000', fontStyle: 'bold' },
        { token: 'class', foreground: '#cc7eff' },
        { token: 'custom-date', foreground: '#008800' },
        { token: 'ne', foreground: '#5b9b4c' },
        { token: 'keywords', foreground: '#389edb' }, //'#ff6c59' },
        { token: 'comment', foreground: '#5b9b4c' },//'#575a5d' },
        { token: 'specialChars', foreground: '#0082c1' },
        { token: 'string', foreground: '#0bc157' },
        { token: 'operators', foreground: '#00ccaf' },//'#c1431e' },
        { token: 'numbers', foreground: '#a8c79d' },//'#ff8e18' },
      ]
    });

    const debouncedFunction = debounce(async (model, position) => {
      let myParserMarkers = [];
      [myParserMarkers, quickfixesSV] = await parseAndGetMarkers(model.getValue(), collabService.fileName, collabService);
      let addMarkersSV = getMarkers(model, position, importedKeyWords)[0];
      let allMarkersSV = myParserMarkers.concat(addMarkersSV);
      monaco.editor.setModelMarkers(model, 'SystemVerilog', allMarkersSV);
    }, 1000);

    monaco.languages.registerCompletionItemProvider('SystemVerilog', {
      provideCompletionItems: (model, position) => {
        let allMarkers: Array<Marker> = new Array<Marker>();
        const allWords: Text = getMarkers(model, position)[1];
        if (allWords.findAllWordsAfterWord('import').length > 0 && localStorage.getItem('importedFiles') === null) {
          for (const importFile of allWords.findAllWordsAfterWord('import')) {
            importedKeyWordsSV = [];
            importedVariablesSV = [];
            localStorage.setItem('importedFiles', 'true');
            fileService.readFiles(localStorage.getItem('pathToFile').substring(0, localStorage.getItem('pathToFile').lastIndexOf('/') + 1) + importFile + '.sv').then(
              x => {
                [importedKeyWordsSV, importedVariablesSV] = getAllKeywords(monaco.editor.createModel(x));
              });
          }
        }

        if (editor) {
          model.onDidChangeContent(() => debouncedFunction(model, position));
        }

        const textUntilPosition: any = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        }
        );
        const word: any = model.getWordUntilPosition(position);
        const range: any = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        return { suggestions: word && true ? createDependencyProposals(model, position, textUntilPosition, allWords) : [] };
      }
    });
  });
}
