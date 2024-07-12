import { Word } from './Word';
import { Marker } from '../../semantic-check/interfaces/Marker';
import { wordTypes } from './wordTypes';
import Position = monaco.Position;

export class Text {

  public text: Array<Word> = [];

  public addNewWordToFront(word:Word):any{
    this.text.unshift(word)
  }
  
  public addNewWord(word: Word): any {
    this.text.push(word);
  }

  public findFirst(wordToFind: string): Word {
    for (const slovo of this.text) {
      if (slovo.value === wordToFind) {
        return slovo;
      }
    }
    return null;
  }

  public findLast(wordToFind: string): any {
    for (const slovo of this.text.reverse()) {
      if (slovo.value === wordToFind) {
        this.text.reverse();
        return slovo;
      }
      this.text.reverse();
    }
    return null;
  }


  public findFirstBefore(wordToFind: string, position: Position): any {
    const allMatching: Array<Word> = [];
    for (const slovo of this.text.reverse()) {
      if (slovo.value === wordToFind) {
        allMatching.push(slovo);
      }
      this.text.reverse();
    }
    for (const positionLine of allMatching) {
      if (positionLine.position.range.startLineNumber < position.lineNumber) {
        return positionLine;
      }
    }
  }

  public findFirstTypeBefore(wordToFind: string[], position: Position): any {
    const allMatching: Array<Word> = [];
    for (const slovo of this.text.reverse()) {
      if (wordToFind.indexOf(slovo.type) !== -1) {
        allMatching.push(slovo);
      }
    }
    this.text.reverse();
    for (const positionLine of allMatching) {
      if (positionLine.position.range.startLineNumber <= position.lineNumber
        && positionLine.position.range.startColumn < position.column) {

        return positionLine;
      }
    }
  }

  public findAllWordsAfterWord(wordToFind: string): Array<string> {
    const foundWords: Array<string> = [];
    for (let i: number = 0; i < this.text.length; i++) {
      if (this.text[i].value === wordToFind) {

        foundWords.push(this.text[i + 1].value as string);
      }
    }
    return foundWords;
  }

  public findFirstBeforeWord(myWord: Word,
    whatTofind: wordTypes,
    whatToFindSecond?: wordTypes): any {
    for (let i: number = this.text.indexOf(myWord); i > 0; i--) {
      if (whatToFindSecond === undefined && this.text[i].type === whatTofind) {
        return this.text[i];
      } else if (whatToFindSecond &&
        (this.text[i].type === whatToFindSecond || this.text[i].type === whatTofind)) {
        return this.text[i];
      }
    }
    return null;
  }

  public findFirstBeforeWordString(myWord: Word,
    whatToFind: string[]): Word {
    for (let i: number = this.text.indexOf(myWord); i >= 0; i--) {
      if (whatToFind.indexOf(this.text[i].value) !== -1) {
        return this.text[i];
      }
    }
    return null;
  }

  public findFirstAfterWord(myWord: Word,
    whatTofind: wordTypes,
    whatToFindSecond?: wordTypes): any {
    for (let i: number = this.text.indexOf(myWord) + 1; i < this.text.length; i++) {
      if (whatToFindSecond === undefined && this.text[i].type === whatTofind) {
        return this.text[i];
      } else if (whatToFindSecond &&
        (this.text[i].type === whatToFindSecond || this.text[i].type === whatTofind)) {
        return this.text[i];
      }
    }
    return null;
  }

  public findFirstAfterWordString(myWord: Word,
    whatTofind: string,
    whatToFindSecond?: string): any {
    for (let i: number = this.text.indexOf(myWord) + 1; i < this.text.length; i++) {
      if (whatToFindSecond === undefined && this.text[i].value === whatTofind) {
        return this.text[i];
      } else if (whatToFindSecond &&
        (this.text[i].value === whatToFindSecond || this.text[i].value === whatTofind)) {
        return this.text[i];
      }
    }
    return null;
  }

  public findFirstAfter(wordToFind: string, position: Position): any {
    const allMatching: Array<Word> = [];
    for (const slovo of this.text) {
      if (slovo.value === wordToFind) {
        allMatching.push(slovo);
      }
    }

    for (const positionLine of allMatching) {
      if (positionLine.position.range.startLineNumber >= position.lineNumber
        && positionLine.position.range.startColumn > position.column) {
        return positionLine;
      }
    }
  }

