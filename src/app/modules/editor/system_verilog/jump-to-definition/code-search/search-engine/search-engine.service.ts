import { Injectable } from '@angular/core';
import { VariableMetaData } from '../model/variable-meta-data';

@Injectable({
  providedIn: 'root'
})
export class SearchEngineService {

  constructor() {
  }

  public findAllOccurrences(pattern: string, text: string): VariableMetaData[] {
    const metaDataOfAllOccurrences: VariableMetaData[] = [];
    const lps: number[] = this.computeTemporaryArray(pattern.split(''));
    let i: number = 0;
    let j: number = 0;
    let lineNumber: number = 1;

    while (i < text.length) {

      if (this.areCharactersSame(text.charAt(i), pattern.charAt(j))) {
        i++;
        j++;
      }

      if (j === pattern.length && this.isWord(text, (i - j), j)) {
        metaDataOfAllOccurrences.unshift({
          column: (i - j), lineNumber,
          index: (i - j), word: pattern
        });
        j = lps[j - 1];
      } else if (i < text.length && !this.areCharactersSame(pattern.charAt(j), text.charAt(i))) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
      lineNumber = this.countLine(text[i], lineNumber);
    }
    return metaDataOfAllOccurrences;
  }

  public computeTemporaryArray(pattern: string[]): number[] {
    const longestProperPrefixSuffix: number[] = [0];
    let length: number = 0;
    for (let i: number = 1; i < pattern.length;) {
      if (pattern[i] === pattern[length]) {
        longestProperPrefixSuffix.push(length + 1);
        length++;
        i++;
      } else {
        if (length !== 0) {
          length = longestProperPrefixSuffix [length - 1];
        } else {
          longestProperPrefixSuffix [i] = 0;
          i++;
        }
      }
    }
    return longestProperPrefixSuffix;
  }

  protected testRegex(regex: string, text: string): boolean {
    const regexp: RegExp = new RegExp(regex);
    return regexp.test(text);
  }

  protected areCharactersSame(character1: string, character2: string): boolean {
    return character1 === character2;
  }

  protected countLine(character: string, line: number): number {
    if (this.areCharactersSame(character, '\n')) {
      line++;
    }
    return line;
  }

  protected isWord(text: string, startIndex: number, length: number): boolean {
    const preBeginCharacter: string = text.charAt(startIndex - 1);
    const posEndCharacter: string = text.charAt(startIndex + length);
    const isFirstInText: boolean = startIndex === 0;
    const isLastInText: boolean = (startIndex + length) > text.length;
    const beginCharacterRules: boolean = this.checkBeginRules(preBeginCharacter);
    const endCharacterRules: boolean = this.checkEndRules(posEndCharacter);
    return (beginCharacterRules || isFirstInText) && (endCharacterRules || isLastInText);
  }

  private checkBeginRules(preBeginCharacter: string): boolean {
    const regex: string = '[\\s+*\\/\\-=;,:.\\{\\}]';
    return this.testRegex(regex, preBeginCharacter);
  }

  private checkEndRules(posEndCharacter: string): boolean {
    const regex: string = '[\\s+*\\/\\-=;,:.\\(\\)\\[\\]\\{\\}]';
    return this.testRegex(regex, posEndCharacter);
  }

}
