import { Injectable } from '@angular/core';
import { SearchWord } from '../../model/search-word';
import { Range } from '../../model/range';
import { CursorPosition } from '../../model/cursor-position';
import { SearchAround } from '../../model/search-around';
import { EditorTabsService } from '../../../../editor-component/editor-tabs/service/editor-tabs.service';
import { JumpToDefinitionError } from '../../model/error/jump-to-definition-error';
import IWordAtPosition = monaco.editor.IWordAtPosition;
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import ITextModel = monaco.editor.ITextModel;

@Injectable({
  providedIn: 'root'
})
export class SearchWordsAroundService {

  constructor(private tabsService: EditorTabsService) {
  }

  public geSubstringOfAroundWords(searchRange: Range, editor: IStandaloneCodeEditor): string {
    const searchData = this.getAroundPositions(searchRange, editor);
    const lastAroundWordsPosition: CursorPosition[] = searchData.lastCursor;
    const model: ITextModel = editor.getModel();
    const leftPosition: CursorPosition = lastAroundWordsPosition['left'];
    const rightPosition: CursorPosition = lastAroundWordsPosition['right'];
    const startIndex: number = model.getOffsetAt(model.validatePosition(leftPosition));
    const endIndex: number = model.getOffsetAt(model.validatePosition(rightPosition));
    const code = this.tabsService.actualTab.code.substring(startIndex, endIndex).trim().normalize();
    return code.replace(searchData.comment, '');
  }

  public getAroundPositions(searchRange: Range, editor: IStandaloneCodeEditor): any {
    const searchData: SearchAround = this.createSearchAround(searchRange, editor);
    while (!this.foundAllWords(searchData.numberOfWords, searchRange)) {
      this.getPreviousWords(searchData);
      this.getNextWords(searchData);
    }
    return {lastCursor: searchData.lastCursorPosition, comment: searchData.comment};
  }

  protected createSearchAround(searchRange: Range, editor: IStandaloneCodeEditor): SearchAround {
    const isScope: boolean = false;
    const isComment: boolean = false;
    const comment: string = '';
    const clickedPosition: monaco.Position = editor.getPosition();
    const model: ITextModel = editor.getModel();
    const foundIWord: IWordAtPosition = model.getWordAtPosition(clickedPosition);
    const searchWord: SearchWord = this.createSearchWord(foundIWord, clickedPosition.lineNumber);
    const lastCursorPosition: CursorPosition[] = [];
    this.initCursorToLeft(lastCursorPosition, searchWord);
    this.initCursorToRight(lastCursorPosition, searchWord);
    const cursorPosition: CursorPosition[] = [];
    this.initCursorToLeft(cursorPosition, searchWord);
    this.initCursorToRight(cursorPosition, searchWord);
    const numberOfWords: number[] = [];
    numberOfWords['left'] = 0;
    numberOfWords['right'] = 0;
    const actualWord: string[] = [];
    actualWord['left'] = model.getWordAtPosition(cursorPosition['left']).word;
    actualWord['right'] = model.getWordAtPosition(cursorPosition['right']).word;
    return {
      numberOfWords, searchRange,
      cursorPosition, lastCursorPosition,
      actualWord, model, isScope, isComment, comment
    };
  }

  protected createSearchWord(foundIWord: IWordAtPosition, line: number): SearchWord {
    this.checkWord(foundIWord);
    return {
      startColumn: foundIWord.startColumn,
      endColumn: foundIWord.endColumn,
      word: foundIWord.word,
      line
    };
  }

  protected initCursorToLeft(cursorPosition: CursorPosition[], searchWord: SearchWord): void {
    cursorPosition['left'] = ({
      column: searchWord.startColumn,
      lineNumber: searchWord.line
    });
  }

  protected initCursorToRight(cursorPosition: CursorPosition[], searchWord: SearchWord): void {
    cursorPosition['right'] = ({
      column: searchWord.endColumn,
      lineNumber: searchWord.line
    });
  }

