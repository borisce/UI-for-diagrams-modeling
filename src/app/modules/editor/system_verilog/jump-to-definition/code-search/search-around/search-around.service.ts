import { Injectable } from '@angular/core';
import { PreviousWordMetaData } from './model/previous-word-meta-data';

@Injectable({
  providedIn: 'root'
})
export class SearchAroundService {

  constructor() {
    this.text = '';
  }

  private _text: string;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = this.removeComments(value);
  }

  public getPreviousWords(numberOfWords: number, index: number): number {
    let lastIndex: number = index;
    let wordIndex: number = index - 1;

    for (let i: number = 0; i < numberOfWords; i++) {
      const previousMeta: PreviousWordMetaData = this.moveToPreviousWord(wordIndex, this.text);
      numberOfWords += previousMeta.commas;
      wordIndex = previousMeta.index;
      const metaDataRead: PreviousWordMetaData = this.readPreviousWord(wordIndex, this.text);
      if (this.isPreviousCharacterToIgnore(metaDataRead.word)) {
        numberOfWords++;
      }
      wordIndex = metaDataRead.index;
      lastIndex = wordIndex;
    }
    return lastIndex;
  }

  public getNextWords(numberOfWords: number, index: number): number {
    let wordIndex: number = index;
    wordIndex = this.readNextWord(wordIndex, this.text).index;
    let lastIndex: number = wordIndex;
    for (let i: number = 0; i < numberOfWords; i++) {
      wordIndex = this.moveToNextWord(wordIndex, this.text);
      const metaDataRead: PreviousWordMetaData = this.readNextWord(wordIndex, this.text);
      if (this.isNextCharacterToIgnore(metaDataRead.word)) {
        numberOfWords++;
      }
      wordIndex = metaDataRead.index;
      lastIndex = wordIndex;
    }
    return lastIndex;
  }

  protected moveToPreviousWord(index: number, text: string): PreviousWordMetaData {
    let character: string = text[index];
    let commas: number = 0;
    let isScope: boolean = this.isScopeEnd(character);
    while (this.isLineOperatorOrSpace(character) || isScope) {
      if (character === ',') {
        commas++;
      }
      index--;
      character = text[index];
      if (this.isScopeEnd(character)) {
        isScope = true;
      }
      if (this.isScopeBegin(character)) {
        isScope = false;
        character = text[index - 1];
      }
    }
    return {index, commas};
  }

  protected readPreviousWord(index: number, text: string): PreviousWordMetaData {
    let word: string = '';
    let character: string = text[index];
    while (!this.isWordEnd(character) && index >= 0) {
      word = character + word;
      index--;
      character = text[index];
    }

    return {index, word};
  }

  protected readNextWord(index: number, text: string): PreviousWordMetaData {
    let word: string = '';
    let character: string = text[index];
    while ((!this.isWordEnd(character) && index < text.length)) {
      word = word + character;
      index++;
      character = text[index];
    }
    return {index, word};
  }

  protected moveToNextWord(index: number, text: string): number {
    let character: string = text[index];
    while (this.isLineOperatorOrSpace(character)) {
      index++;
      character = text[index];
    }
    return index;
  }

  protected isWordEnd(character: string): boolean {
    const regex: string = '[\\s \\.,;:\\(\\)\\[\\]]';
    return this.testRegex(regex, character);
  }

  protected isLineOperatorOrSpace(character: string): boolean {
    const regex: string = '[\\s \\.,;:\\(\\)\\[\\]\\|\\&]';
    return this.testRegex(regex, character);
  }

  protected isScopeBegin(character: string): boolean {
    return character === '{' || character === '[' || character === '(';
  }

  protected isScopeEnd(character: string): boolean {
    return character === '}' || character === ']' || character === ')';
  }

  protected isScope(character: string): boolean {
    return this.isScopeBegin(character) || this.isScopeEnd(character);
  }

  protected removeCommaVariables(word: string): string {
    const commaVariables: string[] = word.split(',');
    const numberVariables: number = commaVariables.length;
    return commaVariables[numberVariables - 1];
  }

  protected testRegex(regex: string, text: string): boolean {
    const regexp: RegExp = new RegExp(regex);
    return regexp.test(text);
  }

  private isNextCharacterToIgnore(character: string): boolean {
    const regex: string = '^[=,\\(\\)\\[\\]:\\d\\{\\}]$';
    return this.testRegex(regex, character);
  }

  private isPreviousCharacterToIgnore(character: string): boolean {
    const regex: string = '^[=,\\(\\)\\[\\]:\\d<>]$';
    return this.testRegex(regex, character);
  }

  private isCommentTest(lineContent) {
    const regex: string = '(\\/\\/)(.*)';
    return this.testRegex(regex, lineContent);
  }


  private removeComments(text: string) {
    const regexp: RegExp = new RegExp('(\\/\\/)(.*)', 'g');
    const lines = text.split('\n');
    lines.forEach((line, index) => {
      const match = line.match(regexp);
      if (match) {
        lines[index] = line.replace(regexp, ' '.repeat(match[0].length));
      }
    });
    return lines.join('\n');
  }
}