  public findNextWord(word: Word): any {
    let nextNumber: number = this.text.indexOf(word) + 1;
    while (this.isCommented(this.text[nextNumber])) {
      nextNumber++;
    }
    if (this.text[nextNumber] !== undefined) {
      return this.text[nextNumber];
    } else { return { type: 'undefined' }; }
  }

  public findVariablesInCodeBlock(block: Word[], wordToFind: string[]): boolean {
    if (block !== undefined) {
      const codeBlock: any = this.text.slice(this.text.indexOf(block[0]) + 1, this.text.indexOf(block[1]));
      for (const slovo of codeBlock) {
        if (wordToFind.indexOf(slovo.value) !== -1) {
          return true;
        }
      }
      return false;
    }
  }

  public findCodeBlock(word: Word): any {
    const count = {};
    this.text.forEach(x => count[x.value] = (count[x.value] || 0) + 1);
    if (count['begin'] === count['end']) {
      const firstBegin: Word = this.findFirstAfterWord(word, wordTypes.Begin);
      if (firstBegin === null) {
        return undefined;
      }
      let anotherBegin: Word = firstBegin;
      let lastEnd: Word;
      let counter: number = 1;
      while (counter !== 0) {
        lastEnd = this.findFirstAfterWord(anotherBegin, wordTypes.Begin, wordTypes.End);
        if (lastEnd.type === wordTypes.End) {
          counter--;
          anotherBegin = lastEnd;
        } else {
          counter++;
          anotherBegin = lastEnd;
        }

      }
      return [firstBegin, lastEnd];
    }
  }

  public findPreviousWord(word: Word): any {
    if (this.text[this.text.indexOf(word) - 1]) {
      return this.text[this.text.indexOf(word) - 1];
    } else {
      return this.text[this.text.indexOf(word)];
    }
  }

  public findNextAppearance(word: Word): boolean {
    const subText: any = this.text.slice(this.text.indexOf(word) + 1, this.text.length);
    for (const slovo of subText) {
      if (slovo.value === word.value) {
        return true;
      }
    }
    return false;
  }

  public findPreviousappaearance(word: Word): boolean {
    const subText: any = this.text.slice(0, this.text.indexOf(word));
    for (const slovo of subText) {
      if (this.findPreviousWord(slovo).type === 'keyword' && slovo.value === word.value) {
        return true;
      }
    }
    return false;
  }

  public isCommented(word: Word): any {
    if (this.findFirstBeforeWord(word, wordTypes.OneLineComment) !== null) {
      if (this.findFirstBeforeWord(word, wordTypes.OneLineComment).position.range.startLineNumber
        === word.position.range.startLineNumber) {
        return true;
      }

    } else if (this.findFirstBeforeWord(word,
      wordTypes.MultilineCommentStart,
      wordTypes.MultilineCommentStop) !== null && this.findFirstBeforeWord(word,
        wordTypes.MultilineCommentStart,
        wordTypes.MultilineCommentStop).type === wordTypes.MultilineCommentStart) {
      return true;
    }
    return false;
  }