  protected foundAllWords(numberOfWords: number[], wordNumber: Range): boolean {
    const wordsInLeft: boolean = this.isFoundPreviousWords(numberOfWords, wordNumber);
    const wordsInRight: boolean = this.foundNextWords(numberOfWords, wordNumber);
    return wordsInLeft && wordsInRight;
  }

  protected isFoundPreviousWords(numberOfWords: number[], wordNumber: Range): boolean {
    return numberOfWords['left'] === wordNumber.toLeft;
  }

  protected foundNextWords(numberOfWords: number[], wordNumber: Range): boolean {
    return numberOfWords['right'] === wordNumber.toRight;
  }

  protected isEndOfLine(cursorPosition: monaco.Position, model: ITextModel): boolean {
    return cursorPosition.column >= model.getLineLength(cursorPosition.lineNumber);
  }

  protected isStartOfLine(cursorPosition: monaco.Position): boolean {
    return cursorPosition.column === 0;
  }

  protected isNumber(word: string): boolean {
    const regex: RegExp = new RegExp(('^\\d+$'));
    return regex.test(word);
  }

  protected isSameWord(word: string, actualWord: string): boolean {
    return word === actualWord;
  }

  protected isValidAnotherWord(iWord: IWordAtPosition, actualWord: string): boolean {
    if (!iWord) {
      return false;
    }

    const isSameWord: boolean = this.isSameWord(iWord.word, actualWord);
    const isNumber: boolean = this.isNumber(iWord.word);
    return (!isSameWord) && (!isNumber);

  }

  protected getLeftIndex(data: SearchAround, iWord: IWordAtPosition[]): CursorPosition {
    return {
      column: iWord['left'].startColumn,
      lineNumber: data.cursorPosition['left'].lineNumber
    };
  }

  protected getRightIndex(data: SearchAround, iWord: IWordAtPosition[]): CursorPosition {
    return {
      column: iWord['right'].endColumn,
      lineNumber: data.cursorPosition['right'].lineNumber
    };
  }

  protected foundLeftWord(data: SearchAround, iWord: IWordAtPosition[]): void {
    data.numberOfWords['left']++;
    data.lastCursorPosition['left'] = this.getLeftIndex(data, iWord);
  }

  protected foundRightWord(data: SearchAround, iWord: IWordAtPosition[]): void {
    data.numberOfWords['right']++;
    data.lastCursorPosition['right'] = this.getRightIndex(data, iWord);
  }

  protected getIWordByDirection(direction: string, data: SearchAround): IWordAtPosition {
    const cursorPosition: CursorPosition = data.cursorPosition[direction];
    const validPosition: monaco.Position = data.model.validatePosition(cursorPosition);
    return data.model.getWordAtPosition(validPosition);
  }


  protected getPreviousWords(data: SearchAround): void {
    const iWord: IWordAtPosition[] = [];

    if (!this.isFoundPreviousWords(data.numberOfWords, data.searchRange)) {
      iWord['left'] = this.getIWordByDirection('left', data);

      if (this.isScopeEnd(data)) {
        data.isScope = true;
      }
      if (this.isScopeBegin(data)) {
        data.isScope = false;
      }
      if (data.isComment && this.isCommentBegin(data)) {
        data.isComment = false;
      }

      if (this.isValidAnotherWord(iWord['left'], data.actualWord['left']) && !data.isScope && !data.isComment) {
        this.foundLeftWord(data, iWord);
      }
      if (this.isStartOfLine(data.cursorPosition['left'])) {
        this.startOfLine(data);
        if (this.isComment(data)) {
          data.isComment = true;
        }
      }
      if (this.isComma(data, 'left') && !data.isScope && !data.isComment) {
        data.numberOfWords['left']--;
      }
      if (iWord['left']) {
        data.actualWord['left'] = iWord['left'].word;
      }

      if (data.cursorPosition['left'].column > 0) {
        data.cursorPosition['left'].column--;
      }
    }
  }

