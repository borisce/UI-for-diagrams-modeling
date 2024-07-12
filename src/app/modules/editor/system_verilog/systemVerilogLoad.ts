import { createDependencyProposals } from './code-completion/proposals/dependecyProposals';
import { getMarkers } from './markers/getAllMarkers';
import { getSystemVerilog } from './highlight/SystemVerilogHighlight';
import IMonarchLanguage = monaco.languages.IMonarchLanguage;
import {Marker} from '../semantic-check/interfaces/Marker';
import {Text} from './markers/Text';
import {FilesService} from '../../../core/fileSystem/Filer/files.service';

import {getAllKeywords} from './code-completion/proposals/GetKeywords';


export function myMonacoLoad(): any {
  const fileService = new FilesService(null, null, null);
  monaco.languages.register({ id: 'SystemVerilog' });
  let importedKeyWords: Array<string> = [];
  let importedVariables: Array<string> = [];
  monaco.editor.createModel('this is my new cool model');
  monaco.languages.setMonarchTokensProvider('SystemVerilog', getSystemVerilog() as IMonarchLanguage
  );
  const configure: any = {
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

  monaco.languages.setLanguageConfiguration('SystemVerilog', configure);
  (window as any).monaco.editor.defineTheme('VerilogDark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'variables', foreground: '#8dbfff' },
      { token: 'custom-error', foreground: '#ff0000', fontStyle: 'bold' },
      { token: 'class', foreground: '#cc7eff' },
      { token: 'custom-date', foreground: '#008800' },
      { token: 'keywords', foreground: '#ff6c59' },
      { token: 'comment', foreground: '#575a5d' },
      { token: 'specialChars', foreground: '#0082c1' },
      { token: 'string', foreground: '#0bc157' },
      { token: 'operators', foreground: '#c1431e' },
      { token: 'numbers', foreground: '#ff8e18' },

    ]
  });

  (window as any).monaco.languages.registerCompletionItemProvider('SystemVerilog', {
    provideCompletionItems: (model, position) => {
      let allMarkers: Array<Marker> = new Array<Marker>();
      const allWords: Text = getMarkers(model, position)[1];
      if (allWords.findAllWordsAfterWord('import').length > 0 && localStorage.getItem('importedFiles') === null) {
        for (const importFile of allWords.findAllWordsAfterWord('import')) {
          importedKeyWords = [];
          importedVariables = [];
          localStorage.setItem('importedFiles', 'true');

          fileService.readFiles(localStorage.getItem('pathToFile').substring(0, localStorage.getItem('pathToFile').lastIndexOf('/') + 1) + importFile + '.sv').then(
            x => {
              [importedKeyWords, importedVariables] = getAllKeywords(monaco.editor.createModel(x));
            });
        }
      }

      model.onDidChangeContent((event) => {
        // let myParserMarkers = parseAndGetMarkers(model.getValue());
        // let addMarkers = getMarkers(model, position, importedKeyWords)[0];
        // let allMarkers = myParserMarkers.concat(addMarkers);
        // monaco.editor.setModelMarkers(model, 'SystemVerilog', allMarkers);
      });

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

      return { suggestions: word ? createDependencyProposals(model, position, model, allWords) : [] };
    }
  });
}