  public findRule(word: Word): any {
    switch (word.type) {
      case wordTypes.CloseBracket:
        if (word.isInside
          && [wordTypes.CloseBracket,
          wordTypes.Dash,
          wordTypes.OpenBracket,
          wordTypes.Variable,
          wordTypes.Begin,
          wordTypes.CloseCurlyBrackets,
          wordTypes.DoubleDot,
          wordTypes.LogicalExpresion
          ].indexOf(this.findNextWord(word).type) === -1
          && this.isCommented(word) === false) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.startColumn + 1,
            word.position.range.endLineNumber,
            word.position.range.endColumn + 1,
            '\',\' expected!',
            monaco.MarkerSeverity.Error
          );*/
        } else if (!word.isInside
          && [wordTypes.CloseBracket,
          wordTypes.DottedDash,
          wordTypes.OpenBracket,
          wordTypes.Variable,
          wordTypes.Begin,
          wordTypes.DoubleDot,
          wordTypes.LogicalExpresion].indexOf(this.findNextWord(word).type) === -1 &&
          this.isCommented(word) === false) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.startColumn + 1,
            word.position.range.endLineNumber,
            word.position.range.endColumn + 1,
            '\';\' expected!',
            monaco.MarkerSeverity.Error
          );*/
        }
        break;

      case wordTypes.OpenBracket:
        if (this.findPreviousWord(word).value === '@' && this.findNextWord(word).type === ')') {
          return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            'Sensitivity list cannot be empty !',
            monaco.MarkerSeverity.Error
          );
        }
        break;


      case wordTypes.Variable:
        if (word.isInside
          && [wordTypes.String,
          wordTypes.Dash,
          wordTypes.Expresion,
          wordTypes.LogicalExpresion,
          wordTypes.CloseBracket,
          wordTypes.OpenSquareBracket,
          wordTypes.Function,
          wordTypes.DoubleDot,
          wordTypes.CloseCurlyBrackets,
          wordTypes.CloseSquareBracket
          ].indexOf(this.findNextWord(word).type) === -1
          && this.isCommented(word) === false
          && this.findFirstBeforeWord(word, wordTypes.OpenCurtlyBrackets, wordTypes.OpenBracket).type === wordTypes.OpenBracket
          && !this.findIfBefore(word, 'for')
        ) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            '\',\' expected!',
            monaco.MarkerSeverity.Error
          );*/
        } else if (!word.isInside
          && [wordTypes.String,
          wordTypes.DottedDash,
          wordTypes.Expresion,
          wordTypes.LogicalExpresion,
          wordTypes.OpenBracket,
          wordTypes.CloseBracket,
          wordTypes.Function,
          wordTypes.CloseSquareBracket,
          wordTypes.OpenSquareBracket,
          wordTypes.DoubleDot
          ].indexOf(this.findNextWord(word).type) === -1
          && this.findPreviousWord(word).type !== ':'
          && !this.isCommented(word)
          && ['ifndef', 'import', 'enum', 'parameter'].indexOf(this.findPreviousWord(word).value.replace('`', '')) === -1
        ) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn + 1,
            word.position.range.endLineNumber,
            word.position.range.endColumn + 1,
            '\';\' expected!',
            monaco.MarkerSeverity.Error
          );*/
        } else if (!this.findNextAppearance(word)
          && this.countOfWord(word) === 1
          && !this.isCommented(word)
          && [wordTypes.Keyword].indexOf(this.findPreviousWord(word).type) !== -1
          && ['assign', 'module', 'package'].indexOf(this.findPreviousWord(word).value) === -1
        ) {
          return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            word.value + ' is never used.',
            monaco.MarkerSeverity.Warning
          );
        } else if (!this.isDeclared(word)
          && !this.isCommented(word)
          && !word.isInside
          && this.findPreviousWord(word).value !== 'module'
          && word.position.range.startLineNumber > 1
          && ([wordTypes.Keyword,
          wordTypes.CloseSquareBracket,
          wordTypes.CloseCurlyBrackets,
          wordTypes.OpenCurtlyBrackets,
          wordTypes.DoubleDot].indexOf(this.findPreviousWord(word).type) === -1 || this.findPreviousWord(word).value === 'assign')
          && this.findFirstBeforeWordString(word, ['parameter']) === null) {
          return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            word.value + ' is never declared.',
            monaco.MarkerSeverity.Error
          );
        }
        break;

      case wordTypes.Dash:
        if (word.isInside
          && [wordTypes.CloseBracket].indexOf(this.findNextWord(word).type) !== -1) {
          return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn + 1,
            word.position.range.endLineNumber,
            word.position.range.endColumn + 1,
            'Incorrect syntax ! \',\' cannot be followed by \')\'',
            monaco.MarkerSeverity.Error
          );
        }
        break;

      case wordTypes.LogicalExpresion:
        if (word.value === '='
          && [wordTypes.DottedDash,
            wordTypes.Dash,
            wordTypes.CloseBracket,
            wordTypes.OpenSquareBracket,
            wordTypes.CloseSquareBracket].indexOf(this.findNextWord(word).type) !== -1) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn + 1,
            word.position.range.endLineNumber,
            word.position.range.endColumn + 1,
            'Incorrect syntax !',
            monaco.MarkerSeverity.Error
          );*/
        }
        break;

      case wordTypes.Keyword:
        if (word.value === 'module'
          && this.findNextWord(word).type !== 'variable') {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            'Module needs name !',
            monaco.MarkerSeverity.Error
          );*/
        } else if (word.isInside
          && [wordTypes.Keyword,
          wordTypes.Variable,
          wordTypes.OpenSquareBracket
          ].indexOf(this.findNextWord(word).type) === -1
          && word.value !== 'time'
          && !this.isCommented(word)) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            'Name is required !',
            monaco.MarkerSeverity.Error
          );*/
        } else if (word.isInside
          && word.value === 'logic'
          && this.findNextWord(word).type === wordTypes.Keyword) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            'Name is required !',
            monaco.MarkerSeverity.Error
          );*/
        } else if (word.value === 'always_ff'
          && this.findVariablesInCodeBlock(this.findCodeBlock(word), ['>=', '='])) {
          const wrongWord: Word = this.findFirstAfterWordString(word, '>=', '=');
          /*return new Marker(
            wrongWord.position.range.startLineNumber,
            wrongWord.position.range.endColumn - 1,
            wrongWord.position.range.endLineNumber,
            wrongWord.position.range.endColumn,
            'Only <= is allowed in always_ff !',
            monaco.MarkerSeverity.Error
          );*/
        } else if (word.value === 'always_comb'
          && this.findVariablesInCodeBlock(this.findCodeBlock(word), ['>=', '<='])) {
          const wrongWord: Word = this.findFirstAfterWordString(word, '>=', '<=');
          /*return new Marker(
            wrongWord.position.range.startLineNumber,
            wrongWord.position.range.endColumn - 1,
            wrongWord.position.range.endLineNumber,
            wrongWord.position.range.endColumn,
            'Only = is allowed in always_comb !',
            monaco.MarkerSeverity.Error
          );*/
        }
        break;

      case wordTypes.OpenSquareBracket:
        if (this.findNextWord(word).type === ']') {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            'Please insert value',
            monaco.MarkerSeverity.Warning
          );*/
        }
        break;

      case wordTypes.Number:
        if (!word.isInside
          && [wordTypes.LogicalExpresion].indexOf(this.findPreviousWord(word).type) !== -1
          && [wordTypes.DottedDash, wordTypes.SingleQuote, wordTypes.Variable, wordTypes.CloseBracket].indexOf(this.findNextWord(word).type) === -1) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            '\';\' expected!',
            monaco.MarkerSeverity.Error
          );*/
        } else if (word.isInside
          && [wordTypes.LogicalExpresion].indexOf(this.findPreviousWord(word).type) !== -1
          && [wordTypes.Dash, wordTypes.SingleQuote, wordTypes.CloseBracket].indexOf(this.findNextWord(word).type) === -1
          && !this.findIfBefore(word, 'for')) {
          /*return new Marker(
            word.position.range.startLineNumber,
            word.position.range.endColumn,
            word.position.range.endLineNumber,
            word.position.range.endColumn,
            '\',\' expected!',
            monaco.MarkerSeverity.Error
          );*/
        }
    }
    return null;
  }

  private countOfWord(word: Word): number {
    let counter: number = 0;
    for (const slovo of this.text) {
      if (slovo.value === word.value) {
        counter++;
      }
    }
    return counter;
  }

  private isDeclared(word: Word): boolean {
    const subText: any = this.text.slice(0, this.text.indexOf(word));
    for (const slovo of subText) {
      if (slovo.value === word.value
        && ([wordTypes.CloseSquareBracket,
        wordTypes.Keyword].indexOf(this.findPreviousWord(slovo).type) !== -1 || slovo.isInside)) {
        return true;
      }
    }
    return false;
  }


  private findIfBefore(word: Word, wordToFind: string): boolean {
    const subText: Array<Word> = this.text.slice(0, this.text.indexOf(word));
    for (const slovo of subText.reverse()) {
      if (slovo.value === wordToFind) {
        return true;
      } else if (slovo.position.range.startLineNumber !== word.position.range.startLineNumber) {
        return false;
      }
    }
    return false;
  }
}