  protected startOfLine(data: SearchAround): void {
    data.cursorPosition['left'].lineNumber--;
    const line: number = data.cursorPosition['left'].lineNumber;
    if (data.cursorPosition['left'].lineNumber < 1) {
      if (data.numberOfWords['left'] === 0) {
        data.lastCursorPosition['left'] = {lineNumber: 1, column: 0};
      }
      data.numberOfWords['left'] = data.searchRange.toLeft;
      return;
    }
    data.cursorPosition['left'].column = data.model.getLineLength(line) + 1;
  }

  protected getNextWords(data: SearchAround): void {
    const iWord: IWordAtPosition[] = [];

    if (!this.foundNextWords(data.numberOfWords, data.searchRange)) {
      iWord['right'] = this.getIWordByDirection('right', data);

      if (this.isValidAnotherWord(iWord['right'], data.actualWord['right'])) {
        this.foundRightWord(data, iWord);
      }
      if (this.isEndOfLine(data.cursorPosition['right'], data.model)) {
        this.endOfLine(data);
      }
      if (iWord['right']) {
        data.actualWord['right'] = iWord['right'].word;
      }
      const lineNumber: number = data.cursorPosition['right'].lineNumber;
      if (lineNumber <= data.model.getLineCount()) {
        const lineLength: number = data.model.getLineLength(lineNumber);
        if (data.cursorPosition['right'].column <= lineLength) {
          data.cursorPosition['right'].column++;
        }
      }
    }
  }

  protected endOfLine(data: SearchAround): void {
    data.cursorPosition['right'].lineNumber++;
    data.cursorPosition['right'].column = 0;
    const lastLine: number = data.model.getLineCount();
    const lastLineLength: number = data.model.getLineLength(lastLine);
    if (data.cursorPosition['right'].lineNumber > data.model.getLineCount()) {
      if (data.numberOfWords['right'] === 0) {
        data.lastCursorPosition['right'] = {lineNumber: lastLine, column: lastLineLength};
      }
      data.numberOfWords['right'] = data.searchRange.toRight;
      return;
    }
  }

  protected isComma(data: SearchAround, direction: string): boolean {
    const code: string = this.tabsService.actualTab.code;
    const index: number = data.model.getOffsetAt(data.cursorPosition[direction]);
    return code[index] === ',';
  }

  protected isScopeBegin(data: SearchAround): boolean {
    const code: string = this.tabsService.actualTab.code;
    const index: number = data.model.getOffsetAt(data.cursorPosition['left']);
    return code[index] === '{';
  }

  protected isScopeEnd(data: SearchAround): boolean {
    const code: string = this.tabsService.actualTab.code;
    const index: number = data.model.getOffsetAt(data.cursorPosition['left']);
    return code[index] === '}';
  }

  private isComment(data: SearchAround): boolean {
    const model = data.model;
    const lineContent = model.getLineContent(data.cursorPosition['left'].lineNumber);
    return this.isCommentTest(lineContent.trim());
  }

  private isCommentTest(lineContent) {
    const regex: string = '^(\\/\\/)(.*)$';
    const regexp: RegExp = new RegExp(regex);
    return regexp.test(lineContent);
  }

  private isCommentBegin(data: SearchAround) {
    const code: string = this.tabsService.actualTab.code;
    const index: number = data.model.getOffsetAt(data.cursorPosition['left']);
    data.comment = code[index] + data.comment;
    return code[index] === '/' && code[index + 1] === '/';
  }

  private checkWord(foundIWord: IWordAtPosition): void {
    if (!foundIWord) {
      throw new JumpToDefinitionError('This is not declaration', 'declaration');
    }
    if (this.isNumber(foundIWord.word)) {
      throw new JumpToDefinitionError('This is not declaration', 'declaration');
    }
  }
}
