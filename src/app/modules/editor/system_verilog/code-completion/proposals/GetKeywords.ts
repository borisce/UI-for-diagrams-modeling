import { Text } from '../../markers/Text';
import { wordTypes } from '../../markers/wordTypes';
import { systemVerilogKeywords } from './systemVerilogKeywords';
import { Word } from '../../markers/Word';
import ITextModel = monaco.editor.ITextModel;
import FindMatch = monaco.editor.FindMatch;

export function getAllKeywords(code: ITextModel): [Array<string>, Array<string>,Text] {
  const allWords: Text = new Text();
  const keywords: Array<string> = [];
  const variables: Array<string> = [];
  getWords();
  for (const keyword of allWords.findAllWordsAfterWord('parameter')) {
    variables.push(keyword);
  }
  for (const keyword of allWords.findAllWordsAfterWord('variable')) {
    variables.push(keyword);
  }
  for (const keyword of allWords.findAllWordsAfterWord('keyword')) {
    keywords.push(keyword);
  }
  for (const keyword of allWords.findAllWordsAfterWord('enum')) {
    keywords.push(keyword);
  }
  for (const keyword of allWords.findAllWordsAfterWord('}')) {
    if (['}', ';', ','].indexOf(keyword) === -1) {
      keywords.push(keyword);
    }
  }
  return [keywords, variables,allWords];

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
    } else if (word.match('([!=\?][=!]?[=!]?)') || word.match('[&|][&|]?') || word.match('or\\b')) {
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

        allWords.addNewWord(new Word(position, word, getWordType(word), isInsideFun(isInside)));
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
}

