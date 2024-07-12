import { Marker } from '../../semantic-check/interfaces/Marker';
import { Word } from './Word';
import ITextModel = monaco.editor.ITextModel;
import Position = monaco.Position;
import FindMatch = monaco.editor.FindMatch;
import { Text } from './Text';
import Range = monaco.Range;
import { systemVerilogKeywords } from '../code-completion/proposals/systemVerilogKeywords';
import { wordTypes } from './wordTypes';


export function getMarkers(code: ITextModel, positionInCode?: Position, importedKeyWords?: Array<string>, importedVariables?: Array<string>): [Array<Marker>, Text] {
  const allWords: Text = new Text();
  const markers: Array<Marker> = [];
  let ovalBrackets: number = 0;
  //console.time('ALL words in get markers')
  getWords();
  //console.timeEnd('ALL words in get markers')


  //console.time('In get markers')
  const brackets: Map<string, number> = new Map<string, number>();
  brackets.set('(', (code.getValue().match(/\(/g) || []).length);
  brackets.set(')', (code.getValue().match(/\)/g) || []).length);
  brackets.set('[', (code.getValue().match(/\[/g) || []).length);
  brackets.set(']', (code.getValue().match(/\]/g) || []).length);
  brackets.set('begin', (code.getValue().split('begin') || []).length - 1);
  brackets.set('end', (code.getValue().match(/\bend\b/g) || []).length);
  if (brackets.get('(') > brackets.get(')')) {
    const coords: Position = code.getPositionAt(code.getValue().lastIndexOf('('));
    markers.push(new Marker(coords.lineNumber,
      coords.column,
      coords.lineNumber,
      coords.column + 1,
      'Missing )',
      monaco.MarkerSeverity.Error
      )
    );
  } else if (brackets.get('(') < brackets.get(')')) {
    const coords: Position = code.getPositionAt(code.getValue().lastIndexOf(')'));
    markers.push(new Marker(coords.lineNumber,
      coords.column,
      coords.lineNumber,
      coords.column,
      'Incorrect syntax! Matching \'(\' was not found!',
      monaco.MarkerSeverity.Error
    )
    );
  }

  if (brackets.get('[') > brackets.get(']')) {
    const coords: Position = code.getPositionAt(code.getValue().lastIndexOf('['));
    markers.push(new Marker(coords.lineNumber,
      coords.column,
      coords.lineNumber,
      coords.column + 1,
      'Missing ]',
      monaco.MarkerSeverity.Error

      )
    );
  } else if (brackets.get('[') < brackets.get(']')) {
    const coords: Position = code.getPositionAt(code.getValue().lastIndexOf(']'));
    markers.push(new Marker(coords.lineNumber,
      coords.column,
      coords.lineNumber,
      coords.column + 1,
      'Incorrect syntax! Matching \'[\' was not found!',
      monaco.MarkerSeverity.Error
    )
    );
  }


  if (brackets.get('begin') > brackets.get('end')) {
    const coords: Position = code.getPositionAt(code.getValue().lastIndexOf('begin'));
    markers.push(new Marker(
      coords.lineNumber,
      coords.column,
      coords.lineNumber,
      coords.column + 5,
      'Incorrect syntax ! Missing end statement',
      monaco.MarkerSeverity.Error
    ));
  } else if (brackets.get('begin') < brackets.get('end')) {
    // const coords: Range = allWords.findLast('end')?.position.range;
    // markers.push(new Marker(
    //   coords.startLineNumber,
    //   coords.startColumn,
    //   coords.endLineNumber,
    //   coords.endColumn,
    //   'Incorrect syntax ! Missing begin statement ',
    //   monaco.MarkerSeverity.Error
    // ));
  }

  //console.timeEnd('In get markers')
  
  //console.time('In find rule')
  // allWords.text.forEach((word) => {
  //   if (allWords.findRule(word)) {
  //     markers.push(allWords.findRule(word));
  //   }
  // });
  //console.timeEnd('In find rule')
  return [markers, allWords];


  function isInsideFun(count: number): any {
    if (count > 0) {
      return true;
    }
    return false;
  }

  function getWordType(word: string): any {
    if (word.match('\\)')) {
      return wordTypes.CloseBracket;
    } else if (word.match('\\(')) {
      return wordTypes.OpenBracket;
    } else if (word.match('(["][a-z_A-Z .@%:0-9]+["])')) {
      return wordTypes.String;
    } else if (word.match('[.][a-zA-Z_]+')) {
      return wordTypes.Function;
    } else if (word.match('begin' as string)) {
      return wordTypes.Begin;
    } else if (word.match('end\\b')) {
      return wordTypes.End;
    } else if (word.match('[0-9]+')) {
      return wordTypes.Number;
    } else if (word.match('([!=\?><][=!]?[=!]?)') || word.match('[&|][&|]?') || word.match('or\\b')) {
      return wordTypes.LogicalExpresion;
    } else if (systemVerilogKeywords().indexOf(word) !== -1
      || systemVerilogKeywords().indexOf(word.substring(1)) !== -1
      || (importedKeyWords !== undefined && importedKeyWords.indexOf(word) !== -1)) {
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
    } else if (word.match('(#)')) {
      return wordTypes.OpenBracket;
    } else if (word.match(';')) {
      return wordTypes.DottedDash;
    } else if (word.match('[`a-z_A-Z1-9]+')) {
      return wordTypes.Variable;
    } else if (word.match('(:)')) {
      return wordTypes.DoubleDot;
    } else if (word.match('({)')) {
      return wordTypes.OpenCurtlyBrackets;
    } else if (word.match('(})')) {
      return wordTypes.CloseCurlyBrackets;
    } else if (word.match('(\')')) {
      return wordTypes.SingleQuote;
    }

    return wordTypes.Unknown;
  }

  function getnextChar(i: number): string {
    if (code.getValue().charAt(i + 1).match(/[ \n\s\r\t]/gm)) {
      return getnextChar(i + 1);
    } else {
      return code.getValue().charAt(i + 1);
    }
  }

  function getWords(): any {
    let isInside: number = 0;
    if (code.getLineCount() > 1) {
      const fistPosition: FindMatch = code.findNextMatch('' +
      '([)(\\[\\]]|[;,]' +
      '|[\/][\*]' +
      '|[\*][\/]' +
      '|[\/][\/]' +
      '|[end]\\b' +
      '|(\')' +
      '|[`a-z_A-Z0-9]+' +
      '|[begin]\\b' +
      '|(["][a-z_A-Z. @%:0-9]+["])' +
      '|[.][a-zA-Z_]+' +
      '|[+\\-*/%]' +
      '|([<>=][=]?)' +
      '|([!=\?][=!]?[=!]?)' +
      '|[&|][&|]?' +
      '|[!])' +
      '|(:)' +
      '|(@)' +
      '|(#)' +
      '|({)' +
      '|(})',
        code.getPositionAt(0),
        true,
        false,
        null,
        false);
      let position: FindMatch = fistPosition;
      let word: any = code.getValueInRange(fistPosition.range);
      let loopCheck: boolean = false;
      allWords.addNewWord(new Word(position, word, getWordType(word), isInsideFun(isInside)));
      while (position.range.getEndPosition().lineNumber < code.getLineCount()) {
        position = code.findNextMatch('' +
          '([)(\\[\\]]|[;,]' +
          '|[\/][\*]' +
          '|[\*][\/]' +
          '|[\/][\/]' +
          '|[end]\\b' +
          '|(\')' +
          '|[`a-z_A-Z0-9]+' +
          '|[begin]\\b' +
          '|(["][a-z_A-Z. @%:0-9]+["])' +
          '|[.][a-zA-Z_]+' +
          '|[+\\-*/%]' +
          '|([<>=][=]?)' +
          '|([!=\?][=!]?[=!]?)' +
          '|[&|][&|]?' +
          '|[!])' +
          '|(:)' +
          '|(@)' +
          '|(#)' +
          '|({)' +
          '|(})',
          position.range.getEndPosition()
          , true
          , false
          , null
          , false);
        word = code.getValueInRange(position.range);
        if (word === '(' || word === '{') {
          isInside++;
        } else if (word === ')' || word === '}') {
          isInside--;
        }

        if (position.range.startColumn === fistPosition.range.startColumn
          && position.range.endColumn === fistPosition.range.endColumn
          && position.range.startLineNumber === fistPosition.range.startLineNumber
          && loopCheck) {
          break;
        }
        loopCheck = true;

        if (!(word === '==' || word === '//')) {
          const alreadyExists = allWords.text.find((w) => w.value === word);

          if (alreadyExists) {
            continue;
          }

          allWords.addNewWord(new Word(position, word, getWordType(word), isInsideFun(isInside)));
        }
      }
    }


  }

  function getNextWord(i: number): any {
    return code.getValueInRange(code.findNextMatch(
      '([begin]\\b' +
      '|[end]' +
      '|[)(]' +
      '|[;,]' +
      '|[`a-z_A-Z1-9]+' +
      '|(["][a-z_A-Z.]+["])' +
      '|[.][a-z_]+)',
      code.getPositionAt(i),
      true,
      false,
      null,
      false).range);
  }

  function finPosition(c: string, i: number): any {
    switch (c) {
      case ' ':
        break;
      case '(':
        ovalBrackets++;
        break;
      case ')':
        ovalBrackets--;
        if (getnextChar(i).match(/[.]/gm) && ovalBrackets % 2 === 1) {
          const coords: Position = code.getPositionAt(i + 1);
          markers.push(new Marker(coords.lineNumber,
            coords.column,
            coords.lineNumber,
            coords.column,
            'Missing ","',
            monaco.MarkerSeverity.Error
          ));
        } else if (getnextChar(i).match(/[.]/gm)) {
          const coords: Position = code.getPositionAt(i + 1);
          markers.push(new Marker(coords.lineNumber,
            coords.column,
            coords.lineNumber,
            coords.column,
            'Missing ";"',
            monaco.MarkerSeverity.Error
          ));
        }
        break;
    }
  }
}
